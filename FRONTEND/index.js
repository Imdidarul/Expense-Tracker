let currentPage = 1
let itemsPerPage = 10
let totalPages = 1

let editExpenseId = null
let allExpenses = []
let editingLi = null
const api_url = "http://localhost:3000/expenses"

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("order_id");





async function isPremium(){
    // const premium = JSON.parse(localStorage.getItem('premium'))
    const token = localStorage.getItem("token")
    const premiumBtn = document.getElementById("premiumBtn")
    const leaderboardBtn = document.getElementById("leaderboard")

    if (orderId) {
        try {
            const res = await axios.post("http://localhost:3000/api/payment/verify-payment", 
            {orderId}, 
            {headers: { authorization: token }}
            )
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
                return
        } catch (error) {
            console.log(error)
            alert("Transaction Failed")
            return
        }
    }


    let premium = false

    try {
        const res = await axios.get(
            "http://localhost:3000/check/premium-status",
            { headers:{ authorization: token } }
        )

        premium = res.data.premium
        
    } catch (error) {
        console.log(error)
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


function pagination(){
    const rowsDropdown = document.getElementById("rowsPerPage")
    itemsPerPage = Number(rowsDropdown.value)
    rowsDropdown.addEventListener("change",()=>{
        itemsPerPage = Number(rowsDropdown.value)
        // if (itemsPerPage===0){
        //     return
        // }
        loadExpense(1)
    })
}


function loadExpense(page = 1){
    const token = localStorage.getItem("token")
    axios.get(`${api_url}/getExpense?page=${page}&limit=${itemsPerPage}`,{headers:{authorization: `${token}`}})
    .then((response)=>{
        allExpenses = response.data.expenses || []
        totalPages = response.data.totalPages
        currentPage = response.data.currentPage
        const ul = document.getElementById("expense-list")
        ul.innerHTML = ""
        
        response.data.expenses.forEach((expense) => {
            displayExpenseOnScreen(expense)
        })

        renderPaginationControls()
    }).catch((err)=>{
        console.log(err)
    })
}


function renderPaginationControls(){
    const container = document.getElementById("pagination")
    container.innerHTML = ""

    const page = document.createElement("span")
    page.textContent = `Page ${currentPage} of ${totalPages}`
    container.appendChild(page)
    page.style.margin = "10px"

    if(currentPage>1){
        const backBtn = document.createElement("button")
        backBtn.textContent = "Prev page"
        backBtn.onclick = ()=>{
            loadExpense(currentPage-1)
        }
        container.appendChild(backBtn)
    }

    if (currentPage<totalPages){
        const nextBtn = document.createElement("button")
        nextBtn.textContent = "Next page"
        nextBtn.onclick = ()=>{
            loadExpense(currentPage+1)
        }
        container.appendChild(nextBtn)
    }
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

            loadExpense(currentPage)
            // expenseDetails.id = editExpenseId
            // for (let i = 0; i<allExpenses.length;i++){
            //     if(allExpenses[i].id == editExpenseId){
            //         allExpenses[i] = expenseDetails
            //         break
            //     }
            // }

            // editingLi.firstChild.textContent = `${expenseDetails.amount} | ${expenseDetails.description} | ${expenseDetails.category} `


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
            loadExpense(currentPage)
            // displayExpenseOnScreen(response.data)
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

            if(allExpenses.length === 0 && currentPage>1){
                loadExpense(currentPage - 1)    
            }else{
                loadExpense(currentPage)
            }
            // expenseList.removeChild(expenseItem)
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
            // document.getElementById("category").value = currentExpense.category
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





window.addEventListener("DOMContentLoaded",async()=>{const rowsDropdown = document.getElementById("rowsPerPage")
        itemsPerPage = Number(rowsDropdown.value)
        await isPremium()
        loadExpense(currentPage)
        pagination()
})