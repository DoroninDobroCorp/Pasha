"use client";

import { useEffect, useState } from "react";
import { getPlayerStats, starsForNextLevel } from "@/lib/progress";
import { PlayerStats } from "@/types";
import Image from "next/image";

const LEVEL_NAMES = {
  1: "Beginner",
  2: "Advanced",
  3: "Master",
  4: "Hero",
};

// Hero skins based on level (changes at each third of progress)
const HERO_SKINS = {
  1: "/images/hero.jpg",
  2: "/images/hero2.jpg",
  3: "/images/hero3.jpg",
  4: "/images/hero4.jpg",
};

export default function PlayerHUD() {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    setStats(getPlayerStats());
  }, []);

  if (!stats) return null;

  const starsNeeded = starsForNextLevel(stats.level, stats.totalStars);
  const levelName =
    LEVEL_NAMES[stats.level as keyof typeof LEVEL_NAMES] || "Beginner";
  const nextLevelName =
    LEVEL_NAMES[(stats.level + 1) as keyof typeof LEVEL_NAMES] || "Hero";
  const heroSkin =
    HERO_SKINS[stats.level as keyof typeof HERO_SKINS] || "/images/hero.jpg";

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {/* Player avatar */}
      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg p-3">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg">
          <Image
            src={heroSkin}
            alt="Hero"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-bold text-lg">Math Knight</p>
          <p className="text-cyan-400 text-sm">
            Level {stats.level}: {levelName}
          </p>
        </div>
      </div>

      {/* Stars Progress */}
      <div className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-4 min-w-[250px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-400 font-bold text-sm">PROGRESS</span>
        </div>

        <div className="text-center mb-2">
          <span className="text-yellow-400 font-bold text-3xl">
            ⭐ {stats.totalStars}
          </span>
          <span className="text-gray-400 text-sm"> / {stats.maxStars}</span>
        </div>

        {stats.level < 4 && starsNeeded > 0 && (
          <p className="text-xs text-gray-300 text-center">
            {starsNeeded} stars until {nextLevelName}
          </p>
        )}
        {stats.level === 4 && (
          <p className="text-xs text-yellow-400 text-center font-bold">
            🎉 HERO STATUS ACHIEVED! 🎉
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="bg-black/60 backdrop-blur-sm border-2 border-yellow-500/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Streak</span>
          <span className="text-orange-400 font-bold">{stats.streak} 🔥</span>
        </div>
      </div>
    </div>
  );
}
