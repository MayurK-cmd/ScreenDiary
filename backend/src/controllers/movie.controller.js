

import { supabase } from "../config/supabase.js";
import { fetchAndStoreMovieByTitle } from "../services/omdb.service.js";

export async function addToWatchlist(req, res) {
  try {
    const { title } = req.body;
    const userId = req.user.userId; // 🔐 from JWT

    const movie = await fetchAndStoreMovieByTitle(title);

    await supabase.from("user_movies").upsert({
      user_id: userId,
      movie_id: movie.id,
      status: "watchlist",
    });

    res.json({ success: true, movie });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export async function addToWatched(req, res) {
  try {
    const { title, rating } = req.body;
    const userId = req.user.userId;

    const movie = await fetchAndStoreMovieByTitle(title);

    const { error } = await supabase
      .from("user_movies")
      .upsert(
        {
          user_id: userId,
          movie_id: movie.id,
          status: "watched",
          rating,
        },
        { onConflict: "user_id,movie_id" }
      );

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ movie });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}




export async function getWatched(req, res) {
  const userId = req.user.userId;

  const { data, error } = await supabase
    .from("user_movies")
    .select("movie_id, rating, movies(*)")
    .eq("user_id", userId)
    .eq("status", "watched");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
}
