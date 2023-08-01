import { IncomingHttpHeaders } from "http";

declare module "http" {
  interface IncomingHttpHeaders {
    "x-hub-signature-256"?: string;
  }
}
