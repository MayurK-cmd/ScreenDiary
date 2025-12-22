import { Router } from "express";
import {requireAuth} from "../middleware/requireAuth.js";
import { getRecommendations } from "../controllers/ai.controller.js";

const router = Router();

router.get("/recommend",requireAuth, getRecommendations);

export default router;
