const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/dbConnection")

const expense = sequelize.define(
    'expense',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        category:{
                type: DataTypes.STRING,
                allowNull: false
            },
        note:{
            type: DataTypes.STRING
        }
        },
        
)


module.exports = expense