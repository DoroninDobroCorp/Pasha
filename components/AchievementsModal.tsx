"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Achievement } from "@/types";
import { achievements, streakMilestones } from "@/data/achievements";

interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
}

interface AchievementsModalProps {
  onClose: () => void;
}

export default function AchievementsModal({ onClose }: AchievementsModalProps) {
  const router = useRouter();
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<(Achievement & { unlockedAt?: string }) | null>(null);

  const isStreakAchievement = (id: string) => streakMilestones.some(m => m.achievementId === id);

  const handleAchievementClick = (achievement: Achievement & { unlockedAt?: string }) => {
    if (!achievement.unlockedAt) return;
    if (isStreakAchievement(achievement.id)) {
      router.push(`/pasha/achievement/${achievement.id}/`);
    } else {
      setSelectedAchievement(achievement);
    }
  };

  useEffect(() => {
    fetch('/pasha/api/achievements/')
      .then(res => res.json())
      .then(data => {
        setUnlockedAchievements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getAchievementWithStatus = () => {
    return achievements.map(achievement => {
      const unlocked = unlockedAchievements.find(u => u.id === achievement.id);
      return {
        ...achievement,
        unlockedAt: unlocked?.unlockedAt,
      };
    });
  };

  const achievementsWithStatus = getAchievementWithStatus();
  const unlockedCount = achievementsWithStatus.filter(a => a.unlockedAt).length;

  // Full-screen image viewer
  if (selectedAchievement) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={() => setSelectedAchievement(null)}
      >
        <div className="relative max-w-3xl w-full mx-4 text-center">
          {/* Close hint */}
          <p className="text-gray-400 mb-4 text-sm">Нажмите куда угодно чтобы закрыть</p>
          
          {/* Large achievement image */}
          <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden border-4 border-yellow-500 shadow-2xl shadow-yellow-500/30">
            <Image
              src={selectedAchievement.icon}
              alt={selectedAchievement.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
          
          {/* Achievement info */}
          <div className="mt-6 space-y-2">
            <h2 className="text-3xl font-bold text-yellow-400">{selectedAchievement.title}</h2>
            <p className="text-lg text-gray-300">{selectedAchievement.description}</p>
            {selectedAchievement.unlockedAt && (
              <p className="text-yellow-400 text-sm">
                ✨ Получено {new Date(selectedAchievement.unlockedAt).toLocaleDateString('ru-RU')}
              </p>
            )}
          </div>
          
          {/* Decorative sparkles */}
          <div className="absolute top-10 left-10 text-4xl animate-pulse">✨</div>
          <div className="absolute top-20 right-20 text-3xl animate-pulse delay-100">⭐</div>
          <div className="absolute bottom-40 left-20 text-3xl animate-pulse delay-200">🌟</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-pulse delay-300">✨</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-gray-800 border-2 border-yellow-500/50 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">🏆 Достижения</h2>
            <p className="text-gray-400 text-sm">
              {unlockedCount} из {achievements.length} получено
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Achievements List */}
        {loading ? (
          <div className="text-center py-8 text-gray-400">Загрузка...</div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {achievementsWithStatus.map(achievement => {
              const isUnlocked = !!achievement.unlockedAt;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    isUnlocked
                      ? 'bg-yellow-900/20 border-yellow-500/50'
                      : 'bg-gray-800/50 border-gray-600/30 opacity-50 grayscale'
                  }`}
                >
                  {/* Clickable image */}
                  <button
                    onClick={() => handleAchievementClick(achievement)}
                    disabled={!isUnlocked}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 border-yellow-400/50 flex-shrink-0 transition-transform ${
                      isUnlocked ? 'hover:scale-110 hover:border-yellow-400 cursor-pointer' : 'cursor-not-allowed'
                    }`}
                    title={isUnlocked ? "Нажми чтобы увеличить 🔍" : ""}
                  >
                    <Image
                      src={achievement.icon}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-xl">🔍</span>
                      </div>
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-yellow-400 mt-1">
                        ✨ Получено {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Hint */}
        <p className="text-xs text-gray-500 text-center mt-4">
          💡 Нажми на картинку чтобы рассмотреть достижение
        </p>
      </div>
    </div>
  );
}
