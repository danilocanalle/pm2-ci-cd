import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { saveLog } from "./logger";

function runCommand(command: string, cwd?: string): Promise<void> {
  console.log(command, cwd);

  return new Promise<void>((resolve, reject) => {
    const child: ChildProcessWithoutNullStreams = spawn(command, [], {
      shell: true,
      // env: {},
      // detached: true,
      cwd,
    });

    // Captura stdout
    child.stdout.on("data", (data: Buffer) => {
      const output = data.toString();
      console.log(output);
      saveLog(output);
    });

    // Captura stderr
    child.stderr.on("data", (data: Buffer) => {
      const error = data.toString();
      console.error(error);
      saveLog(`ERROR: ${error}`);
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

export async function runCommandsInOrder(
  commands: string[],
  cwd?: string
): Promise<void> {
  for (const command of commands) {
    try {
      await runCommand(command, cwd);
      saveLog(`Command "${command}" completed successfully.`);
    } catch (error) {
      saveLog(`Command "${command}" failed with error: ${error}`);
    }
  }
}
