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
    try {
        const { title, status } = req.body;
        const userId = req.user.userId;
        if (!title || !status)
            return res.status(400).json({ message: "title and status required" });
        const movie = yield fetchMovie(title);
        const movieLog = yield prisma.movieLog.create({
            data: { userId, imdbId: movie.imdbID, title: movie.Title, poster: movie.Poster, status: status.toUpperCase() },
        });
        res.status(201).json({ message: "Movie added", movieLog });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Get Movies by Status
//@ts-ignore
router.get("/:status", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        const userId = req.user.userId;
        // Validate status
        if (!Object.values(client_1.MovieStatus).includes(status)) {
            return res.status(400).json({ message: `Invalid status: ${status}` });
        }
        const movies = yield prisma.movieLog.findMany({
            where: { userId, status: status },
        });
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
router.get("/:username/films", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const watched = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHED" },
        });
        const watching = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHING" },
        });
        const watchlist = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHLIST" },
        });
        res.json({
            watched,
            watching,
            watchlist,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
exports.default = router;
