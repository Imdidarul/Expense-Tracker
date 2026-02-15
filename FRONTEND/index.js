

let editExpenseId = null
let allExpenses = []
let editingLi = null
const api_url = "http://localhost:3000/expenses"

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("order_id");





function isPremium(){
    const premium = JSON.parse(localStorage.getItem('premium'))
    const premiumBtn = document.getElementById("premiumBtn")
    const token = localStorage.getItem("token")
    const leaderboardBtn = document.getElementById("leaderboard")

    if (orderId) {
        axios.post("http://localhost:3000/api/payment/verify-payment", {
            orderId,
            // paymentStatus: "SUCCESS"
        }, {
            headers: { authorization: token }
        }).then((res) => {
            if (res.data.status === "SUCCESS"){
                localStorage.setItem("premium", true);
                premiumBtn.innerText = "Premium"
                premiumBtn.disabled = true
                leaderboardBtn.style.display = "block"
                alert("Transaction successful")
            } else if (res.data.status === "PENDING"){
                alert("Payment is pending")
            }else{
                alert("Transaction Failed")
            }
            window.location.href = "index.html"
        }).catch((error)=>{
            console.log(error.message)
            alert("Transaction Failed")
        })
    }

    if(premium){
        premiumBtn.innerText = "Premium"
        leaderboardBtn.style.display = "block"
        premiumBtn.disabled = true
    }else{
        premiumBtn.innerText = "Buy premium"
        premiumBtn.onclick = () => {
            window.location.href = "payment.html"
        }
    }
}

function loadExpense(){
    const token = localStorage.getItem("token")
    axios.get(`${api_url}/getExpense`,{headers:{authorization: `${token}`}})
    .then((response)=>{
        allExpenses = response.data || []
        const ul = document.getElementById("expense-list")
        ul.innerHTML = ""
        
        response.data.forEach((expense) => {
            displayExpenseOnScreen(expense)
        })
    }).catch((err)=>{
        console.log(err)
    })
}

async function handleFormSubmit(event){
    event.preventDefault()
    const token = localStorage.getItem('token')

    const category = await findCategory()
    


    const expenseDetails = {
        amount: Number(document.getElementById("amount").value),
        description: document.getElementById("description").value,
        // category: document.getElementById("category").value
        category: category
    }



    if(editExpenseId){
        axios.put(`${api_url}/updateExpense/${editExpenseId}`,
        expenseDetails, {headers: {authorization: token}}).then(()=>{
            refreshLeaderboard()
            expenseDetails.id = editExpenseId
            for (let i = 0; i<allExpenses.length;i++){
                if(allExpenses[i].id == editExpenseId){
                    allExpenses[i] = expenseDetails
                    break
                }
            }

            editingLi.firstChild.textContent = `${expenseDetails.amount} | ${expenseDetails.description} | ${expenseDetails.category} `


            editExpenseId = null
            editingLi = null
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        axios.post(`${api_url}/addExpense`,
        expenseDetails,{headers:{authorization: `${token}`}}).then((response)=>{
            allExpenses.push(response.data)
            refreshLeaderboard()
            displayExpenseOnScreen(response.data)
        }).catch((err)=>{console.log(err)})
    }


    event.target.reset()
}


async function findCategory(){
    const description = document.getElementById("description").value
    try {
        const response = await axios.post(`${api_url}/ask`,{description})

        return response.data
    } catch (error) {
        console.log(error)
        return "Other"
    }

}


function displayExpenseOnScreen(expenseDetails){
    const expenseItem = document.createElement("li")
    const token = localStorage.getItem('token')

    expenseItem.dataset.id = expenseDetails.id

    expenseItem.appendChild(
        document.createTextNode(`${expenseDetails.amount} | ${expenseDetails.description} | ${expenseDetails.category}  `)
    )

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("deleteBtn")
    expenseItem.appendChild(deleteBtn)

    const expenseList = document.getElementById("expense-list")
    expenseList.appendChild(expenseItem)


    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    editBtn.classList.add('editBtn')
    expenseItem.appendChild(editBtn)


    deleteBtn.addEventListener("click", function(){
        const id = Number(expenseItem.dataset.id)
        axios.delete(`${api_url}/deleteExpense/${id}`, {headers:{authorization: token}})
        .then(()=>{
            refreshLeaderboard()
            allExpenses = allExpenses.filter((b)=>b.id != id)
            expenseList.removeChild(expenseItem)
        })
        .catch((err)=>{console.log(err)})
    })

    editBtn.addEventListener("click",function(){
        editExpenseId = Number(expenseItem.dataset.id)
        editingLi = expenseItem

        let currentExpense = null
        for (let i = 0; i<allExpenses.length;i++){
            if(allExpenses[i].id == editExpenseId){
                currentExpense = allExpenses[i]
                break
            }
        }

        if (currentExpense){
            document.getElementById("amount").value = currentExpense.amount
            document.getElementById("description").value = currentExpense.description
            document.getElementById("category").value = currentExpense.category
        }
    })
}




function showLeaderboard(){
    const token = localStorage.getItem("token")

    axios.get("http://localhost:3000/api/leaderboard", {
        headers:{authorization: token}
    }).then((res)=>{
        const leaderboardData = res.data

        const ul = document.getElementById("leaderboard-list")
        ul.innerHTML = ""
        ul.style.display = "block"

        const heading = document.createElement("h3")
        heading.textContent = "Leaderboard"
        ul.appendChild(heading)


        leaderboardData.forEach((user, index)=>{
            const li = document.createElement("li")
            li.textContent = `${index + 1}. ${user.name} - INR ${user.totalExpense}`
            ul.appendChild(li)
        })

        const hideButton = document.createElement("button")
        hideButton.innerText = "Hide leaderboard"
        hideButton.onclick= function(){
            ul.style.display = "none"
        }
        ul.appendChild(hideButton)
    }).catch((error)=>{
        console.log(error.message)
    })

}


function refreshLeaderboard(){
    const ul = document.getElementById("leaderboard-list")

    if(ul.style.display === "block"){
        showLeaderboard()
    }
}





window.addEventListener("DOMContentLoaded",()=>{isPremium(),loadExpense()})