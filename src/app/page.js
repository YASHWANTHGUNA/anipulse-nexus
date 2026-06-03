// src/app/page.js
import { getTrendingAnime } from '../lib/anilist';

export default async function Home() {
  // 1. Fetching the data securely on the server!
  const trendingAnime = await getTrendingAnime();

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-slate-900 text-slate-200">
      <h1 className="text-4xl font-bold mb-8 text-white">AniPulse Nexus Gateway</h1>
      
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-400">
          Live Pipeline Test: Top 10 Trending Anime
        </h2>
        
        {/* 2. Fallback check (using the empty array from our try/catch block) */}
        {trendingAnime.length === 0 ? (
          <p className="text-red-400 bg-red-900/20 p-4 rounded-md border border-red-800">
            Pipeline offline. Failed to fetch data from AniList.
          </p>
        ) : (
          <ul className="space-y-4">
            {/* 3. Mapping over the GraphQL data array */}
            {trendingAnime.map((anime, index) => (
              <li key={anime.id} className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <span className="font-medium text-lg text-slate-100">
                  <span className="text-slate-500 mr-3">#{index + 1}</span> 
                  {anime.title.english || anime.title.romaji}
                </span>
                <span className="bg-slate-700 px-3 py-1 rounded-full text-sm font-bold text-emerald-300">
                  Score: {anime.averageScore}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}