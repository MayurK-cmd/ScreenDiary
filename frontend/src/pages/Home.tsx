import { Link } from "react-router-dom";
import { Play, PlusCircle, LogIn } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-blue-500">Screen Diary</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          Track and organize your movie journey effortlessly.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/dashboard"
            className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 shadow-lg"
          >
            <Play className="mr-2" size={20} /> View My Movies
          </Link>

          <Link
            to="/add-movie"
            className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 shadow-lg"
          >
            <PlusCircle className="mr-2" size={20} /> Add Movie
          </Link>
        </div>

        {/* Sign Up / Sign In Button */}
        <div className="mt-6">
          <Link
            to="/signup"
            className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 shadow-lg"
          >
            <LogIn className="mr-2" size={20} /> Sign Up / Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
