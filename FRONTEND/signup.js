const api_url = "http://localhost:3000/user"




function handleFormSubmit(event){
    event.preventDefault()

    const userDetails = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    axios.post(`${api_url}/signup`,userDetails)
    .then((res)=>{})
    .catch((err)=>{
        console.log(err.message)
        alert("something went wrong")
    })

    event.target.reset()
}


