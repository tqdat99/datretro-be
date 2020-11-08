import config from "./config";
import express from "express";
import Logger from "./loaders/logger";

const app = express();

require("./loaders").default({ expressApp: app });

app.listen(process.env.PORT || config.port, () => {
  Logger.info(`Server is listening on port ${config.port}`);
});
