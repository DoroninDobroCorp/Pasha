"use client";

import { useState, useEffect } from "react";
import {
  resetProgress,
  isProgressLoaded,
  getProgressSummary,
} from "@/lib/loadStudentProgress";

export default function ProgressLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [summary, setSummary] = useState<ReturnType<
    typeof getProgressSummary
  > | null>(null);

  useEffect(() => {
    const checkProgress = async () => {
      const loaded = await isProgressLoaded();
      setIsLoaded(loaded);
      if (loaded) {
        setSummary(getProgressSummary());
      }
    };
    checkProgress();
  }, []);

  const handleReset = async () => {
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone.",
      )
    ) {
      await resetProgress();
      setIsLoaded(false);
      setSummary(null);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Toggle button - bottom left corner */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition-all"
        title="Student Progress Manager (Auto-loaded)"
      >
        📊 ✓
      </button>

      {/* Control Panel */}
      {showPanel && (
        <div className="fixed bottom-20 left-4 z-50 bg-gradient-to-br from-[#1a1e3f] to-[#0a0e27] border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">
            Student Progress (Auto-saved)
          </h3>

          <div className="mb-4 p-3 bg-black/40 rounded-lg">
            <p className="text-sm text-green-400 font-bold">
              ✓ Student progress auto-loaded and saved permanently
            </p>
            {summary && (
              <div className="mt-2 text-sm text-gray-300">
                <p>⭐ Stars: {summary.total.totalStars}/90</p>
                <p>📚 Completed: {summary.total.completedSubtopics}/30</p>
                <div className="mt-2 text-xs">
                  <p>
                    🔷 Number Theory: {summary.total.breakdown.numberTheory}⭐
                  </p>
                  <p>🟣 Algebra: {summary.total.breakdown.algebra}⭐</p>
                  <p>
                    🟡 Combinatorics: {summary.total.breakdown.combinatorics}⭐
                  </p>
                  <p>🟢 Geometry: {summary.total.breakdown.geometry}⭐</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleReset}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            >
              Reset All Progress
            </button>

            <button
              onClick={() => setShowPanel(false)}
              className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-300">
              <strong>✓ Auto-saved:</strong> Progress persists between sessions
              automatically.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
