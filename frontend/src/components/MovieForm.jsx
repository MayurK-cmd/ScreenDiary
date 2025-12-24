import { useState } from "react";
import { api } from "../services/api";
import { Plus } from "lucide-react";

export default function MovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);

  async function submit() {
    if (!title) return;
    const token = localStorage.getItem("token");
    try {
      const res = await api.post("/movies/watched", { title, rating }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAdd(res.data.movie);
      setTitle("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding movie");
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <input
        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        placeholder="Movie title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-3">
        <input
          type="number"
          min="1"
          max="5"
          className="w-20 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button 
          onClick={submit}
          className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}