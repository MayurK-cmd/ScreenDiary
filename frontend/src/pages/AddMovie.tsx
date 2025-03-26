import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("WATCHLIST");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3000/screendiary/add", { title, status }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Movie added successfully");
      setTitle("");
      setStatus("WATCHLIST");
    } catch (error) {
      alert("Error adding movie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-8 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-tight">
          Add to Screen Diary
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text"
              placeholder="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         placeholder-gray-500 transition duration-300"
            />
          </div>
          
          <div>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         appearance-none transition duration-300"
            >
              <option value="WATCHLIST">Watchlist</option>
              <option value="WATCHING">Watching</option>
              <option value="WATCHED">Watched</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 
                        ${isSubmitting 
                          ? 'bg-gray-700 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
          >
            {isSubmitting ? 'Adding...' : 'Add Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;