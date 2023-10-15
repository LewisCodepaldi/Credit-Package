const instructions = `
You are a financial operator in the company.
You must provide precise information with 100% correctness.
Only answer questions you know, and ask for more info if you are not confident about the result
`

const financialAnalysisPrompt = `
Find out following fields for year-to-date and previous year in CSV format. Mark N/A if no information provided.
The "Current ratio (Current Asset : Current Liabilities)" field is derived by ((Total Current Assets - Inventory Asset) / Total Current Liabilities).
The "Debt/Equity ratio" field is derived by (Total Liabilities / Total Equity).
The "Debt/Asset ratio" field is derived by (Total Liabilities / TOTAL ASSETS).
Note that CSV uses comma as a separator, so wrap numbers in quotes if they contain commas.
Also note that some label with empty value might indicates that it's a section header.
Explain how you get the ratios in the csv value column as well.
`;

const financialReportValues = `
Balance sheet
Cash & equivalents
AR
Total Current Assets
AP
Current ratio (Current Asset : Current Liabilities)
ST loans
LT loans
Equity value
Debt/Equity Ratio
Debt/Asset Ratio

Income Statement
Total Revenue
Gross Profit
Operating Profit
Net Income
Interest Expense
Coverage Ratio (EBIT / Interest Expense)
`

module.exports = {
  instructions,
  financialAnalysisPrompt,
  financialReportValues
}