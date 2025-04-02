"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./auth");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY || "your_omdb_api_key";
// Fetch Movie from OMDb API
const fetchMovie = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`);
    if (response.data.Response === "False")
        throw new Error("Movie not found");
    return response.data;
});
// Add Movie to List
//@ts-ignore
router.post("/add", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, status } = req.body;
        const userId = req.user.userId; // Ensure authenticate middleware attaches user data
        if (!title || !status) {
            return res.status(400).json({ message: "Title and status are required" });
        }
        const validStatuses = Object.values(client_1.MovieStatus);
        const upperStatus = status.toUpperCase();
        if (!validStatuses.includes(upperStatus)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const movie = yield fetchMovie(title);
        const movieLog = yield prisma.movieLog.create({
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
                    ? ((_a = movie.Ratings.find((r) => r.Source === "Rotten Tomatoes")) === null || _a === void 0 ? void 0 : _a.Value) || null
                    : null
            },
        });
        res.status(201).json({ message: "Movie added", movieLog });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Get Movies by Status
router.get("/films", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const moviesByStatus = yield prisma.movieLog.findMany({
            where: { userId },
        });
        const categorizedMovies = {
            WATCHED: moviesByStatus.filter(movie => movie.status === "WATCHED"),
            WATCHING: moviesByStatus.filter(movie => movie.status === "WATCHING"),
            WATCHLIST: moviesByStatus.filter(movie => movie.status === "WATCHLIST"),
        };
        res.json(categorizedMovies);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
exports.default = router;
