


async function handleFormSubmit(event){
    event.preventDefault()
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token")

    const newPassword = document.getElementById("password").value

    axios.post(`http://localhost:3000/password/updatepassword`,{token, newPassword}).then(()=>{
            alert("Password updated")
        }
    ).catch(()=>{
        alert("Password couldnot be updated")
    })
}