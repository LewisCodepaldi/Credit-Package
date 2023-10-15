const { Configuration, OpenAIApi } = require("openai")
const {
  instructions,
  financialAnalysisPrompt,
  financialReportValues
} = require("./constants")
require('dotenv').config()

const messages = []

const genPrompt = (financialStatements) => `
Here is the content of the financial statements for Example Company

${financialStatements}

${financialAnalysisPrompt}

${financialReportValues}
`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const genSystemMessagePacket = () => ({
  role: 'system',
  content: instructions
})

const genUserMsgPacket = (msg) => ({
  role: 'user',
  content: genPrompt(msg)
})

const prepareMessages = (rawText) => (
  messages.concat([genSystemMessagePacket(), genUserMsgPacket(rawText)])
)

const analyzeFinancialStatements = async (rawText) => {
  console.log('Calling ChatGPT...')
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: prepareMessages(rawText)
  })
  
  const content = response.data.choices[0].message.content
  return content
}

module.exports = {
  analyzeFinancialStatements
}