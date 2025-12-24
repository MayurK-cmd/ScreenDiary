import { Star, Film } from "lucide-react";

export default function MovieList({ title, movies }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          {title}
        </h3>
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2.5 py-1 rounded-full">
          {movies.length}
        </span>
      </div>

      {movies.length === 0 ? (
        <div className="py-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
          <Film className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No movies logged yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {movies.map((m, i) => (
            <li 
              key={i} 
              className="group flex items-center justify-between py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-xl transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {m.movies?.title || m.title}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date().toLocaleDateString()} {/* You can replace with actual date if stored */}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-lg border border-amber-100 dark:border-amber-800/50">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-500">
                  {m.rating ?? "—"}
                </span>
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}