import "reflect-metadata";
import config from "./config";
import express from "express";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server is listening on port ${config.port}`);
  });
}

startServer();
