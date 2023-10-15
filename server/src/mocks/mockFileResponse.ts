// prettier-ignore
export const mockReport = {
  "data": {
    "report": {
      "content": {
        "Balance Sheet": {
          "Cash & equivalents": ["$2,335,126.41", "N/A"],
          "AR": ["N/A", "N/A"],
          "Total Current Assets": ["$8,340,031.24", "N/A"],
          "AP": ["$2,386,798.09", "N/A"],
          "Current ratio (Current Asset : Current Liabilities)": ["2.63", "N/A"],
          "ST loans": ["$5,872,247.78", "N/A"],
          "LT loans": ["N/A", "N/A"],
          "Equity value": ["$2,557,080.17", "N/A"],
          "Debt/Equity Ratio": ["2.30", "N/A"],
          "Debt/Asset Ratio": ["0.70", "N/A"]
        },
        "Income Statement": {
          "Total Revenue": ["$34,725,547", "N/A"],
          "Gross Profit": ["$9,056,112", "N/A"],
          "Operating Profit": ["$3,183,229", "N/A"],
          "Net Income": ["$3,183,229", "N/A"],
          "Interest Expense": ["N/A", "N/A"],
          "Coverage Ratio (EBIT / Interest Expense)": ["N/A", "N/A"]
        }
      },
      "intermediary": {
        "Inventory Asset": ["$4,407,266.46", "N/A"],
        "Total Current Liabilities": ["$5,872,247.78", "N/A"]
      },
      "explanation": "The current ratio is calculated as (Total Current Assets - Inventory Asset) / Total Current Liabilities = ($8,340,031.24 - $4,407,266.46) / $5,872,247.78 = 2.63. The debt-to-equity ratio is calculated as Total Liabilities / Total Equity = $5,872,247.78 / $2,557,080.17 = 2.30. The debt-to-asset ratio is calculated as Total Liabilities / TOTAL ASSETS = $5,872,247.78 / $8,429,327.95 = 0.70. Please note that information for the previous year is unavailable, so we are marking those fields as N/A."
    }
  },
  "error": null
};

export const mockInvalidReport = `Based on the provided financial statements, I cannot compute the values for the previous year since they are not explicitly given. However, I have computed the values for the year-to-date (2022), and the JSON response is as follows:

{
  "data": {
    "report": {
      "content": {
        "Balance Sheet": {
          "Cash & equivalents": ["$2,335,126.41", "N/A"],
          "AR": ["N/A", "N/A"],
          "Total Current Assets": ["$8,340,031.24", "N/A"],
          "AP": ["$2,386,798.09", "N/A"],
          "Current ratio (Current Asset : Current Liabilities)": ["1.62", "N/A"],
          "ST loans": ["$5,872,247.78", "N/A"],
          "LT loans": ["N/A", "N/A"],
          "Equity value": ["$2,557,080.17", "N/A"],
          "Debt/Equity Ratio": ["2.29", "N/A"],
          "Debt/Asset Ratio": ["0.70", "N/A"]
        },
        "Income Statement": {
          "Total Revenue": ["$34,725,547", "N/A"],
          "Gross Profit": ["$9,056,112", "N/A"],
          "Operating Profit": ["3,183,229", "N/A"],
          "Net Income": ["$3,082,629.47", "N/A"],
          "Interest Expense": ["N/A", "N/A"],
          "Coverage Ratio (EBIT / Interest Expense)": ["N/A", "N/A"]
        }
      },
      "intermediary": {
        "Inventory Asset": ["$4,407,266.46", "N/A"],
        "Total Current Liabilities": ["$5,872,247.78", "N/A"]
      },
      "explanation": "The current ratio is calculated as (Total Current Assets - Inventory Asset) / Total Current Liabilities, which gives (8,340,031.24 - 4,407,266.46) / 5,872,247.78 = 1.62. The Debt/Equity ratio is calculated as Total Liabilities / Total Equity, which gives 5,872,247.78 / 2,557,080.17 = 2.29. The Debt/Asset ratio is calculated as Total Liabilities / TOTAL ASSETS, which gives 5,872,247.78 / 8,429,327.95 = 0.70."
    }
  },
  "error": null
}`;
