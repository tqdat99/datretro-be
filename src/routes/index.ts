import { Router, Request, Response } from "express";

import board from "./boards";
import user from "./users";
import card from "./cards";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome to the API.");
  });

  board(app);
  user(app);
  card(app);

  return app;
};
