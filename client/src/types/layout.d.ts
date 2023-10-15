export type RowType = { [key: string]: [string | number, string | number] }
export type ReportContentType = {
  'Balance Sheet': RowType;
  'Income Statement': RowType;
}