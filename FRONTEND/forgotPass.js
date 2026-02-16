
const api_url = "http://localhost:3000/login"

async function handleFormSubmit(event){
    event.preventDefault()

    const email = document.getElementById("email").value

    axios.post(`${api_url}/forgotPassword`,
        {email:email}).then(()=>{
            alert("Email sent")
        }).catch((err)=>{console.log(err)})
}