// src/components/FormatChart.js
"use client";
import { useState } from "react";

export default function FormatChart({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 1. Calculate how many items map to each media format
  const formatCounts = data.reduce((acc, item) => {
    acc[item.format] = (acc[item.format] || 0) + 1;
    return acc;
  }, {});

  const totalItems = data.length;

  // 2. Format data for rendering the visualization
  const chartData = Object.entries(formatCounts).map(([format, count]) => ({
    format,
    count,
    percentage: Math.round((count / totalItems) * 100),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Format Allocation Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive distribution breakdown of active snapshots.
        </p>
      </div>

      <div className="space-y-5">
        {chartData.map((item, index) => (
          <div 
            key={item.format}
            className="group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Label Row */}
            <div className="flex justify-between text-sm mb-1 px-1">
              <span className="font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                {item.format}
              </span>
              <span className="font-mono text-slate-400 text-xs">
                {item.count} {item.count === 1 ? "Title" : "Titles"} ({item.percentage}%)
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                style={{ 
                  width: `${item.percentage}%`,
                  opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Status Metric Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
        <p className="text-[11px] font-mono text-slate-500">
          {hoveredIndex !== null 
            ? `Inspecting sector: ${chartData[hoveredIndex].format}` 
            : "Hover rows to isolate structural data vectors"}
        </p>
      </div>
    </div>
  );
}