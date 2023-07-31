import { NextFunction, Request, Response, Router } from "express";
import { parseBody, verify_signature } from "./utils/github";
import { repos } from "./utils/repository";
import { saveLog } from "./utils/logger";
import { runCommandsInOrder } from "./utils/cmd";

const router = Router();

const validateGitHook = (req: Request, res: Response, next: NextFunction) => {
  if (!verify_signature(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  return next();
};

const validateRepository = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedBody = parseBody(req);

  const repo = repos.find((repo) => repo.name === parsedBody.repository.name);

  if (!repo) {
    saveLog(`Repository [${parsedBody.repository.name}] not listed.`);

    return res
      .status(422)
      .send(`Repository [${parsedBody.repository.name}] not listed.`);
  }

  return next();
};

const validateUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedBody = parseBody(req);

  const repo = repos.find((repo) => repo.name === parsedBody.repository.name);

  if (repo?.allowedPushers) {
    const userAllowed = repo.allowedPushers.find(
      (user) => user === parsedBody.pusher.email
    );

    if (!userAllowed) {
      saveLog(`User [${parsedBody.pusher.email}] not allowed to push.`);

      return res
        .status(422)
        .send(`User [${parsedBody.pusher.email}] not allowed to push.`);
    }
  }

  return next();
};

const validateBranches = (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = parseBody(req);

  const repo = repos.find((repo) => repo.name === parsedBody.repository.name);

  if (repo?.branches) {
    if (
      !repo.branches.find((branch) => branch === parsedBody.repository.branch)
    ) {
      saveLog(
        `CI/DI ignored on repository [${parsedBody.repository.name}] on branch [${parsedBody.repository.branch}]`
      );

      return res.status(200).json({
        message: `CI/DI ignored on repository [${parsedBody.repository.name}] on branch [${parsedBody.repository.branch}]`,
      });
    }
  }

  return next();
};

const validateSkipFlags = (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = parseBody(req);

  const repo = repos.find((repo) => repo.name === parsedBody.repository.name);

  if (repo?.skipFlag) {
    if (parsedBody.message.startsWith(repo.skipFlag)) {
      saveLog(`CI/DI ignored by flag [${repo.skipFlag}]`);

      return res
        .status(200)
        .json({ message: `CI/DI ignored by flag [${repo.skipFlag}]` });
    }
  }

  return next();
};

router.use(validateGitHook);
router.use(validateRepository);
router.use(validateUserPermission);
router.use(validateBranches);
router.use(validateSkipFlags);

router.post("/webhook", (req: Request, res: Response) => {
  const parsedBody = parseBody(req);

  saveLog(
    `Updating repository [${parsedBody.repository.name}] by user [${parsedBody.pusher.email}].`
  );

  const repo = repos.find((repo) => repo.name === parsedBody.repository.name);
  if (repo) {
    const commands = repo.commands;

    runCommandsInOrder(commands);
  }

  return res.status(200).json({ message: "CI/DI successfully ran." });
});

export { router };
