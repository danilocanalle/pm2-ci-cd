export type Repository = {
  name: string;
  commands: string[];
  cwd?: string;
  branches?: string[];
  allowedPushers?: string[];
  skipFlag?: string;
};

export type GitBody = {
  repository: {
    name: string;
    branch: string;
    private: string;
  };
  pusher: {
    name: string;
    email: string;
  };
  message: string;
};
