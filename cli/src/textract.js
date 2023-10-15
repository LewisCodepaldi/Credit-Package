const { TextractClient, DetectDocumentTextCommand } = require("@aws-sdk/client-textract");
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const clientConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
}

const extractText = async (inputFileName) => {
  const docPath = path.join(__dirname, '..', 'input', inputFileName)
  const docBytes = fs.readFileSync(docPath)
  const params = {
    Document: {
      Bytes: docBytes
    }
  }
  const command = new DetectDocumentTextCommand(params)
  const client = new TextractClient(clientConfig)
  const response = await client.send(command)

  const text = []
  response.Blocks.forEach(item => {
    if (item.BlockType === 'LINE') {
      text.push(item.Text)
    }
  })
  return text
}

module.exports = {
  extractText
}