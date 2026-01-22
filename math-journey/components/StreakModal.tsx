"use client";

import { getDailyHistory, getStreakData } from "@/lib/progress";
import { useEffect, useState } from "react";

interface StreakModalProps {
  onClose: () => void;
}

export default function StreakModal({ onClose }: StreakModalProps) {
  const [streakData, setStreakData] = useState<{
    currentStreak: number;
    problemsToday: number;
    dailyHistory: { [date: string]: number };
  } | null>(null);

  useEffect(() => {
    const data = getStreakData();
    setStreakData({
      currentStreak: data.currentStreak,
      problemsToday: data.problemsToday,
      dailyHistory: data.dailyHistory,
    });
  }, []);

  if (!streakData) return null;

  // Get last 30 days for calendar view
  const getLast30Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const problems = streakData.dailyHistory[dateString] || 0;
      
      days.push({
        date: dateString,
        dayOfMonth: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        problems,
        isToday: i === 0,
      });
    }
    
    return days;
  };

  const last30Days = getLast30Days();
  const totalProblems = Object.values(streakData.dailyHistory).reduce((sum, count) => sum + count, 0);
  const daysActive = Object.keys(streakData.dailyHistory).length;

  // Get intensity color based on problems solved
  const getIntensityColor = (problems: number) => {
    if (problems === 0) return "bg-gray-800/50";
    if (problems <= 2) return "bg-green-500/30";
    if (problems <= 5) return "bg-green-500/60";
    if (problems <= 10) return "bg-green-500/90";
    return "bg-green-400";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1e3f] to-[#0a0e27] border-4 border-orange-500/50 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Practice Statistics
          </h2>
          <p className="text-gray-400">Keep the streak alive! 🔥</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-black/40 border-2 border-orange-500/50 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-orange-400 mb-2">
              {streakData.currentStreak}
            </div>
            <div className="text-gray-300 text-sm">Day Streak 🔥</div>
          </div>
          
          <div className="bg-black/40 border-2 border-cyan-500/50 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-cyan-400 mb-2">
              {streakData.problemsToday}
            </div>
            <div className="text-gray-300 text-sm">Problems Today</div>
          </div>
          
          <div className="bg-black/40 border-2 border-purple-500/50 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-purple-400 mb-2">
              {totalProblems}
            </div>
            <div className="text-gray-300 text-sm">Total Problems</div>
          </div>
        </div>

        {/* Calendar - Last 30 Days */}
        <div className="bg-black/40 border-2 border-gray-600/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Last 30 Days Activity
          </h3>
          
          <div className="grid grid-cols-10 gap-2">
            {last30Days.map((day, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div
                  className={`
                    aspect-square rounded-lg border-2 transition-all
                    ${day.isToday ? "border-orange-400" : "border-gray-700"}
                    ${getIntensityColor(day.problems)}
                    hover:scale-110 cursor-pointer
                  `}
                  title={`${day.date}: ${day.problems} problems`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {day.dayOfMonth}
                    </span>
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {day.date}
                    <br />
                    {day.problems} problems
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-gray-800/50"></div>
              <div className="w-4 h-4 rounded bg-green-500/30"></div>
              <div className="w-4 h-4 rounded bg-green-500/60"></div>
              <div className="w-4 h-4 rounded bg-green-500/90"></div>
              <div className="w-4 h-4 rounded bg-green-400"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 text-center">
          {streakData.currentStreak === 0 && (
            <p className="text-gray-400">
              Start your streak today! Solve a problem to begin. 💪
            </p>
          )}
          {streakData.currentStreak > 0 && streakData.currentStreak < 7 && (
            <p className="text-cyan-400">
              Great start! Keep going to build your streak! 🚀
            </p>
          )}
          {streakData.currentStreak >= 7 && streakData.currentStreak < 30 && (
            <p className="text-orange-400">
              Amazing! You're on fire! 🔥 Don't break the streak!
            </p>
          )}
          {streakData.currentStreak >= 30 && (
            <p className="text-yellow-400">
              🏆 LEGENDARY STREAK! You're a true Math Knight! 🏆
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
