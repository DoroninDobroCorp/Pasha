"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPlayerStats, starsForNextLevel } from "@/lib/progress";
import { PlayerStats } from "@/types";
import { streakMilestones } from "@/data/achievements";
import Image from "next/image";
import HeroModal from "./HeroModal";
import StreakModal from "./StreakModal";
import AchievementsModal from "./AchievementsModal";

const LEVEL_NAMES = {
  1: "Beginner",
  2: "Advanced",
  3: "Master",
  4: "Hero",
};

const HERO_SKINS = {
  1: "/pasha/images/hero.jpg",
  2: "/pasha/images/hero2.jpg",
  3: "/pasha/images/hero3.jpg",
  4: "/pasha/images/hero4.jpg",
};

export default function PlayerHUD() {
  const router = useRouter();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  useEffect(() => {
    getPlayerStats().then(setStats);
  }, []);

  // Check for missed streak milestones on page load
  useEffect(() => {
    async function checkMissedMilestones() {
      try {
        const [achievementsRes, streakRes] = await Promise.all([
          fetch("/pasha/api/achievements/"),
          fetch("/pasha/api/streak/"),
        ]);
        const unlocked = await achievementsRes.json();
        const streakData = await streakRes.json();

        for (const milestone of streakMilestones) {
          if (
            streakData.currentStreak >= milestone.requiredStreak &&
            !unlocked.find((a: { id: string }) => a.id === milestone.achievementId)
          ) {
            // Unlock and redirect
            await fetch("/pasha/api/achievements/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ achievementId: milestone.achievementId }),
            });
            router.push(`/achievement/${milestone.achievementId}/`);
            return;
          }
        }
      } catch {
        // Silent fail — will retry on next page load
      }
    }
    checkMissedMilestones();
  }, [router]);

  if (!stats) return null;

  const starsNeeded = starsForNextLevel(stats.level, stats.totalStars);
  const levelName = LEVEL_NAMES[stats.level as keyof typeof LEVEL_NAMES] || "Beginner";
  const nextLevelName = LEVEL_NAMES[(stats.level + 1) as keyof typeof LEVEL_NAMES] || "Hero";
  const heroSkin = HERO_SKINS[stats.level as keyof typeof HERO_SKINS] || "/pasha/images/hero.jpg";

  return (
    <>
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {/* Player avatar - clickable */}
        <button
          onClick={() => setShowHeroModal(true)}
          className="flex items-center gap-3 bg-black/60 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg p-3 hover:border-cyan-400 hover:bg-black/70 transition-all cursor-pointer"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg">
            <Image src={heroSkin} alt="Hero" fill className="object-cover" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-lg">Math Knight</p>
            <p className="text-cyan-400 text-sm">
              Level {stats.level}: {levelName}
            </p>
          </div>
        </button>

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

        {/* Achievements Button */}
        <button
          onClick={() => setShowAchievementsModal(true)}
          className="bg-black/60 backdrop-blur-sm border-2 border-yellow-500/50 rounded-lg p-4 hover:border-yellow-400 hover:bg-black/70 transition-all cursor-pointer w-full"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-yellow-400 font-bold">Достижения</span>
          </div>
        </button>

        {/* Stats */}
        <button
          onClick={() => setShowStreakModal(true)}
          className="bg-black/60 backdrop-blur-sm border-2 border-orange-500/50 rounded-lg p-4 space-y-2 hover:border-orange-400 hover:bg-black/70 transition-all cursor-pointer w-full"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Streak</span>
            <span className="text-orange-400 font-bold">{stats.streak} 🔥</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Click for details</p>
        </button>
      </div>

      {showHeroModal && (
        <HeroModal currentLevel={stats.level} onClose={() => setShowHeroModal(false)} />
      )}

      {showStreakModal && (
        <StreakModal onClose={() => setShowStreakModal(false)} />
      )}

      {showAchievementsModal && (
        <AchievementsModal onClose={() => setShowAchievementsModal(false)} />
      )}
    </>
  );
}
