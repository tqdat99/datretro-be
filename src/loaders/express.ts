import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../routes";
import config from "../config";
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req: any, res: any) => {
    res.status(200).end();
  });
  app.head("/status", (req: any, res: any) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());

  app.use(require("method-override")());

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(config.api.prefix, routes());

  app.use((req: any, res: any, next: any) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
