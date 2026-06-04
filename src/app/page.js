// src/app/page.js
import { getTrendingAnime } from '../lib/anilist';

export default async function Home() {
  // Fetch data on the server for the public health monitor
  const trendingAnime = await getTrendingAnime();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-between">
      
      {/* Hero / Gateway Section */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto w-full">
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase border border-emerald-500/20 mb-4 animate-pulse">
          Enterprise Node Active
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          AniPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexus</span> Portal
        </h1>
        
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          An automated serverless ETL architecture tracking real-time viewership vectors and multi-tenant telemetry streams.
        </p>

        {/* Call to Action Framework */}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <a 
            href="/admin/dashboard" 
            className="w-full block bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-center font-bold py-3 px-6 rounded-xl hover:opacity-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-4"
          >
            Access Analytics Workspace →
          </a>

          {/* Secure Guest Access Details */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-left">
            <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wide mb-2">
              🛡️ Public Review Credentials
            </p>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-slate-400">Username: <span className="text-cyan-400 font-bold">recruiter</span></p>
              <p className="text-slate-400">Password: <span className="text-emerald-400 font-bold">anipulse-guest</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Public Pipeline Monitor (Your original functionality restyled) */}
      <div className="bg-slate-900/40 border-t border-slate-900 p-6 md:p-8 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Live External API Pipeline Monitor
            </h3>
          </div>
          
          {trendingAnime.length === 0 ? (
            <p className="text-xs text-red-400 font-mono">Pipeline Offline: Connection to AniList layer failed.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 text-xs scrollbar-thin scrollbar-thumb-slate-800">
              {trendingAnime.slice(0, 5).map((anime, index) => (
                <div key={anime.id} className="bg-slate-950/50 border border-slate-800/40 rounded-lg px-3 py-2 min-w-[200px] flex-shrink-0">
                  <p className="text-slate-500 font-mono font-bold">#{index + 1}</p>
                  <p className="text-slate-200 font-medium truncate mb-1">{anime.title.english || anime.title.romaji}</p>
                  <p className="text-emerald-400 font-mono text-[10px]">Score: {anime.averageScore}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </main>
  );
}