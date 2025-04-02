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
router.post("/add", authenticate, async (req, res) => {
  try {
    const { title, status } = req.body;
    const userId = (req as any).user.userId; // Ensure authenticate middleware attaches user data

    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required" });
    }

    const validStatuses = Object.values(MovieStatus);
    const upperStatus = status.toUpperCase() as MovieStatus;

    if (!validStatuses.includes(upperStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const movie = await fetchMovie(title);
    const movieLog = await prisma.movieLog.create({
      data: { 
        userId, 
        imdbId: movie.imdbID, 
        title: movie.Title, 
        poster: movie.Poster, 
        status: upperStatus,
        //@ts-ignore
        rated: movie.Rated,
        year: movie.Year,
        genre: movie.Genre,
        actors: movie.Actors,
        plot: movie.Plot,
        country: movie.Country,
        imdbRating: movie.imdbRating,
        rottenTomatoesRating: movie.Ratings && Array.isArray(movie.Ratings) 
          ? movie.Ratings.find((r: { Source: string, Value: string }) => r.Source === "Rotten Tomatoes")?.Value || null
          : null
      },
    
    });
    
    

    res.status(201).json({ message: "Movie added", movieLog });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get Movies by Status
router.get("/films", authenticate, async (req: express.Request, res: express.Response) => {
  try {
    const userId = (req as any).user.userId; 

    const moviesByStatus = await prisma.movieLog.findMany({
      where: { userId },
    });

    const categorizedMovies = {
      WATCHED: moviesByStatus.filter(movie => movie.status === "WATCHED"),
      WATCHING: moviesByStatus.filter(movie => movie.status === "WATCHING"),
      WATCHLIST: moviesByStatus.filter(movie => movie.status === "WATCHLIST"),
    };

    res.json(categorizedMovies);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch movies", error: error.message });
  }
});

export default router;
