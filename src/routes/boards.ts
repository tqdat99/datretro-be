import { Router, Request, Response } from "express";
import { Container } from "typedi";
import _ from "lodash";
import BoardService from "../services/board";
import CardService from "../services/card";

export default (app: Router) => {

  //Get boards
  app.get("/boards", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const boards = await boardService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(boards);
  });

  //Get boards of a user
  app.get("/:username/boards", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { username } = req.params;

    const boards = await boardService.get({ user: { $eq: username } }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(boards);
  });

  //Get board by id
  app.get("/boards/:boardId", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;

    const board = await boardService.getById(boardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(board);
  });


  //Get cards of board by id
  app.get("/boards/:boardId/cards", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);
    const { boardId } = req.params;

    const cards = await cardService.get({ boardId: { $eq: boardId } }).catch(error => {
      return res.status(500).json({ error });
    });
    return res.status(200).json(cards);
  });

  //Create board
  app.post("/boards/create", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { title, user } = req.body;

    const board = await boardService
      .create({
        title,
        user
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(board);
  });

  //Update board
  app.patch("/boards/:boardId/update", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;
    const { title } = req.body;

    const board = await boardService
      .update(boardId, {
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(board);
  });

  //Delete a board
  app.delete("/boards/:boardId/delete", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;

    const board = await boardService.delete(boardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(board);
  });
};
