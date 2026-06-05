// src/app/admin/dashboard/page.js
import { getPrisma } from "../../../lib/prisma";
import FormatChart from "../../../components/FormatChart";

export const revalidate = 0;

export default async function AdminDashboard(props) {
  const prisma = getPrisma();
  const resolvedParams = await props.searchParams;
  const formatFilter = resolvedParams?.format;

  const currentPage = Number(resolvedParams?.page) || 1;
  const itemsPerPage = 10;
  const itemSkip = (currentPage - 1) * itemsPerPage;

  const snapshots = await prisma.animeSnapshot.findMany({
    where: formatFilter ? { format: formatFilter } : {},
    orderBy: { recordedAt: "desc" },
    take: itemsPerPage,
    skip: itemSkip,
  });

  // Data Aggregations
  const totalPopularity = snapshots.reduce(
    (sum, item) => sum + item.popularity,
    0,
  );

  const averageScore =
    snapshots.length > 0
      ? Math.round(
          snapshots.reduce((sum, item) => sum + item.score, 0) /
            snapshots.length,
        )
      : 0;

  const topContender =
    snapshots.length > 0
      ? [...snapshots].sort((a, b) => b.score - a.score)[0]
      : null;

  const lastUpdated = snapshots[0]?.recordedAt
    ? new Date(snapshots[0].recordedAt).toLocaleString("en-IN", {
        timeZone: "IST",
      })
    : "N/A";

  // SVG Chart Calculation Matrix
  const chartWidth = 500;
  const chartHeight = 120;
  const padding = 10;
  let svgPoints = "";
  let svgAreaPoints = "";

  if (snapshots.length > 1) {
    const minScore = 50;
    const maxScore = 100;
    const points = snapshots.map((anime, index) => {
      const x =
        (index / (snapshots.length - 1)) * (chartWidth - padding * 2) + padding;
      const y =
        chartHeight -
        ((anime.score - minScore) / (maxScore - minScore)) *
          (chartHeight - padding * 2) -
        padding;
      return { x, y };
    });
    svgPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
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
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Database Sync Window:{" "}
              <span className="text-cyan-400">{lastUpdated} IST</span>
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 self-start md:self-auto text-xs font-mono text-slate-400">
            System Node:{" "}
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
        </div>

        {/* Analytical KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Gross Engagement Pool
            </p>
            <h3 className="text-3xl font-mono font-bold text-cyan-400 mt-2">
              {totalPopularity.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Total popularity score of trending pool.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Quality Index
            </p>
            <h3 className="text-3xl font-mono font-bold text-emerald-400 mt-2">
              {averageScore}%
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Mean community score across active entries.
            </p>
          </div>

          {/* Upgraded Top Contender Card: Cinematic Dynamic Backdrop Asset */}
          <div className="relative bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl overflow-hidden group">
            {topContender?.coverImage && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.12] blur-sm scale-105 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${topContender.coverImage})` }}
              />
            )}
            <div className="relative z-10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Top Critical Performer
              </p>
              <h3 className="text-lg font-bold text-white mt-2 truncate group-hover:text-emerald-400 transition-colors duration-300">
                {topContender ? topContender.title : "N/A"}
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mt-1 font-mono">
                Peak Performance Score: {topContender ? topContender.score : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Visual Analytics Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Score Distribution Path
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing score variance across active filter parameters.
              </p>
            </div>

            <div className="w-full bg-slate-950/60 rounded-xl p-4 border border-slate-800/50 my-4">
              {snapshots.length < 2 ? (
                <div className="h-32 flex items-center justify-center text-sm text-slate-600 font-mono text-center px-4">
                  Insufficient data items found for category "{formatFilter}" to
                  map vector pathing curves.
                </div>
              ) : (
                <div className="relative w-full h-32">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity="0.00"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      points={svgAreaPoints}
                      fill="url(#chartGradient)"
                    />
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={svgPoints}
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1">
              <span>High Momentum</span>
              <span>Stable Curve</span>
              <span>Lower Momentum</span>
            </div>
          </div>

          <div>
            <FormatChart data={snapshots} />
          </div>
        </div>

        {/* Data Grid Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Latest Trending Snapshot
            </h2>

            <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <a
                href="/admin/dashboard"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${!formatFilter ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                All Formats
              </a>
              <a
                href="/admin/dashboard?format=TV"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${formatFilter === "TV" ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                TV Series
              </a>
              <a
                href="/admin/dashboard?format=ONA"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${formatFilter === "ONA" ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                ONA
              </a>
            </div>
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
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No matching metrics logged under format query "
                      {formatFilter}".
                    </td>
                  </tr>
                ) : (
                  snapshots.map((anime, index) => (
                    // Added 'group' trigger to table row for advanced element sync
                    <tr
                      key={anime.id}
                      className="group hover:bg-slate-800/40 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-bold text-emerald-400 group-hover:text-cyan-400 transition-colors font-mono">
                        #{itemSkip + index + 1}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-4">
                        {/* High-Fidelity Cover Art Layer with scaling mechanics */}
                        <div className="relative overflow-hidden rounded-md w-12 h-16 border border-slate-800 flex-shrink-0 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                          {anime.coverImage ? (
                            <img
                              src={anime.coverImage}
                              alt={anime.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                              No Img
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                          {anime.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 border border-slate-700/60 text-slate-300 px-2 py-1 rounded text-xs font-mono font-medium tracking-wide">
                          {anime.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-cyan-400 font-mono font-medium">
                        {anime.popularity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2.5 max-w-[4rem] overflow-hidden p-0.5">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${anime.score}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold font-mono text-slate-300 group-hover:text-emerald-400 transition-colors">
                            {anime.score}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Footer */}
          <div className="flex justify-between items-center mt-6 px-4 pb-6">
            <a
              href={`/admin/dashboard?page=${currentPage - 1}${formatFilter ? `&format=${formatFilter}` : ""}`}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${currentPage <= 1 ? "pointer-events-none opacity-30 border-slate-800 text-slate-600" : "border-slate-800 text-slate-300 hover:bg-slate-900"}`}
            >
              ← Previous Page
            </a>
            <span className="text-xs font-mono text-slate-500">
              Viewing Index Bracket: Page {currentPage}
            </span>
            <a
              href={`/admin/dashboard?page=${currentPage + 1}${formatFilter ? `&format=${formatFilter}` : ""}`}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border border-slate-800 text-slate-300 hover:bg-slate-900 transition-all ${snapshots.length < itemsPerPage ? "pointer-events-none opacity-30 border-slate-800 text-slate-600" : ""}`}
            >
              Next Page →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
