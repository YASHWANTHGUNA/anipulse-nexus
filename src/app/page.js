// src/app/page.js
import { getTrendingAnime } from '../lib/anilist';

export default async function Home() {
  // Fetch live API tracking rows securely on the server
  const trendingAnime = await getTrendingAnime();
  
  // Safely extract the top 3 items to feature inside our visual presentation panel
  const heroItems = trendingAnime.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Structural Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Split Layout Grid */}
      <div className="flex-grow flex items-center max-w-7xl w-full mx-auto p-6 md:p-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT HALF (6 Columns): Crisp Content & Credentials Terminal */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase border border-emerald-500/20 mb-6">
              Production Registry Online
            </span>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-none">
              AniPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexus</span>
            </h1>
            
            <p className="text-slate-400 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              An automated full-stack Business Intelligence system tracking real-time viewership vectors and timeline telemetry streams.
            </p>

            {/* Access Terminal Block */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <a 
                href="/admin/dashboard" 
                className="w-full block bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-center font-bold py-3 px-6 rounded-xl hover:opacity-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] mb-4 font-semibold tracking-wide"
              >
                Access Analytics Workspace →
              </a>

              <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  🛡️ Public Access Key matrix
                </p>
                <div className="space-y-1 text-xs font-mono">
                  <p className="text-slate-400">Username: <span className="text-cyan-400 font-bold">recruiter</span></p>
                  <p className="text-slate-400">Password: <span className="text-emerald-400 font-bold">anipulse-guest</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT HALF (6 Columns): High-Impact Overlapping Visual Showcase Wall */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-[400px] mt-8 lg:mt-0">
            {heroItems.length >= 2 ? (
              <div className="relative w-full max-w-md h-full flex items-center justify-center">
                
                {/* Back Dropdown Poster #1 (Left Underlayer) */}
                <div className="absolute left-4 transform -rotate-6 scale-90 opacity-40 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl w-44 transition-all duration-500 hover:opacity-80 hover:rotate-0 hover:z-30">
                  <img 
                    src={heroItems[1].coverImage?.large || heroItems[1].coverImage} 
                    alt="Showcase Vector 1"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                </div>

                {/* Back Dropdown Poster #2 (Right Underlayer) */}
                <div className="absolute right-4 transform rotate-6 scale-90 opacity-40 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl w-44 transition-all duration-500 hover:opacity-80 hover:rotate-0 hover:z-30">
                  <img 
                    src={heroItems[2]?.coverImage?.large || heroItems[2]?.coverImage || heroItems[0].coverImage?.large} 
                    alt="Showcase Vector 2"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                </div>

                {/* Primary Spotlight Poster (Absolute Center Anchor) */}
                <div className="absolute z-20 bg-slate-900/90 border border-slate-700/50 p-3 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] w-52 transition-all duration-300 hover:scale-105 hover:border-emerald-500/40">
                  <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[9px] font-mono font-black px-2 py-0.5 rounded-full shadow-md tracking-wider">
                    POOL LEADER
                  </div>
                  <img 
                    src={heroItems[0].coverImage?.large || heroItems[0].coverImage} 
                    alt="Showcase Core"
                    className="w-full h-64 object-cover rounded-xl border border-slate-800"
                  />
                  <p className="mt-3 text-xs font-bold text-slate-300 truncate text-center font-mono tracking-wide">
                    {heroItems[0].title?.english || heroItems[0].title?.romaji}
                  </p>
                </div>

              </div>
            ) : (
              <div className="w-64 h-80 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-xs font-mono text-slate-600">
                Populating Media Matrix...
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer Network Status Bar */}
      <div className="bg-slate-900/30 border-t border-slate-900 p-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              Live Ingestion Stream Monitor
            </span>
          </div>
          <div className="flex gap-6 text-[11px] font-mono text-slate-400 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {trendingAnime.slice(0, 3).map((anime, i) => (
              <span key={anime.id} className="whitespace-nowrap">
                <span className="text-slate-600 font-bold">0{i+1}.</span> {anime.title?.english || anime.title?.romaji} ({anime.averageScore || anime.score}%)
              </span>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}