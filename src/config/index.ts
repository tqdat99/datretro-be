import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

  databaseUser: process.env.MONGO_USER,
  databasePassword: process.env.MONGO_PASSWORD,
  databasePath: process.env.MONGO_PATH,
  jwtSecret: process.env.JWT_SECRET,

  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },

  api: {
    prefix: "/api"
  }
};
