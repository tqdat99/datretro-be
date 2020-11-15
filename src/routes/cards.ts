import { Router, Request, Response } from "express";
import { Container } from "typedi";
import _ from "lodash";

import CardService from "../services/card";

export default (app: Router) => {

  //Get cards
  app.get("/cards", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);
    const cards = await cardService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(cards);
  });


  //Get card by id
  app.get("/cards/:cardId", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { cardId } = req.params;

    const card = await cardService.getById(cardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(card);
  });

  //Create card
  app.post("/cards/create", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { boardId, title, content, column } = req.body;

    const card = await cardService
      .create({
        boardId,
        title,
        content,
        column,
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(card);
  });

  //Update card
  app.patch("/cards/:cardId/update", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { cardId } = req.params;
    const { title, content, column } = req.body;

    const card = await cardService
      .update(cardId, {
        title,
        content,
        column
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    console.log('here', cardId, title, content, column)

    return res.status(200).json(card);
  });

  //Delete card
  app.delete("/cards/:cardId/delete", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { cardId } = req.params;

    const card = await cardService.delete(cardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(card);
  });
};
