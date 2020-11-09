import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import { cleanEnv, str, port } from "envalid";

export default async ({ expressApp }) => {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port()
  });

  const mongoConnection = await mongooseLoader();
  Logger.info("DB loaded and connected!");

  Logger.info("Dependency Injector loaded");

  expressLoader({ app: expressApp });

  Logger.info("Express loaded");
};
