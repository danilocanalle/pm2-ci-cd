import { Request } from "express";
import { createHmac } from "crypto";
import { GitBody } from "../types";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

if (!WEBHOOK_SECRET) {
  console.error("ERROR: Inform WEBHOOK_SECRET on .env");
  process.exit();
}

export function verify_signature(req: Request) {
  const signature = createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  return `sha256=${signature}` === req.headers["x-hub-signature-256"];
}

export function parseBody(req: Request): GitBody {
  const body = req.body;

  return {
    repository: {
      name: body.repository.name,
      private: body.repository.private,
    },
    pusher: body.pusher,
    message: body.head_commit.message,
  };
}
