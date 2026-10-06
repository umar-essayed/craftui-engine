/**
 * CraftUI Arabic Excel & RTL CSV Export Utility
 * 
 * Microsoft Excel on Windows requires a UTF-8 Byte Order Mark (BOM: \uFEFF)
 * at the start of CSV files; otherwise Arabic and RTL characters are rendered
 * as corrupted gibberish (e.g. Ø§Ù„Ù…Ø­Ø±Ùƒ).
 */

export interface CsvExportOptions {
  filename?: string;
  delimiter?: string;
}

export function exportArabicCsv<T = Record<string, unknown>>(
  headers: { label: string; key: keyof T | string }[],
  data: T[],
  options: CsvExportOptions = {}
): void {
  const filename = options.filename || `export_${new Date().toISOString().slice(0, 10)}`;
  const delimiter = options.delimiter || ',';

  // Format headers
  const headerRow = headers.map(h => `"${String(h.label).replace(/"/g, '""')}"`).join(delimiter);

  // Format data rows
  const dataRows = data.map(item => {
    return headers
      .map(h => {
        const val = (item as Record<string, unknown>)[h.key as string] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(delimiter);
  });

  const csvString = [headerRow, ...dataRows].join('\r\n');

  // Critical: Prepend UTF-8 BOM (\uFEFF)
  const blob = new Blob(['\uFEFF' + csvString], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
