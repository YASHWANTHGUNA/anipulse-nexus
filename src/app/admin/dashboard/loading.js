// src/app/admin/dashboard/loading.js
export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10 text-slate-400 font-sans flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Glowing Radar Scanner Loop */}
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
        <p className="font-mono text-xs tracking-widest text-slate-500 uppercase animate-pulse">
          Querying Core Database Cluster...
        </p>
      </div>
    </main>
  );
}