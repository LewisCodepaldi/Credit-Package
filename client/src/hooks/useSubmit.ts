import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { RowType, ReportContentType } from '../types/layout';
import axios from 'axios';

export const useSubmit = (
  balanceSheetFile: FileWithPath | null,
  profitLossFile: FileWithPath | null,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportContent, setReportContent] = useState<ReportContentType>({
    'Balance Sheet': {},
    'Income Statement': {},
  });
  const [intermediaryData, setIntermediaryData] = useState<RowType>({});
  const [explanation, setExplanation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (balanceSheetFile && profitLossFile) {
      const formData = new FormData();
      formData.append('balanceSheet', balanceSheetFile);
      formData.append('profitAndLoss', profitLossFile);

      const uploadEndpoint = process.env.NODE_ENV === 'production'
        ? '/upload'
        : 'http://localhost:3000/upload'
  
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          uploadEndpoint,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 180000, // Extend the timeout to 3 minutes
          },
        );
        console.log(response);
        const report = response.data.data.report
        const balanceSheetData = report.content['Balance Sheet'];
        const incomeStatementData = report.content['Income Statement'];
        const reportIntermediary = report.content['intermediary'];
  
        // Calculate the Current Ratio
        const currentRatios = [0, 1].map(i => {
          const stripNumbers = (str: string): string => str.replace(/[$,]/g, '')
          const totalCurrentAssets = parseFloat(stripNumbers(balanceSheetData['Total Current Assets'][i]));
          const inventoryAsset = parseFloat(stripNumbers(reportIntermediary['Inventory Asset'][i].replace(/[$,]/g, '')))
          const totalCurrentLiabilities = parseFloat(stripNumbers(reportIntermediary['Total Current Liabilities'][i].replace(/[$,]/g, '')));
          const currentRatio = (totalCurrentAssets - inventoryAsset) / totalCurrentLiabilities;
          return isNaN(currentRatio) ? 'N/A' : currentRatio.toFixed(2)
        })

        // Update reportContent with the calculated Current Ratio
        setReportContent({
          'Balance Sheet': {
            ...balanceSheetData,
            'Current ratio (Current Asset : Current Liabilities)': currentRatios,
          },
          'Income Statement': incomeStatementData,
        });
        setIntermediaryData(reportIntermediary); // Set intermediary data
        setExplanation(response.data.data.report.explanation);
        setError(null); // Set error to null on successful response
      } catch (error: any) {
        console.error('Error uploading files:', error);
        setError(error?.message || 'Error uploading files.'); // Set error message
      }
      setIsSubmitting(false);
    }
  };
  
  return { isSubmitting, reportContent, intermediaryData, explanation, error, handleSubmit };
};
