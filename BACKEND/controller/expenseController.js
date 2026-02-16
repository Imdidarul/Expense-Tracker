const {Expense, User} = require("../model");
const sequelize = require("../utils/dbConnection");
// const {Expense, User} = require("../")

const addExpense = async (req,res)=>{
    const t = await sequelize.transaction()
    try {
        const {amount,description,category} = req.body;

        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: req.user.id
        }, {transaction: t})

            const user = await User.findOne({where:{id:req.user.id},transaction:t})
            
            user.totalExpense = user.totalExpense + amount
            await user.save({transaction:t})

            await t.commit()
            console.log("Expense added")
            res.status(201).json(expense)
    } catch (error) {
        await t.rollback()
        console.log(error)
        res.status(500).send("Unable to add expense")
    }
}








const getExpenses = async (req,res) => {
    try {
        const expense = await Expense.findAll({where:{userId: req.user.id}})
        console.log("All expenses fetched")
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).send("Unable to get expenses")
    }
}




const updateExpense = async (req,res)=>{
    const t = await sequelize.transaction()
    try {
        const {id} = req.params
        const {amount,description,category}= req.body

        const expense = await Expense.findOne({
            where:{id, userId: req.user.id},
            transaction: t
        })

        if (!expense){
            await t.rollback()
            return res.status(404).send("Expense not found")
        }
        const oldAmount = expense.amount
        const difference = amount - oldAmount

        // const [updatedRows] = 
        await expense.update(
            {amount,description,category},
            {transaction: t}
        )

        const user = await User.findOne({where:{id:req.user.id},transaction:t})

        user.totalExpense = user.totalExpense + difference

        await user.save({transaction:t})

        await t.commit()
        console.log("Expense updated")
        res.status(200).send("Expnse updated")

        // if (updatedRows === 0){
        //     res.status(404).send("Expense not found")
        //     return
        // }
    
    } catch (error) {
        await t.rollback()
        res.status(500).send("Unable to update expense")
    }
}



const deleteExpense = async (req,res)=>{
    const t = await sequelize.transaction()
    try {
        const {id} = req.params
        const expense = await Expense.findOne({
            where:{
                id:id,
                userId: req.user.id
            },
            transaction:t
        })

        if(!expense){
            await t.rollback()
            return res.status(404).send("Expense not found")
        }

        const amount = expense.amount

        await expense.destroy({transaction:t})

        const user = await User.findOne({where:{id:req.user.id},transaction:t})

        user.totalExpense = user.totalExpense - amount
            
    
        await user.save({transaction:t})
        await t.commit()
        console.log("Expense deleted")
        res.status(200).send("Expense is deleted")
    } catch (error) {
        await t.rollback()
        res.status(500).send("Expense not deleted")
    }
}




module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}