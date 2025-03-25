import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("WATCHLIST");
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/screendiary/add", { title, status }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Movie added successfully");
    } catch (error) {
      alert("Error adding movie");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="WATCHLIST">Watchlist</option>
        <option value="WATCHING">Watching</option>
        <option value="WATCHED">Watched</option>
      </select>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
