const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    premium:{
        type: Boolean,
        required: true
    },
    totalExpense:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)


// const {Sequelize,DataTypes} = require('sequelize');
// const sequelize = require("../utils/dbConnection")

// const users = sequelize.define(
//     'users',{
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false
//         },
//         name:{
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         email:{
//             type: DataTypes.STRING,
//             allowNull:false,
//             unique:true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         premium:{
//             type: DataTypes.BOOLEAN,
//             allowNull: false
//         },
//         totalExpense: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0
//         }
//         }
// )


// module.exports = users