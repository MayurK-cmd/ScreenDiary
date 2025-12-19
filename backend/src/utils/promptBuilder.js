export function buildPrompt(watched) {
  return `
User watched these movies:
${watched
  .map(
    m => `${m.movies.title} (${m.movies.genres.join(", ")}) Rating: ${m.rating}`
  )
  .join("\n")}

Recommend 5 movies.
Return JSON only with title, year, genre, reason.
`;
}
