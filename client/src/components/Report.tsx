import React from 'react';
import { RowType, ReportContentType } from '../types/layout';
import FinancialTable from './FinancialTable';
import './Report.scss';

interface ReportProps {
  reportContent: ReportContentType;
  intermediaryData: RowType;
  explanation: string;
  error: string | null;
}

const formatCurrency = (value: string | number) => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  return value;
};

const prepareTableData = (data: { [key: string]: [string | number, string | number] }) => {
  return Object.entries(data).map(([key, [ytd, py]]) => [
    key,
    formatCurrency(ytd),
    formatCurrency(py),
  ]);
};

const Report: React.FC<ReportProps> = ({ reportContent, intermediaryData, explanation, error }) => {
  const balanceSheetData = prepareTableData(reportContent['Balance Sheet']);
  const incomeStatementData = prepareTableData(reportContent['Income Statement']);
  const intermediaryTableData = prepareTableData(intermediaryData);

  const handleDownloadCsv = () => {
    const csvHeader = [
      ['Balance Sheet', 'YTD', 'PY'],
      ...balanceSheetData,
      [],
      ['Income Statement', 'YTD', 'PY'],
      ...incomeStatementData,
    ];
  
    const csvContent = csvHeader
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');
  
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'financial_analysis.csv');
    link.click();
  };

  return (
    <>
      {error && (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      )}
      {Object.keys(reportContent).length > 0 && (
        <>
          <div className="table-container">
            <FinancialTable label="Balance Sheet" data={balanceSheetData} />
            <FinancialTable label="Income Statement" data={incomeStatementData} />
            <FinancialTable label="Intermediary Values" data={intermediaryTableData} />
            <div className="hint">
              Note: Current Ratio is recalculated to overwrite GPT response.
            </div>
          </div>
          <button data-eventname = "blur" data-name = "download-csv-button" data-value = "Download as CSV" id="download-as-csv-button" onClick={handleDownloadCsv} className="download-csv-button">
            Download as CSV
          </button>
        </>
      )}
      {explanation && (
        <div className="explanation-container">
          <h3>Explanation by ChatGPT:</h3>
          <p>{explanation}</p>
        </div>
      )}
    </>
  );
};

export default Report;
