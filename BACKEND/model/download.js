const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/dbConnection")

const download = sequelize.define(
    'download',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        url:{
            type: DataTypes.TEXT,
            allowNull:false
        }
        },
        
)


module.exports = download