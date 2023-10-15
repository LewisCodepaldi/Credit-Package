import React from 'react';

interface FinancialTableProps {
  label: string;
  data: string[][];
}

const FinancialTable: React.FC<FinancialTableProps> = ({ label, data }) => {
  const handleCopy = (event: React.ClipboardEvent<HTMLTableElement>) => {
    const copiedContent = window.getSelection()?.toString()
    const isTableContent = event.currentTarget.contains(event.target as Node)
    if (isTableContent && copiedContent) {
      window.btracking.add({
        eventName: `copied ${label} table content`,
        name: label,
        value: '',
        u: window.location.href,
      });
    }
  };

  return (
    <>
      <div className="financial-analysis-label">{label}</div>
      <table className="financial-analysis-table" onCopy={handleCopy}>
        <thead>
          <tr>
            <th>{label}</th>
            <th>YTD</th>
            <th>PY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={cellIndex === 0 ? 'label-cell' : 'value-cell'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FinancialTable;
