



function handleFormSubmit(event){
    event.preventDefault()
    const token = localStorage.getItem("token")
    const planValue = document.getElementById("plan").value;
    const amount = Number(planValue.replace("INR", "").trim());

    console.log("Amount received:", amount, typeof amount)

    // const amount = document.getElementById("plan").value
    // const customerId = token
    const customerPhone = document.getElementById("phone").value

    axios.post("http://localhost:3000/api/payment/create-payment", {
    amount: amount,
    // customerId: customerId,
    customerPhone: customerPhone
    }, {headers:{authorization: token}})
    .then(res => {
        const { paymentSessionId, orderId } = res.data;

        // Cashfree.checkout({
        //     paymentSessionId: paymentSessionId,
        //     redirectTarget: "_self"
        // });
    })
    .catch(err => {
        console.error(err);
        console.log(err.message)
    });
}