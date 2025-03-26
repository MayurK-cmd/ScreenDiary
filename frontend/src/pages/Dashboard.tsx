import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { Eye, Check, ListPlus } from "lucide-react";

interface MovieType {
  id: number;
  title: string;
  director: string;
  status: string;
  releaseYear: number;
}

const Dashboard = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const { token } = useAuth();

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

  // Status color and icon mapping
  const statusConfig = {
    WATCHLIST: { 
      color: "bg-yellow-500", 
      icon: <ListPlus className="text-yellow-500" size={20} /> 
    },
    WATCHING: { 
      color: "bg-blue-500", 
      icon: <Eye className="text-blue-500" size={20} /> 
    },
    WATCHED: { 
      color: "bg-green-500", 
      icon: <Check className="text-green-500" size={20} /> 
    }
  };

  // Filter movies based on selected status
  const filteredMovies = filter === "ALL" 
    ? movies 
    : movies.filter(movie => movie.status === filter);
  
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          {["ALL", "WATCHLIST", "WATCHING", "WATCHED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-300 
                ${filter === status 
                  ? 'bg-blue-700' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 
                           transform transition duration-300 hover:scale-105 
                           hover:shadow-2xl relative"
              >
                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig[movie.status].color} bg-opacity-20`}>
                    {statusConfig[movie.status].icon}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 truncate">
                  {movie.title}
                </h2>
                
                <div className="text-gray-400 space-y-1">
                  {movie.director && (
                    <p className="text-sm">
                      <span className="font-semibold text-gray-300">Director:</span> {movie.director}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-semibold text-gray-300">Release Year:</span> {movie.releaseYear}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${statusConfig[movie.status].color} 
                        text-white bg-opacity-20`}
                    >
                      {movie.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No movies in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;