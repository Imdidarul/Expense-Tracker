
async function checkPremium(){
    const token = localStorage.getItem("token")

    try{
        const res = await axios.get(
            "http://localhost:3000/check/premium-status",
            { headers:{ authorization: token } }
        )

        if(res.data.premium){
            document.getElementById("downloadBtn").style.display = "block"
        }else{
            document.getElementById("downloadBtn").style.display = "none"
        }

    }catch(err){
        console.log(err)
    }

}



async function downloadReport(){

    const element = document.getElementById("reportContent")

    const opt = {
        margin:       0.5,
        filename:     'Expense_Report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
}



window.addEventListener("DOMContentLoaded",()=>{checkPremium()})