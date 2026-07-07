import * as XLSX from 'xlsx';

export class ExcelReader {
  static read(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      defval: '',
      raw: false
    }) as any[];

    return rows.map((row) => {
      const cleanRow: any = {};

      for (const key of Object.keys(row)) {
        cleanRow[key.trim()] =
          typeof row[key] === 'string' ? row[key].trim() : row[key];
      }

      return cleanRow;
    });
  }
}