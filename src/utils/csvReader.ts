import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface EditReader {
    categoryname: string;
    coursename: string;
    description: string;
    successmessage: string;
}

export function readEditData(): EditReader[] {
    const filePath = path.join(process.cwd(), "test-data", "editCourseCategoryData.csv");
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return parse(fileContent, { columns: true, skip_empty_lines: true, trim: true }) as EditReader[];
}



