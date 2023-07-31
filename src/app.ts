import express from "express";

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { router } from "./routes";

if (!process.env.PORT) {
  console.error("ERROR: Inform PORT on .env");
  process.exit();
}

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT);
