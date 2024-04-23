import dotenv from "dotenv";
import { app } from "./app";
import { WagateClient } from "./lib/wagate-client";
import logger from "./utils/log.util";
import {cron5min} from "./utils/cron.util";
dotenv.config();
const PORT = process.env.PORT || 4321;

logger.info("Starting the server...");
let client: WagateClient;

// Init
app.listen(PORT, async () => {
  logger.info("REST API is running on port " + PORT);
  client = new WagateClient();

  logger.info("Starting the bot...");
  await client.init();
  cron5min.start();
});

// Global error catch
process.once("unhandledRejection", async function (reason) {
  logger.error(reason);
});

process.once("uncaughtException", async function (err) {
  logger.error(err.message);
});

export { client };
