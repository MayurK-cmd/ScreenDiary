import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup
//@ts-ignore
router.post("/signup", async (req, res) => {
  const { email, username, displayname, password } = req.body;

  if (!email || !username || !displayname || !password) {
    return res.status(400).json({ message: "Email, username, display name, and password are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  const existingUsername = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists" });
  }

  if (existingUsername) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, username, displayname, password: hashedPassword },
  });

  res.status(201).json({ message: "User created successfully", user });
});

// Login
//@ts-ignore
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Middleware for Authentication
export const authenticate = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default router;
