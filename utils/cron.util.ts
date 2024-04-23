// bikin file cron.util.ts di folder utils
import dotenv from "dotenv";
import { CronJob } from "cron";
import https from "https";
dotenv.config();

const fetch = require("node-fetch");
const agent = new https.Agent({ keepAlive: false });
const ENDPOINT = process.env.ENDPOINT || "";

console.log("CRON ENDPOINT: ", ENDPOINT)

const cron5min = new CronJob("*/5 * * * *", async () => {
  await fetch(ENDPOINT, {
    method: "POST",
    agent,
  });
});

export {cron5min}