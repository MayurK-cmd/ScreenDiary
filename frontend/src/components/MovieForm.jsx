import { useState } from "react";

export default function MovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);

  async function submit() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    const res = await fetch("http://localhost:3000/movies/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, rating }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    onAdd(data.movie);
    setTitle("");
    setRating(5);
  }

  return (
    <div>
      <input
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <button onClick={submit}>Add Watched</button>
    </div>
  );
}
