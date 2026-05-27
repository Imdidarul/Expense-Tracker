const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    orderId:{
        type: String,
        require: true
    },
    paymentSessionId:{
        type: String,
        required: true
    },
    orderAmount:{
        type:Number,
        required: true
    },
    orderCurrency:{
        type: String,
        required:true
    },
    paymentStatus:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Payment",paymentSchema)


// const {Sequelize,DataTypes} = require('sequelize');
// const sequelize = require("../utils/dbConnection")

// const payment = sequelize.define(
//     'payment',{
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false
//         },
//         orderId:{
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         paymentSessionId:{
//             type: DataTypes.STRING,
//             allowNull:false
//         },
//         orderAmount:{
//                 type: DataTypes.INTEGER,
//                 allowNull: false
//             },
//         orderCurrency:{
//                 type: DataTypes.STRING,
//                 allowNull:false
//         },
//         paymentStatus:{
//             type:DataTypes.STRING,
//             allowNull:false
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         }
// )


// module.exports = payment