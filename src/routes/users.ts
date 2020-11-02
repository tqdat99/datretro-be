import { Router, Request, Response } from "express";
import { Container } from "typedi";
import _ from "lodash";
import UserService from "../services/user";

export default (app: Router) => {

  //Get users
  app.get("/users", async (req: Request, res: Response) => {
    const userService = Container.get(UserService);
    const users = await userService.get().catch(error => {
      return res.status(500).json({ error });
    });
    return res.status(200).json(users);
  });

  //Get user by id
  app.get("/users/:userId", async (req: Request, res: Response) => {
    const userService = Container.get(UserService);
    const { userId } = req.params;
    const user = await userService.getById(userId).catch(error => {
      return res.status(500).json({ error });
    });
    return res.status(200).json(user);
  });

  //Update user
  app.patch("/users/:userId/update", async (req: Request, res: Response) => {
    const userService = Container.get(UserService);

    const { userId } = req.params;
    const { displayName } = req.body;

    const user = await userService
      .update(userId, {
        displayName
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(user);
  });
};
