"use client";

import Image from "next/image";

interface HeroModalProps {
  currentLevel: number;
  onClose: () => void;
}

const HERO_SKINS = {
  1: "/pasha/images/hero.jpg",
  2: "/pasha/images/hero2.jpg",
  3: "/pasha/images/hero3.jpg",
  4: "/pasha/images/hero4.jpg",
};

const LEVEL_NAMES = {
  1: "Novice Explorer",
  2: "Skilled Adventurer",
  3: "Master Scholar",
  4: "Legendary Hero",
};

const LEVEL_REQUIREMENTS = {
  1: "0 stars",
  2: "23 stars",
  3: "46 stars",
  4: "69 stars",
};

export default function HeroModal({ currentLevel, onClose }: HeroModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#1a1e3f] to-[#0a0e27] border-4 border-purple-500/50 rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Hero Gallery</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((level) => {
            const isUnlocked = level <= currentLevel;
            const isCurrent = level === currentLevel;

            return (
              <div
                key={level}
                className={`relative rounded-xl overflow-hidden border-4 transition-all ${
                  isCurrent
                    ? "border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105"
                    : isUnlocked
                      ? "border-green-500/50"
                      : "border-gray-600/50"
                }`}
              >
                {/* Avatar Image */}
                <div className="relative w-full aspect-square">
                  {isUnlocked ? (
                    <Image
                      src={HERO_SKINS[level as keyof typeof HERO_SKINS]}
                      alt={`Hero Level ${level}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-6xl text-gray-600">?</span>
                    </div>
                  )}

                  {/* Current Badge */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      CURRENT
                    </div>
                  )}

                  {/* Locked Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔒</div>
                        <p className="text-white text-sm font-bold">Locked</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div
                  className={`p-3 ${
                    isUnlocked ? "bg-black/40" : "bg-black/60"
                  }`}
                >
                  <h3
                    className={`font-bold text-center mb-1 ${
                      isUnlocked ? "text-white" : "text-gray-400"
                    }`}
                  >
                    Level {level}
                  </h3>
                  <p
                    className={`text-xs text-center mb-2 ${
                      isUnlocked ? "text-cyan-300" : "text-gray-500"
                    }`}
                  >
                    {LEVEL_NAMES[level as keyof typeof LEVEL_NAMES]}
                  </p>
                  <p
                    className={`text-xs text-center ${
                      isUnlocked ? "text-green-400" : "text-gray-500"
                    }`}
                  >
                    {isUnlocked ? "✓ Unlocked" : `Requires ${LEVEL_REQUIREMENTS[level as keyof typeof LEVEL_REQUIREMENTS]}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-200 text-center">
            <strong>Tip:</strong> Unlock new hero skins by earning stars! Each
            level unlocks at 0, 23, 46, and 69 stars.
          </p>
        </div>
      </div>
    </div>
  );
}
