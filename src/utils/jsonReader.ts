import fs from "fs";
import path from "path";

export class JsonReader {
  static read(fileName: string) {
    const filePath = path.resolve(
      __dirname,
      `../../test-data/${fileName}.json`
    );

    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
}