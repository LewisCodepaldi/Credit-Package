interface FinancialReportType {
  content: object;
  intermediary: object;
  explanation: string;
}

interface FinancialResponseDataType {
  report: FinancialReportType;
}

export interface FinancialResponseType {
  data: FinancialResponseDataType | null;
  error: string | null;
}
