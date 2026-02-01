const Expense = require("../model/expense")

const addExpense = async (req,res)=>{
    try {
        const {amount,description,category} = req.body;

        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category
        });
        console.log("Expense added")
        res.status(201).json(expense)
    } catch (error) {
            res.status(500).send("Unable to add expense")
    }
}








const getExpenses = async (req,res) => {
    try {
        const expense = await Expense.findAll()
        console.log("All expenses fetched")
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).send("Unable to get expenses")
    }
}




const updateExpense = async (req,res)=>{
    try {
        const {id} = req.params
        const {amount,description,category}= req.body
        const [updatedRows] = await Expense.update(
            {amount,description,category},
            {where: {id}}
        )

        if (updatedRows === 0){
            res.status(404).send("Expense not found")
            return
        }


        console.log("Expense updated")
        res.status(200).send("Expnse updated")
    } catch (error) {
        res.status(500).send("Unable to update expense")
    }
}



const deleteExpense = async (req,res)=>{
    try {
        const {id} = req.params
        const expense = await Expense.destroy({
            where:{
                id:id
            }
        })

        if(!expense){
            res.status(404).send("Expense not found")
            return
        }
        console.log("Expense deleted")
        res.status(200).send("Expense is deleted")
    } catch (error) {
        res.status(500).send("Expense not deleted")
    }
}




module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}