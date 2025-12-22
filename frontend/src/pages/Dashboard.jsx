import { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    async function fetchMovies() {

    const response = await api.get("/movies/watched-by-me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMovies(response.data);


    
  }}, []);

  

  function handleAdd(movie) {
    setMovies((prev) => [...prev, movie]);
  }

  

   async function handleAI() {
    try {
      const res = await api.get("/ai-rec/recommend");
      setRecommendations(res.data);
    } catch (err) {
      console.error("AI recommendation failed", err);
    }
  }

  return (
    <div>
      <MovieForm onAdd={handleAdd} />

      <MovieList title="Watched Movies" movies={movies} />

      <button onClick={handleAI}>Get AI Recommendations</button>

      {/* 🤖 AI Recommendations UI */}
      {recommendations.length > 0 && (
        <div>
          <h2>AI Picks For You</h2>
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <h3>
                {rec.title} ({rec.year})
              </h3>
              <p>
                <strong>Genre:</strong> {rec.genre}
              </p>
              <p>
                <strong>Why you’ll like it:</strong> {rec.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
