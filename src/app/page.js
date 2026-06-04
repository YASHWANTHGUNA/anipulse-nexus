// src/app/page.js
import { getTrendingAnime } from '../lib/anilist';

export default async function Home() {
  // Fetch live API tracking rows securely on the server
  const trendingAnime = await getTrendingAnime();
  
  // Extract the top 5 items for our high-impact mosaic grid wall
  const showcaseItems = trendingAnime.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Immersive Background Ambient Neon Radials */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Grid Framework */}
      <div className="flex-grow flex items-center max-w-7xl w-full mx-auto p-6 md:p-12 z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* LEFT PANEL (5 Columns): Pristine Workspace Credentials Gate */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase border border-emerald-500/20 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              Production Registry Active
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-none">
              AniPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexus</span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              An automated full-stack Business Intelligence system tracking real-time viewership vectors and timeline telemetry streams.
            </p>

            {/* Access Controller Terminal */}
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
              <a 
                href="/admin/dashboard" 
                className="w-full block bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-center font-bold py-3.5 px-6 rounded-xl hover:opacity-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] mb-4 tracking-wide text-sm"
              >
                Access Analytics Workspace →
              </a>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <span>🛡️</span> Security Gateway Keypairs
                </p>
                <div className="space-y-1.5 text-xs font-mono">
                  <p className="text-slate-400">Username: <span className="text-cyan-400 font-bold">recruiter</span></p>
                  <p className="text-slate-400">Password: <span className="text-emerald-400 font-bold">anipulse-guest</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (7 Columns): Enterprise Asymmetric Media Collage Wall */}
          <div className="lg:col-span-7 relative w-full h-[520px] hidden md:flex items-center justify-center">
            {showcaseItems.length >= 3 ? (
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 w-full h-full p-4">
                
                {/* 1. THE CROWN LEADER: Dynamic Massive Feature Poster */}
                <div className="col-span-6 row-span-10 relative group bg-slate-900 border border-slate-700/40 p-2.5 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.03] hover:border-emerald-500/30 z-20">
                  <span className="absolute top-5 right-5 z-30 bg-emerald-500 text-slate-950 text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full shadow-lg tracking-wider">
                    POOL LEADER
                  </span>
                  <div className="w-full h-full overflow-hidden rounded-2xl border border-slate-950">
                    <img 
                      src={showcaseItems[0].coverImage?.large || showcaseItems[0].coverImage} 
                      alt="Leader Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* 2. THE CHASER: Upper Right High-Impact Panel */}
                <div className="col-span-6 row-span-5 relative group bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border-cyan-500/30 z-10">
                  <span className="absolute top-4 left-4 z-30 bg-cyan-500 text-slate-950 text-[8px] font-mono font-extrabold px-2 py-0.5 rounded-full shadow-md">
                    RANK #2
                  </span>
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={showcaseItems[1].coverImage?.large || showcaseItems[1].coverImage} 
                      alt="Rank 2 Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* 3. THE FLANK: Lower Right Medium Panel */}
                <div className="col-span-3 row-span-5 relative group bg-slate-900 border border-slate-800 p-1.5 rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.03] hover:border-slate-700 z-10">
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <img 
                      src={showcaseItems[2]?.coverImage?.large || showcaseItems[2]?.coverImage || showcaseItems[0].coverImage} 
                      alt="Rank 3 Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* 4. THE LOWER ANCHOR: Bottom Left Wide Anchor */}
                <div className="col-span-3 row-span-5 relative group bg-slate-900 border border-slate-800 p-1.5 rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.03] hover:border-slate-700 z-10">
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <img 
                      src={showcaseItems[3]?.coverImage?.large || showcaseItems[3]?.coverImage || showcaseItems[1].coverImage} 
                      alt="Rank 4 Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* 5. THE SUB-SATELLITE: Bottom Extended Horizon Accent */}
                <div className="col-span-6 row-span-2 relative group bg-slate-900 border border-slate-800 p-1.5 rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:scale-[1.02] z-0 opacity-60 hover:opacity-100">
                  <div className="w-full h-full overflow-hidden rounded-lg relative">
                    <div className="absolute inset-0 bg-slate-950/40 z-10" />
                    <img 
                      src={showcaseItems[4]?.coverImage?.large || showcaseItems[4]?.coverImage || showcaseItems[0].coverImage} 
                      alt="Rank 5 Visual"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

              </div>
            ) : (
              <div className="w-64 h-80 border border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-xs font-mono text-slate-600">
                Populating Media Wall...
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Persistent Live Telemetry Network Ticker */}
      <div className="bg-slate-900/20 border-t border-slate-900/60 backdrop-blur-sm p-6 w-full z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              Live Ingestion Stream Monitor
            </span>
          </div>
          <div className="flex gap-6 text-[11px] font-mono text-slate-400 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {trendingAnime.slice(0, 4).map((anime, i) => (
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