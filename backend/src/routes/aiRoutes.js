import express from "express";
import { generateTaskFromAI } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate-task", authMiddleware, generateTaskFromAI);

export default router;
