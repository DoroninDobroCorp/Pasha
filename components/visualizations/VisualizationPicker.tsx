"use client";

import { useState } from "react";
import EuclideanTiling from "./EuclideanTiling";
import GearSync from "./GearSync";
import FibonacciGCD from "./FibonacciGCD";
import RhythmLCM from "./RhythmLCM";

type VisualizationType = "picker" | "euclid" | "gears" | "fibonacci" | "rhythm";

const VISUALIZATIONS = [
  {
    id: "euclid" as const,
    icon: "🟧",
    title: "Euclid's Rectangle Tiling",
    description: "Cut squares from a rectangle to discover GCD — a geometric proof of Euclid's algorithm",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/50",
    difficulty: "Interactive",
  },
  {
    id: "gears" as const,
    icon: "⚙️",
    title: "Gear Synchronization",
    description: "Watch two meshing gears rotate until marked teeth meet again — that's LCM!",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/50",
    difficulty: "Animated",
  },
  {
    id: "fibonacci" as const,
    icon: "🌀",
    title: "Fibonacci × GCD Theorem",
    description: "Discover the mind-blowing connection: GCD(Fₙ, Fₘ) = F_GCD(n,m)",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/50",
    difficulty: "Boss Level 🔥",
  },
  {
    id: "rhythm" as const,
    icon: "🥁",
    title: "Rhythm LCM",
    description: "Hear LCM with your ears! Two drums with different beats — when do they sync?",
    color: "from-red-500/20 to-yellow-500/20",
    border: "border-red-500/50",
    difficulty: "Audio 🔊",
  },
];

export default function VisualizationPicker({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<VisualizationType>("picker");

  if (view === "euclid") return <EuclideanTiling onBack={() => setView("picker")} />;
  if (view === "gears") return <GearSync onBack={() => setView("picker")} />;
  if (view === "fibonacci") return <FibonacciGCD onBack={() => setView("picker")} />;
  if (view === "rhythm") return <RhythmLCM onBack={() => setView("picker")} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm"
        >
          ← Back to Topic
        </button>
        <h3 className="text-xl font-bold text-white">🎨 Explore Visualizations</h3>
      </div>

      <p className="text-gray-300 text-sm">
        See GCD and LCM come alive! Pick a visualization to explore:
      </p>

      <div className="grid grid-cols-1 gap-3">
        {VISUALIZATIONS.map((viz) => (
          <button
            key={viz.id}
            onClick={() => setView(viz.id)}
            className={`text-left p-4 rounded-xl border-2 ${viz.border} bg-gradient-to-r ${viz.color} hover:scale-[1.02] transition-all duration-200 group`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{viz.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold group-hover:text-cyan-300 transition-colors">
                    {viz.title}
                  </h4>
                  <span className="px-2 py-0.5 bg-black/30 rounded-full text-xs text-gray-300">
                    {viz.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{viz.description}</p>
              </div>
              <span className="text-gray-500 group-hover:text-cyan-400 transition-colors text-xl">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
