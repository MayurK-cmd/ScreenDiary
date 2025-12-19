import fetch from "node-fetch";
import { supabase } from "../config/supabase.js";
import { ENV } from "../config/env.js";

/**
 * Search movie by title → get imdbID → store movie
 */
export async function fetchAndStoreMovieByTitle(title) {
  // 1. Search by title
  const searchRes = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${ENV.OMDB_API_KEY}`
  );
  const searchData = await searchRes.json();

  if (!searchData.Search || searchData.Search.length === 0) {
    throw new Error("Movie not found");
  }

  // Pick first result (best match)
  const imdbID = searchData.Search[0].imdbID;

  // 2. Check DB
  const { data: existing } = await supabase
    .from("movies")
    .select("*")
    .eq("imdb_id", imdbID)
    .single();

  if (existing) return existing;

  // 3. Fetch full movie data
  const movieRes = await fetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=${ENV.OMDB_API_KEY}`
  );
  const movie = await movieRes.json();

  // 4. Insert into DB
  const { data: inserted } = await supabase
    .from("movies")
    .insert({
      title: movie.Title,
      year: Number(movie.Year),
      genres: movie.Genre.split(",").map(g => g.trim()),
      imdb_id: movie.imdbID,
      poster: movie.Poster
    })
    .select()
    .single();

  return inserted;
}
