import { IncomingHttpHeaders } from "http";

declare module "http" {
  interface IncomingHttpHeaders {
    "X-Hub-Signature-256"?: string;
  }
}
