import { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Sparkles, LogOut } from "lucide-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }

    async function fetchMovies() {
      try {
        const response = await api.get("/movies/watched-by-me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(response.data);
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
      }
    }
    fetchMovies();
  }, [navigate]);

  async function handleAI() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/ai-rec/recommend", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(res.data);
    } catch (err) {
      console.error("AI recommendation failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-inter transition-colors duration-300">
      {/* Navbar */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold font-outfit text-indigo-600">ScreenDiary</h2>
          <WalletDisconnectButton />
          <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }} 
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Form & List */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
              Add to Diary
            </h3>
            <MovieForm onAdd={(movie) => setMovies([...movies, movie])} />
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <MovieList title="Watched Movies" movies={movies} />
          </section>
        </div>

        {/* Right Side: AI Recommendations */}
        <div className="space-y-6">
          <button 
            onClick={handleAI}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? "Thinking..." : "Get AI Recommendations"}
          </button>

          {recommendations.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest px-2">AI Picks For You</h3>
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-4 rounded-xl">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300">{rec.title} <span className="font-normal opacity-60">({rec.year})</span></h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 font-medium mb-2">{rec.genre}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{rec.reason}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}