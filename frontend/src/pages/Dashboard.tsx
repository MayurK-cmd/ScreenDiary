import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

interface MovieType {
  id: number;
  title: string;
  director: string;

  status: string;
  releaseYear: number;
}

const Dashboard = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { token } = useAuth();
  //const username = "testuser"; // Replace with actual username, or get from context/state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/screendiary/films`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("API Response:", res.data);
  
        // Combine all movies into a single array
        const allMovies = [
          ...(res.data.WATCHED || []),
          ...(res.data.WATCHING || []),
          ...(res.data.WATCHLIST || []),
        ];
  
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Error fetching movies");
      }
    };
  
    if (token) {
      fetchMovies();
    }
  }, [token]);
  
  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            {/* <img src={movie.poster} alt={movie.title} style={{ width: "100px" }} /> */}
            <h2>{movie.title}</h2>
            <p>Status: {movie.status}</p>
          </div>
        ))
      ) : (
        <p>No movies available.</p>
      )}
    </div>
  );
  
};

export default Dashboard;
