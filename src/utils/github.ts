import { Request } from "express";
import { createHmac } from "crypto";
import { GitBody } from "../types";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

console.log(`Initializing with secret: ${WEBHOOK_SECRET}`);

if (!WEBHOOK_SECRET) {
  console.error("ERROR: Inform WEBHOOK_SECRET on .env");
  process.exit();
}

export function verify_signature(req: Request) {
  console.log(req.body);

  const signature = createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  console.log("----");
  console.log(req.headers["x-hub-signature-256"]);

  return `sha256=${signature}` === req.headers["x-hub-signature-256"];
}

export function parseBody(req: Request): GitBody {
  const body = req.body;

  return {
    repository: {
      name: body.repository.name,
      branch: body.ref.split("/").pop(),
      private: body.repository.private,
    },
    pusher: body.pusher,
    message: body.head_commit.message,
  };
}
