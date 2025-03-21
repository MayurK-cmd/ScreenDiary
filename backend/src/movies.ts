import express from "express";
import { PrismaClient, MovieStatus } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import { authenticate } from "./auth";

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY || "your_omdb_api_key";

// Fetch Movie from OMDb API
const fetchMovie = async (title: string) => {
  const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`);
  if (response.data.Response === "False") throw new Error("Movie not found");
  return response.data;
};

// Add Movie to List
//@ts-ignore
router.post("/:username/add", authenticate, async (req: any, res) => {
  try {
    const { title, status } = req.body;
    const userId = req.user.userId;

    if (!title || !status) return res.status(400).json({ message: "title and status required" });

    const movie = await fetchMovie(title);
    const movieLog = await prisma.movieLog.create({
      data: { userId, imdbId:movie.imdbID, title: movie.Title, poster: movie.Poster, status: status.toUpperCase() as any },
    });

    res.status(201).json({ message: "Movie added", movieLog });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get Movies by Status
//@ts-ignore


router.get("/:username/films", authenticate, async (req: any, res) => {
    try {
      const userId = req.user.userId;
  
      const watched = await prisma.movieLog.findMany({
        where: { userId, status: "WATCHED" },
      });
  
      const watching = await prisma.movieLog.findMany({
        where: { userId, status: "WATCHING" },
      });
  
      const watchlist = await prisma.movieLog.findMany({
        where: { userId, status: "WATCHLIST" },
      });
  
      res.json({
        watched,
        watching,
        watchlist,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
  });

export default router;
