const {createOrder} = require("../services/cashfreeService")
const {User} =  require("../model")
const Payment = require("../model/payment")
const {Cashfree, CFEnvironment} = require("cashfree-pg")
const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    "TEST430329ae80e0f32e41a393d78b923034",
    "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
)
// const payment = require("../model/payment")

const createPayment = async (req, res) => {
    try {
        const {amount, customerPhone} = req.body
        const customerId = req.user.id.toString()

        if(!amount || !customerId || !customerPhone){
            return res.status(400).json({
                success:false,
                message:"Missing required fields"
            })
        }


        const orderId = "Order_" + Date.now()

        const paymentSessionId = await createOrder(
            orderId,
            amount,
            "INR",
            customerId,
            customerPhone
        )

        if (!paymentSessionId){
            return res.status(500).json({
                success: false,
                message:"Failed to create order"
            })
        }

        await Payment.create({
            orderId,
            paymentSessionId,
            orderAmount: amount,
            orderCurrency: "INR",
            paymentStatus:"Pending",
            userId: req.user.id
        })

        // await User.update({ premium: true }, { where: { id: req.user.id } })

        return res.status(200).json({
            success:true,
            orderId,
            paymentSessionId
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message: "Server side error"
        })
    }
}


// const verifyPayment = async(req,res)=>{
//     try {
//             const {orderId, paymentStatus} = req.body
//             if(paymentStatus!=="SUCCESS"){
//                 return res.status(400).json({message:"Payment failed"})
//             }


//             const payment = await Payment.findOne({where: {orderId}})

//             if(!payment){
//                 return res.status(404).json({message:"Payment record not found"})
//             }

//             payment.paymentStatus = "SUCCESS"
//             await payment.save()

//             await User.update(
//                 {premium: true},
//                 {where:{id: payment.userId}})

//             return res.status(200).json({
//                 success:true,
//                 message:"Premium activated"
//             })
//     } catch (error) {
//         return res.status(500).json({message:"Verification failed"})
//     }
// }


const verifyPayment = async(req,res)=>{
    try {
        const {orderId} = req.body

        if(!orderId){
            return res.status(400).json({message:"OrderId missing"})
        }

        const response = await cashfree.PGOrderFetchPayments(orderId)

        const payments = response.data

        let orderStatus = "Failure"

        if (payments.filter(tx => tx.payment_status === "SUCCESS").length > 0){
            orderStatus = "SUCCESS"
        }else if (payments.filter(tx => tx.payment_status === "PENDING").length > 0){
            orderStatus = "PENDING"
        }

        const payment = await Payment.findOne({where:{orderId}})

        if(!payment){
            return res.status(404).json({message:"Payment could not be found"})
        }

        payment.paymentStatus = orderStatus
        await payment.save()

        if (orderStatus === "SUCCESS") {
            await User.update(
                {premium: true},
                {where:{id: payment.userId}}
            )
        }

        return res.status(200).json({
            success: true,
            status: orderStatus
        })



    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Verification failed"})
    }
}


module.exports = {createPayment, verifyPayment}