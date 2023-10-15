import React, { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import Dropzone from './components/Dropzone';
import Report from './components/Report';
import { usePreview } from './hooks/usePreview';
import { useSubmit } from './hooks/useSubmit';
import './App.scss';
import { initBeacon } from './beacon';


function App() {
  const [balanceSheetFile, setBalanceSheetFile] = useState<FileWithPath | null>(null);
  const [profitLossFile, setProfitLossFile] = useState<FileWithPath | null>(null);
  const [balanceSheetPreview, setBalanceSheetPreview] = useState<string | null>(null);
  const [profitLossPreview, setProfitLossPreview] = useState<string | null>(null);

  usePreview(balanceSheetFile, setBalanceSheetPreview);
  usePreview(profitLossFile, setProfitLossPreview);

  const { isSubmitting, reportContent, intermediaryData, explanation, error, handleSubmit } = useSubmit(
    balanceSheetFile,
    profitLossFile
  );

  return (
    <div className="App">
      <header className="App-header">
        Credit Package
      </header>
      <div className="content">
        <div className="left-panel">
          <div className="dropzone-container">
            <Dropzone
              onDrop={(acceptedFiles: FileWithPath[]) => setBalanceSheetFile(acceptedFiles[0])}
              label="Balance Sheet"
              file={balanceSheetFile}
              preview={balanceSheetPreview}
              isDragActive={!!balanceSheetFile}
            />
            <Dropzone
              onDrop={(acceptedFiles: FileWithPath[]) => setProfitLossFile(acceptedFiles[0])}
              label="Income Statement"
              file={profitLossFile}
              preview={profitLossPreview}
              isDragActive={!!profitLossFile}
            />
          </div>
          <div className="hint-container">
            <p>Please wait with patience. ChatGPT may take 1~2 minutes to respond.</p>
          </div>
          <button data-eventname = "blur" data-name = "submit-button" data-value = "Submit" id="submit-button" onClick={handleSubmit}  disabled={!balanceSheetFile || !profitLossFile || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        <div className="right-panel">
          <Report reportContent={reportContent} intermediaryData={intermediaryData} explanation={explanation} error={error} />
        </div>
      </div>
    </div>
  );
}
initBeacon();
export default App;
