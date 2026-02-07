const api_url = "http://localhost:3000/login"

function handleFormSubmit(event){
    event.preventDefault()

    const loginDetails = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }



    axios.post(`${api_url}/validate`,loginDetails).then((result)=>{
        alert("Logged in successfully")
    }).catch((error)=>{
        console.log(error)
    })
}