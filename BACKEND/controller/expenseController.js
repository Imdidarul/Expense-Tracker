const {Expense, User, Download} = require("../model");
const sequelize = require("../utils/dbConnection");
// const {Expense, User} = require("../")
const AWS = require("aws-sdk")


function uploadToS3(data, filename){
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME
    const IAM_USER_KEY = process.env.AWS_IAM_USER_KEY
    const IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET


    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read',
        ContentDisposition: 'attachment; filename="myexpense.txt"'
    }

    return new Promise((resolve,reject)=>{

        s3bucket.upload(params, (err,s3response)=>{
            if(err){
                console.log("Something went wrong")
                reject(err)
            }else{
                // console.log('success',s3response)
                resolve(s3response.Location)
            }
        })

    })
    

}


const downloadExpense = async (req,res)=>{
    try {
        const expenses = await req.user.getExpenses()
        // console.log(expenses)
        const stringifiedExpenses = JSON.stringify(expenses)
        const userId = req.user.id

        const filename = `Expenses${userId}/${Date.now()}.txt`

        const fileURL = await uploadToS3(stringifiedExpenses, filename)

        const download = await Download.create({
            userId: userId,
            url: fileURL
        })

        res.status(200).json({fileURL, success: true})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({fileURL: "", success: false, err:error})
    }
    
}


const addExpense = async (req,res)=>{
    const t = await sequelize.transaction()
    try {
        const {amount,description,category,note} = req.body;

        // console.log("The body is this LOOK AT THIS:",req.body)

        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: req.user.id,
            note:note
        }, {transaction: t})

            const user = await User.findOne({where:{id:req.user.id},transaction:t})
            
            user.totalExpense = user.totalExpense + amount
            await user.save({transaction:t})

            await t.commit()
            console.log("Expense added")
            // console.log("The body is this LOOK AT THIS:",req.body)
            res.status(201).json(expense)
    } catch (error) {
        await t.rollback()
        console.log(error)
        res.status(500).send("Unable to add expense")
    }
}








const getExpenses = async (req,res) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page-1) * limit

        const {count, rows} = await Expense.findAndCountAll({
            where:{userId: req.user.id},
            limit: limit,
            offset: offset,
            order:[["createdAt","Desc"]]
        })
        console.log("All expenses fetched")
        res.status(200).json({
            expenses: rows,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count/limit)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Unable to get expenses")
    }
}




const updateExpense = async (req,res)=>{
    const t = await sequelize.transaction()
    try {
        const {id} = req.params
        const {amount,description,category,note}= req.body

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
            {amount,description,category,note},
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


const downloadedExpense = async (req, res)=>{
    try {
        const downloadedExpenses = await Download.findAll({where: {userId: req.user.id}})
        res.status(200).json(downloadedExpenses)
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    downloadExpense,
    downloadedExpense
}