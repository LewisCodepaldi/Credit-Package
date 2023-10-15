export const instructions = `
You are a financial operator in the company.
You must provide precise information with 100% correctness.
Only answer questions you know, and ask for more info if you are not confident about the result
`;

const balanceSheetPlaceholder = '<balance sheet in json format>';
const incomeStatementPlaceholder = '<income statement in json format>';
const explanationPlaceHolder = '<Any explanation you want to provide>';
const intermediaryPlaceHolder = '<Intermediary values>';

const responseFormat = `
{
  "data": {
    "report: {
      "content": {
        "Balance Sheet": ${balanceSheetPlaceholder},
        "Income Statement": ${incomeStatementPlaceholder}
      },
      "intermediary: ${intermediaryPlaceHolder},
      "explanation": "${explanationPlaceHolder}"
    }
  },
  "error": null
}`;

export const balanceSheetValues = `
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
AR/AP Ratio
Gross Margin
`;

export const incomeStatementValues = `
Total Revenue
Gross Profit
Operating Profit
Net Income
Interest Expense
Coverage Ratio (EBIT / Interest Expense)
`;

export const intermediaryValues = `
Inventory Asset
Total Current Liabilities
`;

export const financialAnalysisPrompt = `
Do financial analysis and find out following fields for year-to-date and previous year.

The Balance Sheet values:
${balanceSheetValues}

The Income Statement values:
${incomeStatementValues}

Also find out following intermediary values for year-to-date and previous year.

${intermediaryValues}

Note that some label with empty value might indicates that it's a section header.
If the ST loans is not explicitly listed, use Total Current Liabilities as the value.
EBIT is calculated as (Net Income + Interest + Taxes)
The "Current ratio (Current Asset : Current Liabilities)" is (Current Total Assets - Inventory Asset) / Total Current Liabilities.
The "Debt/Equity ratio" field is (Total Liabilities / Total Equity).
The "Debt/Asset ratio" field is (Total Liabilities / TOTAL ASSETS).
The "AR/AP ratio" field is (Account Receivable / Account Payable).
The "Gross Margin" field is (Gross Profit / Sales)
`;

export const respondFormatPrompt = `
For balance sheet values, income statement values, and the intermediary values, generate a JSON object for each of them.
The JSON object should be just one level key-value pairs of all the fields.
Keep the JSON key exactly the same as value names.
The value for "Balance Sheet", "Income Statement" and "intermediary" should be an array of exactly two elements, the first one for year-to-date and another for previous year.
Mark as N/A if no information provided for given field.

Your entire response should strictly follow the format below and must be a valid JSON string:
${responseFormat}

Replace the ${balanceSheetPlaceholder} with the JSON object you generated for balance sheet values.
Replace the ${incomeStatementPlaceholder} with the JSON object you generated for income statement values.
Replace the ${intermediaryPlaceHolder} with the JSON object you generated for intermediary values.
Replace the ${explanationPlaceHolder} with the reasoning and calculation how you get the ratio numbers.

Example balance sheet JSON object format:
"Balance Sheet": {
  "Cash & equivalents": ["$100.00", "$200.00"],
  "AR": ["$100.00", "$200.00"],
  // ...other fields
}
Income Statement and intermediary JSON object format are similar to the balance sheet format.
DO NOT write anything outside the JSON response. NOTHING ELSE.
`;

