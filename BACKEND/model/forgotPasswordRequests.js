const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/dbConnection")

const ForgotPasswordRequests = sequelize.define(
    'ForgotPasswordRequests',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            // autoIncrement: true,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        isactive:{
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
        }
)


module.exports = ForgotPasswordRequests