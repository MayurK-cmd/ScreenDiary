import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { Eye, Clock, List} from "lucide-react";
import { Link } from "react-router-dom";
import AddMovieModal from "../components/Modals/AddMovieModal"; 

interface MovieType {
  id: number;
  title: string;
  director: string;
  status: string;
  releaseYear: number;
  poster: string;
  rating: number;
  description: string;
  plot: string;
  year: string;
  genre: string;
  actors: string;
  rated: string;
  country: string;
  imdbRating: string;
  rottenTomatoesRating: string;
}

const Dashboard = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const { token } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null); // ✅ Manage modal state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/screendiary/films`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  type StatusConfigType = {
    [key: string]: {
      color: string;
      icon: React.ReactNode;
    };
  };

  const statusConfig: StatusConfigType = {
    WATCHED: {
      color: "bg-green-500",
      icon: <Eye className="w-5 h-5 " />,
    },
    WATCHING: {
      color: "bg-blue-500",
      icon: <Clock className="w-5 h-5 " />,
    },
    WATCHLIST: {
      color: "bg-yellow-500",
      icon: <List className="w-5 h-5" />,
    },
  };

  const filteredMovies =
    filter === "ALL" ? movies : movies.filter((movie) => movie.status === filter);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-6 hidden md:block h-screen fixed">
        <nav className="space-y-4">
          <Link to="/profile" className="block font-semibold text-gray-800 hover:text-gray-600">
            My Profile
          </Link>
          
          <Link to="/add-movie" className="block font-semibold text-gray-800 hover:text-gray-600">
            Add Movie
          </Link>
        </nav>
      </aside>

      <div className="flex-1 p-6 ml-64">
        {/* Full-width Navbar */}
        <nav className="bg-gray-100 text-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="space-x-4">
            <Link to="/profile" className="hover:underline">
              My Profile
            </Link>
            <Link to="/lists" className="hover:underline">
              My Lists
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-16">
          <div className="flex justify-center mb-8 space-x-4">
            {["ALL", "WATCHLIST", "WATCHING", "WATCHED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 
                  ${filter === status ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie) => (
                <div
                key={movie.id}
                className="bg-gray-100 rounded-xl p-4 border border-gray-300 
                           transform transition duration-300 hover:scale-105 hover:shadow-lg hover:border-black relative"
              >
              
              
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig[movie.status].color} bg-opacity-20`}
                    >
                      {statusConfig[movie.status].icon}
                    </div>
                  </div>
                  <img
  src={movie.poster}
  alt={movie.title}
  className="w-full h-[360px] object-cover rounded-md mb-4 cursor-pointer transition duration-300 border border-transparent hover:border-black"
  onClick={() => setSelectedMovie(movie)}
/>

                  <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">{movie.title}</h2>
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

      {/* ✅ Add Movie Modal */}
      <AddMovieModal
        isOpen={!!selectedMovie} // Show modal only if a movie is selected
        onClose={() => setSelectedMovie(null)} // Close modal when needed
        selectedMovie={selectedMovie} // Pass movie data to modal
      />
    </div>
  );
};

export default Dashboard;
