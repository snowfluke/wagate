import Router from "express-promise-router";
import { ErrorMiddleware } from "../middlewares";

import generalRoute from "./general.route";
import senderRoute from "./sender.route";

const router = Router();

// All routes
router.use("/", generalRoute);
router.use("/send", senderRoute);

// Error middleware
router.use(ErrorMiddleware);

export default router;
