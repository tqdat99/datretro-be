import { Router, Request, Response } from "express";

import board from "./boards";
import user from "./users";
import card from "./cards";
import auth from "./auth";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome to the Datretro API.");
  });

  board(app);
  user(app);
  card(app);
  auth(app);

  return app;
};
