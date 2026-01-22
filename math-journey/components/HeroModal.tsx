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
                  
                  {/* Star Requirements - More Prominent */}
                  {isUnlocked ? (
                    <div className="flex items-center justify-center gap-1 bg-green-500/20 border border-green-500/40 rounded-md py-1">
                      <span className="text-green-400 font-bold text-sm">✓ Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 bg-yellow-500/10 border border-yellow-500/30 rounded-md py-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span className="text-yellow-300 font-bold text-lg">
                          {LEVEL_REQUIREMENTS[level as keyof typeof LEVEL_REQUIREMENTS].replace(' stars', '')}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">stars needed</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-purple-200 text-center mb-2">
            <strong>Hero Unlock Requirements:</strong>
          </p>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
              <div className="text-cyan-400 font-bold mb-1">Level 1</div>
              <div className="text-yellow-300 font-bold text-base">⭐ 0</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
              <div className="text-purple-400 font-bold mb-1">Level 2</div>
              <div className="text-yellow-300 font-bold text-base">⭐ 23</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
              <div className="text-orange-400 font-bold mb-1">Level 3</div>
              <div className="text-yellow-300 font-bold text-base">⭐ 46</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
              <div className="text-red-400 font-bold mb-1">Level 4</div>
              <div className="text-yellow-300 font-bold text-base">⭐ 69</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
