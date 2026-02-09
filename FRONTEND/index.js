let editExpenseId = null
let allExpenses = []
let editingLi = null
const api_url = "http://localhost:3000/expenses"

function loadExpense(){
    axios.get(`${api_url}/getExpense`)
    .then((response)=>{
        allExpenses = response.data || []
        const ul = document.querySelector("ul")
        ul.innerHTML = ""
        
        response.data.forEach((expense) => {
            displayExpenseOnScreen(expense)
        })
    }).catch((err)=>{
        console.log(err)
    })
}

function handleFormSubmit(event){
    event.preventDefault()

    const expenseDetails = {
        amount: Number(document.getElementById("amount").value),
        description: document.getElementById("description").value,
        category: document.getElementById("category").value

    }



    if(editExpenseId){
        axios.put(`${api_url}/updateExpense/${editExpenseId}`,
        expenseDetails).then(()=>{
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
        expenseDetails).then((response)=>{
            allExpenses.push(response.data)
            displayExpenseOnScreen(response.data)
        }).catch((err)=>{console.log(err)})
    }


    event.target.reset()
}


function displayExpenseOnScreen(expenseDetails){
    const expenseItem = document.createElement("li")

    expenseItem.dataset.id = expenseDetails.id

    expenseItem.appendChild(
        document.createTextNode(`${expenseDetails.amount} | ${expenseDetails.description} | ${expenseDetails.category}  `)
    )

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("deleteBtn")
    expenseItem.appendChild(deleteBtn)

    const expenseList = document.querySelector("ul")
    expenseList.appendChild(expenseItem)


    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    editBtn.classList.add('editBtn')
    expenseItem.appendChild(editBtn)


    deleteBtn.addEventListener("click", function(){
        const id = Number(expenseItem.dataset.id)
        axios.delete(`${api_url}/deleteExpense/${id}`)
        .then(()=>{
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



window.addEventListener("DOMContentLoaded",loadExpense)