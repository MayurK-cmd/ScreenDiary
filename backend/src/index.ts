import express from "express";
import authRoutes from "./auth";
import movieRoutes from "./movies";
import listRoutes from "./lists";
import dotenv from "dotenv";




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/screendiary", movieRoutes,listRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
