import fs from "fs/promises";
import { resolve } from "path";

const LOG_FILE = resolve(process.cwd(), "log.txt");

export async function saveLog(message: string) {
  const currentTime = new Date().toLocaleString("pt-BR", {
    hour12: false,
    dateStyle: "short",
    timeStyle: "short",
  });

  const messageWithDate = `${currentTime} - ${message} \n`;

  await fs.appendFile(LOG_FILE, messageWithDate, "utf-8");
}
