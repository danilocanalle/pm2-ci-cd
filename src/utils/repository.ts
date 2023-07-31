import { Repository } from "../types";
import { resolve } from "path";

export let repos: Repository[];

export async function getRepos() {
  const data = await import(resolve(process.cwd(), "repositories.json"));

  repos = data.default;
}

getRepos();
