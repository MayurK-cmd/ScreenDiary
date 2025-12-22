import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

export async function walletAuth(req, res) {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address required" });
  }

  // 1️⃣ Check if user exists
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("wallet_address", walletAddress)
    .single();

  let finalUser = user;

  // 2️⃣ Create user if not exists
  if (!user) {
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ wallet_address: walletAddress })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    finalUser = newUser;
  }

  // 3️⃣ Create JWT
  const token = jwt.sign(
    {
      userId: finalUser.id,
      walletAddress: finalUser.wallet_address,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 4️⃣ Send token + user
  res.json({
    token,
    user: {
      id: finalUser.id,
      walletAddress: finalUser.wallet_address,
    },
  });
}
