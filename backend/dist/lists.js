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
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./auth");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/:username/WATCHED", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const watched = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHED" },
        });
        res.json({
            watched,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
router.get("/:username/WATCHING", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const watching = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHING" },
        });
        res.json({
            watching,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
router.get("/:username/WATCHLIST", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const watchlist = yield prisma.movieLog.findMany({
            where: { userId, status: "WATCHLIST" },
        });
        res.json({
            watchlist,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch movies", error: error.message });
    }
}));
exports.default = router;