export const genPrompt = (financialStatements: string | string[]): string => `
Here is the content of the financial statements for a company

${financialStatements}

Do financial analysis and find out the values for all the keys for both year-to-date and previous year.

Do not fill in any values until you have analyzed the entire financial statements. For any calculaions, do not skip any decimal points. Your results have to be precise and accurate.

The value for each of the item keys under "Balance Sheet", "Income Statement" and "intermediary" should be an array of exactly two strings, the first string for year-to-date and the other for previous year, analyze and fill in the values for year-to-date first, then analyze and fill in the values for previous year. 

For example, for "Balance Sheet", each of its keys is an array of exactly 2 elements, first element is year-to-date value, second element would be previous year value. thus, you would fill it out as following:
{
  "Cash & equivalents": ["year-to-date Cash & equivalents", "previous year Cash & equivalents"],
  "AR": ["year-to-date AR", "previous year AR"],
  "Total Current Assets": ["year-to-date Total Current Assets", "previous year Total Current Assets"],
  "AP": ["year-to-date AP", "previous year AP"],
  "Current ratio (Current Asset : Current Liabilities)": ["year-to-date Current ratio (Current Asset : Current Liabilities)", "previous year Current ratio (Current Asset : Current Liabilities)"],
  "ST loans": ["year-to-date ST loans", "previous year ST loans"],
  "LT loans": ["year-to-date LT loans", "previous year LT loans"],
  "Equity value": ["year-to-date Equity value", "previous year Equity value"],
  "Debt/Equity Ratio": ["year-to-date Debt/Equity Ratio", "previous year Debt/Equity Ratio"],
  "Debt/Asset Ratio": ["year-to-date Debt/Asset Ratio", "previous year Debt/Asset Ratio"],
  "AR/AP Ratio": ["year-to-date AR/AP Ratio", "previous year AR/AP Ratio"],
  "Gross Margin": ["year-to-date Gross Margin", "previous year Gross Margin"]
};

The same goes for "Income Statement" and "intermediary".

Note that some label with empty value might indicates that it's a section header.

If the ST loans is not explicitly listed, use Total Current Liabilities as the value.
EBIT is calculated as (Net Income + Interest + Taxes)
The "Current ratio (Current Asset : Current Liabilities)" is (Total Current Assets / Total Current Liabilities) - (Inventory Asset / Total Current Liabilities). Note that when calculating for the "Current ratio (Current Asset : Current Liabilities)" would be different depending on if its year-to-date or previous year. If you're calculating "Current ratio (Current Asset : Current Liabilities)" for year to date, "Inventory Asset" used in the calculation would be the Inventory Asset from year-to-date. If you're calculating for previous year, "Inventory Asset" used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate "Current ratio (Current Asset : Current Liabilities)" for year-to-date even if inventory asset for previous year isn't provided.
The "Debt/Equity ratio" field is (Total Liabilities / Total Equity). Note that when calculating for this ratio, the values would be different depending on if its year-to-date or previous year. If you're calculating this ratio for year to date, the values used in the calculation would be from year-to-date. If you're calculating for previous year, the values used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate this ratio value for year-to-date even if data for previous year isn't provided.
The "Debt/Equity ratio" field is (Total Liabilities / Total Equity). Note that when calculating for this ratio, the values would be different depending on if its year-to-date or previous year. If you're calculating this ratio for year to date, the values used in the calculation would be from year-to-date.If you're calculating for previous year, the values used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate this ratio value for year-to-date even if data for previous year isn't provided.
The "Debt/Asset ratio" field is (Total Liabilities / TOTAL ASSETS). Note that when calculating for this ratio, the values would be different depending on if its year-to-date or previous year. If you're calculating this ratio for year to date, the values used in the calculation would be from year-to-date. If you're calculating for previous year, the values used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate this ratio value for year-to-date even if data for previous year isn't provided.
The "AR/AP ratio" field is (Account Receivable / Account Payable). Note that when calculating for this ratio, the values would be different depending on if its year-to-date or previous year. If you're calculating this ratio for year to date, the values used in the calculation would be from year-to-date. If you're calculating for previous year, the values used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate this ratio value for year-to-date even if data for previous year isn't provided.
The "Gross Margin" field is calculated by (Gross Profit / Total Revenue). Note that when calculating for this value, the values would be different depending on if its year-to-date or previous year. If you're calculating the gross margin for year to date, the values used in the calculation would be from year-to-date. If you're calculating for previous year, the values used in the calculation would be the Inventory Asset from previous year. Meaning you should still be able to calculate this ratio value for year-to-date even if data for previous year isn't provided. Use the "Total Revenue" and "Gross Profit" values from the "Income Statement" in the schema.

Note that for all the values above, you would calculate each of them twice, once for the year-to-date, once for previous year. If you're missing data from previous year, you should still be able to calculate these values for year-to-date.
THE RATIO NUMBERS AND GROSS MARGIN SHOULD BE CALCULATED SEPERATELY FOR YEAR-TO-DATE AND PREVIOUS YEAR, EVEN IF PREVIOUS YEAR VALUES AREN'T PROVIDED, YOU SHOULD STILL BE ABLE TO CALCULATE THE YEAR-TO-DATE RATIO NUMBERS AND GROSS MARGIN VALUES.

Mark as N/A if no information provided for given field.

For the key "explanation", put down your calculations for the ratio numbers, include values used in calculations. Specify whether the ratio is for year-to-date or previous year.
`;

