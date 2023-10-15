const fs = require('fs')
const path = require('path')
const { analyzeFinancialStatements } = require('./chat')
const { extractText } = require('./textract')

const OUTPUT_DIR = path.join(__dirname, '..', 'output')

const run = async () => {
  const balanceSheet = (await extractText('Heycart BS-2022.pdf')).join('\n')
  const profitAndLoss = (await extractText('Heycart P_L- 2022.pdf')).join('\n')
  let statements = `${balanceSheet}\n${profitAndLoss}`
  statements = statements.replace(/Heycart/g, 'Example')
  console.log(statements)
  const report = await analyzeFinancialStatements(statements)
  console.log(report)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'report.csv'), report)
}

const main = async () => {
  try {
    await run()
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  }
}

main()