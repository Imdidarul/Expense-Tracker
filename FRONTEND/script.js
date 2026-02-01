document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('expense-form')
    const amountInput = document.getElementById('amount')
    const descriptionInput = document.getElementById('description')
    const categoryInput = document.getElementById('category')
    const expenseList = document.getElementById('expense-list')

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `
                <div class="d-flex align-items-center flex-wrap">
                    <span class="me-2">• ${expense.amount} - ${expense.category} - ${expense.description}</span>
                    <div>
                        <button class="btn btn-outline-dark btn-sm me-1 delete-btn" data-id="${expense.id}">Delete Expense</button>
                        <button class="btn btn-outline-dark btn-sm edit-btn" data-id="${expense.id}">Edit Expense</button>
                    </div>
                </div>
            `;
            expenseList.appendChild(li);
        });
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = Number(amountInput.value);
        const description = descriptionInput.value;
        const category = categoryInput.value;

        if (amount && description && category) {
            const expense = {
                id: Date.now(),
                amount,
                description,
                category
            };

            expenses.push(expense);
            renderExpenses();
            form.reset();
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(exp => exp.id !== id);
            renderExpenses();
        }

        if (e.target.classList.contains('edit-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            const expenseToEdit = expenses.find(exp => exp.id === id);

            if (expenseToEdit) {
                amountInput.value = expenseToEdit.amount;
                descriptionInput.value = expenseToEdit.description;
                categoryInput.value = expenseToEdit.category;

                expenses = expenses.filter(expense => expense.id !== id);
                renderExpenses();
            }
        }
    });

    renderExpenses();
})