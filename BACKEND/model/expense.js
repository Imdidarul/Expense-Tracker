const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Expense",expenseSchema)

// const {Sequelize,DataTypes} = require('sequelize');
// const sequelize = require("../utils/dbConnection")

// const expense = sequelize.define(
//     'expense',{
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false
//         },
//         amount:{
//             type: DataTypes.INTEGER,
//             allowNull:false
//         },
//         description:{
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         category:{
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//         note:{
//             type: DataTypes.STRING
//         }
//         },
        
// )


// module.exports = expense