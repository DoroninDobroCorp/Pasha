"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { achievements, streakMilestones } from "@/data/achievements";

interface AchievementTexts {
  [key: string]: {
    emoji: string;
    funFact: string;
  };
}

const achievementTexts: AchievementTexts = {
  streak_21: {
    emoji: "🃏",
    funFact:
      "Знал ли ты, что блекджек (21) — одна из немногих карточных игр, в которых игроки стабильно обыгрывали казино? В 20-м веке математики доказали, что при правильном подсчёте карт можно получить положительное математическое ожидание. Казино были так напуганы, что пришлось менять правила игры! А ты только что доказал, что математика — твоё оружие. 21 день подряд — это не удача, это система.",
  },
  streak_42: {
    emoji: "🌌",
    funFact:
      'Суперкомпьютер «Думатель Глубин» считал 7,5 миллионов лет, чтобы найти ответ на главный вопрос жизни, вселенной и вообще всего. Ответ оказался — 42. Проблема в том, что никто так и не понял, какой был вопрос. Но мы-то знаем: «Сколько дней подряд нужно решать задачки, чтобы стать легендой?» — Ровно 42. Совпадение? Не думаем.',
  },
  streak_100: {
    emoji: "🏛️",
    funFact:
      "В Древнем Риме центурион — это командир сотни воинов. В математике — 10². В твоей жизни — 100 дней непрерывной практики. Это не просто число. Большинство людей не могут придерживаться привычки и 21 день. Ты сделал это почти в 5 раз дольше. Ты — настоящий Центурион Математики.",
  },
};

export default function AchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "granted" | "denied">("loading");
  const [isPreview, setIsPreview] = useState(false);

  const achievement = achievements.find((a) => a.id === id);
  const milestone = streakMilestones.find((m) => m.achievementId === id);
  const texts = achievementTexts[id];

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#ff0", "#f0f", "#0ff", "#ff4500", "#00ff00"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#ff0", "#f0f", "#0ff", "#ff4500", "#00ff00"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst at start
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff0", "#f0f", "#0ff", "#ff4500", "#00ff00", "#ffd700"],
    });
  }, []);

  useEffect(() => {
    if (!achievement || !milestone) {
      setStatus("denied");
      return;
    }

    const previewCode = searchParams.get("preview");
    if (previewCode === milestone.previewCode) {
      setIsPreview(true);
      setStatus("granted");
      return;
    }

    // Check if already unlocked or if streak qualifies
    async function checkAccess() {
      try {
        const [achievementsRes, streakRes] = await Promise.all([
          fetch("/pasha/api/achievements/"),
          fetch("/pasha/api/streak/"),
        ]);
        const unlockedList = await achievementsRes.json();
        const streakData = await streakRes.json();

        const alreadyUnlocked = unlockedList.find(
          (a: { id: string }) => a.id === id
        );

        if (alreadyUnlocked) {
          setStatus("granted");
          return;
        }

        if (streakData.currentStreak >= milestone!.requiredStreak) {
          // Unlock the achievement
          await fetch("/pasha/api/achievements/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ achievementId: id }),
          });
          setStatus("granted");
          return;
        }

        setStatus("denied");
      } catch {
        setStatus("denied");
      }
    }

    checkAccess();
  }, [id, achievement, milestone, searchParams]);

  useEffect(() => {
    if (status === "granted") {
      fireConfetti();
    }
  }, [status, fireConfetti]);

  if (!achievement || !milestone || !texts) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔒</p>
          <h1 className="text-2xl font-bold text-gray-400">Достижение не найдено</h1>
          <Link
            href="/pasha/"
            className="mt-6 inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
          >
            ← На главную
          </Link>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-gray-400 text-lg">Проверяем доступ...</p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🔒</p>
          <h1 className="text-2xl font-bold text-gray-300 mb-2">{achievement.title}</h1>
          <p className="text-gray-500 mb-2">Это достижение пока недоступно.</p>
          <p className="text-gray-600 text-sm mb-6">
            Необходим стрик: <span className="text-orange-400 font-bold">{milestone.requiredStreak} дней</span>
          </p>
          <Link
            href="/pasha/"
            className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
          >
            ← На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Preview badge */}
        {isPreview && (
          <div className="bg-yellow-900/40 border border-yellow-500/50 rounded-lg px-4 py-2 text-yellow-400 text-sm">
            👁️ Режим предпросмотра — достижение не разблокировано
          </div>
        )}

        {/* Achievement unlocked header */}
        <div className="space-y-2">
          <p className="text-yellow-400 text-lg font-semibold tracking-widest uppercase animate-pulse">
            ✨ Достижение получено! ✨
          </p>
          <h1 className="text-4xl font-bold text-white">
            {texts.emoji} {achievement.title}
          </h1>
        </div>

        {/* Achievement image */}
        <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-yellow-500 shadow-2xl shadow-yellow-500/30">
          <Image
            src={achievement.icon}
            alt={achievement.title}
            fill
            className="object-cover"
            sizes="256px"
            priority
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg">{achievement.description}</p>

        {/* Fun fact card */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-yellow-500/30 rounded-xl p-6 text-left">
          <div className="absolute -top-3 left-4 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Факт
          </div>
          <p className="text-gray-300 leading-relaxed mt-1">{texts.funFact}</p>
        </div>

        {/* Back button */}
        <Link
          href="/pasha/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25"
        >
          ← Вернуться к задачам
        </Link>
      </div>
    </div>
  );
}
