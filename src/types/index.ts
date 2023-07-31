export type Repository = {
  name: string;
  allowedPushers: string[];
  commands: string[];
  skipFlag?: string;
};

export type GitBody = {
  repository: {
    name: string;
    private: string;
  };
  pusher: {
    name: string;
    email: string;
  };
  message: string;
};
