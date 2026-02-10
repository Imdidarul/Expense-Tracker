const { Cashfree, CFEnvironment } = require("cashfree-pg")

const cashfree = new Cashfree(CFEnvironment.SANDBOX, key, secret);


const createOrder = async(
    orderId,
    orderAmount,
    orderCurrency = "INR",
    customerId,
    customerPhone
)=>{
    try {
        
        const expiryDate = new Date(Date.now()+(60*60*1000))
        const formatedExpiry = expiryDate.toISOString()

        const request = {
            order_amount: orderAmount,
            order_id: orderId,
            order_currency: orderCurrency,
            customer_details:{
                customer_id: customerId,
                customer_phone: customerPhone,
                customer_email: "test@gmail.com"
            },
            order_meta: {
                "return_url": "http://127.0.0.1:5500/FRONTEND/index.html?order_id={order_id}"
            },
            order_expiry_time: formatedExpiry
        };

        const response = await cashfree.PGCreateOrder(request)
        return response.data.payment_session_id

        }catch (error) {
            console.error("Cashfree error:", error?.response?.data || error)
        // console.log(error.message)
        throw error
    }
}


module.exports = {createOrder}