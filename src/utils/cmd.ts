import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { saveLog } from "./logger";

function runCommand(command: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child: ChildProcessWithoutNullStreams = spawn(command, [], {
      shell: true,
    });

    child.on("error", (error: Error) => {
      reject(error.message);
    });

    child.on("exit", (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          `Command "${command}" exited with incorrect status code ${code}`
        );
      }
    });
  });
}

export async function runCommandsInOrder(commands: string[]): Promise<void> {
  for (const command of commands) {
    try {
      await runCommand(command);
      saveLog(`Command "${command}" completed successfully.`);
    } catch (error) {
      saveLog(`Command "${command}" failed with error: ${error}`);
    }
  }
}
