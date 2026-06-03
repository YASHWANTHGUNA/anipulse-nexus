
// src/app/admin/dashboard/page.js
import { prisma } from '../../../lib/prisma';

export const revalidate = 0;

export default async function AdminDashboard() {
  // 1. Securely fetch snapshots from your database
  const snapshots = await prisma.animeSnapshot.findMany({
    orderBy: {
      recordedAt: 'desc',
    },
    take: 10,
  });

  // 2. Data Aggregation Operations (Calculated on the Server)
  const totalPopularity = snapshots.reduce((sum, item) => sum + item.popularity, 0);
  
  const averageScore = snapshots.length > 0 
    ? Math.round(snapshots.reduce((sum, item) => sum + item.score, 0) / snapshots.length) 
    : 0;

  const topContender = snapshots.length > 0
    ? [...snapshots].sort((a, b) => b.score - a.score)[0]
    : null;

  // 3. Mathematical Coordinate Generation for the SVG Trend Chart
  const chartWidth = 500;
  const chartHeight = 120;
  const padding = 10;

  let svgPoints = '';
  let svgAreaPoints = '';

  if (snapshots.length > 1) {
    const minScore = 50; 
    const maxScore = 100;
    
    const points = snapshots.map((anime, index) => {
      const x = (index / (snapshots.length - 1)) * (chartWidth - padding * 2) + padding;
      const y = chartHeight - ((anime.score - minScore) / (maxScore - minScore)) * (chartHeight - padding * 2) - padding;
      return { x, y };
    });

    svgPoints = points.map(p => `${p.x},${p.y}`).join(' ');
    svgAreaPoints = `${points[0].x},${chartHeight} ${svgPoints} ${points[points.length - 1].x},${chartHeight}`;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              AniPulse Nexus Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Real-time viewership metrics and historical snapshots.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 self-start md:self-auto text-xs font-mono text-slate-400">
            System Node: <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
        </div>

        {/* Analytical KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Combined Engagement */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Engagement Pool</p>
            <h3 className="text-3xl font-mono font-bold text-cyan-400 mt-2">
              {totalPopularity.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-400 mt-2">Total popularity score of trending pool.</p>
          </div>

          {/* Card 2: Average Index Score */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Quality Index</p>
            <h3 className="text-3xl font-mono font-bold text-emerald-400 mt-2">
              {averageScore}%
            </h3>
            <p className="text-xs text-slate-400 mt-2">Mean community score across active entries.</p>
          </div>

          {/* Card 3: Top Performer */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Critical Performer</p>
            <h3 className="text-lg font-bold text-white mt-2 truncate">
              {topContender ? topContender.title : 'N/A'}
            </h3>
            <p className="text-xs text-emerald-400 font-medium mt-1">
              Peak Score: {topContender ? topContender.score : 0}%
            </p>
          </div>
        </div>

        {/* Data Chart Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Score Distribution Path</h2>
            <p className="text-xs text-slate-400 mt-1">Visualizing score variance across the top 10 trending items.</p>
          </div>
          
          <div className="w-full bg-slate-950/60 rounded-xl p-4 border border-slate-800/50">
            {snapshots.length < 2 ? (
              <div className="h-32 flex items-center justify-center text-sm text-slate-600">
                Insufficient historical data to plot variance graph.
              </div>
            ) : (
              <div className="relative w-full h-32">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.00"/>
                    </linearGradient>
                  </defs>
                  <polygon points={svgAreaPoints} fill="url(#chartGradient)" />
                  <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={svgPoints} />
                </svg>
              </div>
            )}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
            <span>High Momentum (#1)</span>
            <span>Stable Curve</span>
            <span>Lower Momentum (#10)</span>
          </div>
        </div>

        {/* Data Grid Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-white">Latest Trending Snapshot</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/50 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Popularity</th>
                  <th className="px-6 py-4">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {snapshots.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      No data found. Run the cron job to ingest data.
                    </td>
                  </tr>
                ) : (
                  snapshots.map((anime, index) => (
                    <tr key={anime.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-emerald-400">#{index + 1}</td>
                      <td className="px-6 py-4 flex items-center gap-4">
                        {anime.coverImage ? (
                          <img 
                            src={anime.coverImage} 
                            alt={anime.title} 
                            className="w-12 h-16 object-cover rounded-md shadow-sm border border-slate-700"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-slate-800 rounded-md border border-slate-700 flex items-center justify-center text-xs">No Img</div>
                        )}
                        <span className="font-medium text-slate-100 line-clamp-1">{anime.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 px-2 py-1 rounded text-xs font-medium tracking-wide">
                          {anime.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-cyan-300 font-mono">
                        {anime.popularity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-800 rounded-full h-2 max-w-[4rem]">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${anime.score}%` }}></div>
                          </div>
                          <span className="text-xs font-bold">{anime.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}