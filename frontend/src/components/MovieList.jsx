export default function MovieList({ title, movies }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {movies.map((m, i) => (
          <li key={i}>
            {m.movies?.title || m.title} ⭐ {m.rating ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
