const {createOrder} = require("../services/cashfreeService")
const {User} =  require("../model")
const Payment = require("../model/payment")
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


const verifyPayment = async(req,res)=>{
    try {
            const {orderId, paymentStatus} = req.body
            if(paymentStatus!=="SUCCESS"){
                return res.status(400).json({message:"Payment failed"})
            }


            const payment = await Payment.findOne({where: {orderId}})

            if(!payment){
                return res.status(404).json({message:"Payment record not found"})
            }

            payment.paymentStatus = "SUCCESS"
            await payment.save()

            await User.update(
                {premium: true},
                {where:{id: payment.userId}})

            return res.status(200).json({
                success:true,
                message:"Premium activated"
            })
    } catch (error) {
        return res.status(500).json({message:"Verification failed"})
    }
}


module.exports = {createPayment, verifyPayment}