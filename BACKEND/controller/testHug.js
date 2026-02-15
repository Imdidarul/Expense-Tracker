const axios = require("axios")

const whatCategory = async (req, res) => {
    try {
        // const { description } = req.body
        const {description} = req.body

        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "mistralai/Mistral-7B-Instruct-v0.2", 
                messages: [
                    {
                        role: "user",
                        content: `Classify this item into one category word only (Food, Beverage, Transport, Utility, Entertainment, Other). Return only one word also do not use markdown, symbols, punctuation, or formatting..

Item: ${description}
Category:`
                    }
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        )
        console.log(response.data.choices[0].message.content)

        res.status(200).json(response.data.choices[0].message.content)

    } catch (error) {
        console.log(error.response?.data || error.message)
        res.status(500).json({ error: "AI classification failed" })
    }
}

module.exports = { whatCategory }
