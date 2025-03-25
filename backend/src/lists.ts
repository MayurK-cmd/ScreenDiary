import express from "express";
import { PrismaClient, MovieStatus } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import { authenticate } from "./auth";

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();


router.get("/:username/WATCHED", authenticate, async (req: any, res) => {
    try {
        const userId = req.user.userId;
    
        const watched = await prisma.movieLog.findMany({
          where: { userId, status: "WATCHED" },
        });
    res.json({
        watched,
        
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
});
router.get("/:username/WATCHING", authenticate, async (req: any, res) => {
    try {
        const userId = req.user.userId;
    
        const watching = await prisma.movieLog.findMany({
          where: { userId, status: "WATCHING" },
        });
    res.json({
        watching,
        
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
});
router.get("/:username/WATCHLIST", authenticate, async (req: any, res) => {
    try {
        const userId = req.user.userId;
    
        const watchlist = await prisma.movieLog.findMany({
          where: { userId, status: "WATCHLIST" },
        });
    res.json({
        watchlist,
        
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
});

export default router;