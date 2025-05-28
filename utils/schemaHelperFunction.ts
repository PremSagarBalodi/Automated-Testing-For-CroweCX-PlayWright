import * as fs from "fs/promises";

export async function writeJsonFile(location: string, data: string) {
  try {
    await fs.writeFile(location, data);
  } catch (err) {
    console.error(err);
  }
}