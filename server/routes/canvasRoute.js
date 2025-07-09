import express from "express";
import {
  addCanvas,
  DeleteCanvas,
  fetchCanvas,
} from "../controller/canvasController.js";

const router = express.Router();

router.post("/add", addCanvas);
router.get("/all", fetchCanvas);
router.delete("/delete/:id", DeleteCanvas);

export default router;
