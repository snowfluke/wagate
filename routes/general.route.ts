import Router from "express-promise-router";
const router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "REST API is working" });
});

export default router;
