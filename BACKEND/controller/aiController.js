const ai = require("@google/genai")

const whatCategory = async(req,res)=>{
    try {
        const genai = new ai.GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
        const {description} = req.body

        const response = await genai.models.generateContent({
            model:"gemini-2.0-flash",
            contents:`What category does ${description} fall in? Give one word answer.`
        })

        console.log("The gemini replied with:",response)
        res.status(200).json(response.text)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = { whatCategory}