"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const movies_1 = __importDefault(require("./movies"));
const lists_1 = __importDefault(require("./lists"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/screendiary", movies_1.default, lists_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
