import Router from "express-promise-router";
import multer from "multer";
import { sendMedia, sendMsg } from "../controllers/sender.controller";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.none(), sendMsg);

router.post("/media", upload.single("file"), sendMedia);

export default router;