export const modifiedSchema = {
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "report": {
          "type": "object",
          "properties": {
            "content": {
              "type": "object",
              "properties": {
                "Balance Sheet": {
                  "type": "object",
                  "properties": {
                    "Cash & equivalents": { "type": "array", "items": { "type": "string" } },
                    "AR": { "type": "array", "items": { "type": "string" } },
                    "Total Current Assets": { "type": "array", "items": { "type": "string" } },
                    "AP": { "type": "array", "items": { "type": "string" } },
                    "Current ratio (Current Asset : Current Liabilities)": { "type": "array", "items": { "type": "string" } },
                    "ST loans": { "type": "array", "items": { "type": "string" } },
                    "LT loans": { "type": "array", "items": { "type": "string" } },
                    "Equity value": { "type": "array", "items": { "type": "string" } },
                    "Debt/Equity Ratio": { "type": "array", "items": { "type": "string" } },
                    "Debt/Asset Ratio": { "type": "array", "items": { "type": "string" } },
                    "AR/AP Ratio": { "type": "array", "items": { "type": "string" } },
                    "Gross Margin": { "type": "array", "items": { "type": "string" } }
                  },
                  "required": [
                    "Cash & equivalents",
                    "AR",
                    "Total Current Assets",
                    "AP",
                    "Current ratio (Current Asset : Current Liabilities)",
                    "ST loans",
                    "LT loans",
                    "Equity value",
                    "Debt/Equity Ratio",
                    "Debt/Asset Ratio",
                    "AR/AP Ratio",
                    "Gross Margin"
                  ]
                },
                "Income Statement": {
                  "type": "object",
                  "properties": {
                    "Total Revenue": { "type": "array", "items": { "type": "string" } },
                    "Gross Profit": { "type": "array", "items": { "type": "string" } },
                    "Operating Profit": { "type": "array", "items": { "type": "string" } },
                    "Net Income": { "type": "array", "items": { "type": "string" } },
                    "Interest Expense": { "type": "array", "items": { "type": "string" } },
                    "Coverage Ratio (EBIT / Interest Expense)": { "type": "array", "items": { "type": "string" } }
                  },
                  "required": [
                    "Total Revenue",
                    "Gross Profit",
                    "Operating Profit",
                    "Net Income",
                    "Interest Expense",
                    "Coverage Ratio (EBIT / Interest Expense)"
                  ]
                },
                "intermediary": {
                  "type": "object",
                  "properties": {
                    "Inventory Asset": { "type": "array", "items": { "type": "string" } },
                    "Total Current Liabilities": { "type": "array", "items": { "type": "string" } }
                  },
                  "required": ["Inventory Asset", "Total Current Liabilities"]
                }
              },
              "required": ["Balance Sheet", "Income Statement", "intermediary"]
            },
            "explanation": { "type": "string" }
          },
          "required": ["content", "explanation"]
        }
      },
      "required": ["report"]
    },
    "error": { "type": "null" }
  },
  "required": ["data", "error"]
};
