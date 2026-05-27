const mongoose = require("mongoose")
const Schema = mongoose.Schema

const forgotPasswordSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isactive:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("ForgotPasswordRequest",forgotPasswordSchema)

// const {Sequelize,DataTypes} = require('sequelize');
// const sequelize = require("../utils/dbConnection")

// const ForgotPasswordRequests = sequelize.define(
//     'ForgotPasswordRequests',{
//         id:{
//             type: DataTypes.UUID,
//             primaryKey: true,
//             // autoIncrement: true,
//             allowNull: false
//         },
//         userId:{
//             type: DataTypes.INTEGER,
//             allowNull:false
//         },
//         isactive:{
//             type: DataTypes.BOOLEAN,
//             allowNull:false
//         }
//         }
// )


// module.exports = ForgotPasswordRequests