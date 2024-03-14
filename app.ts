import compression from "compression";
import express from "express";
import helmet from "helmet";
import { CacheMiddleware } from "./middlewares";
import router from "./routes";
import { JSON_OPTIONS, URL_ENCODE_OPTIONS } from "./utils/constant.util";

const app = express();

// Middlewares
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(compression());
app.use(express.urlencoded(URL_ENCODE_OPTIONS));
app.use(helmet());

app.use(express.json(JSON_OPTIONS));
app.use(CacheMiddleware);

// Routes
app.use("/api/v1", router);

export { app };
