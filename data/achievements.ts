import { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "modules_master",
    title: "Покоритель модулей",
    description: "Успешно изучил тему модулей и абсолютных значений. Настоящий математический герой!",
    icon: "/pasha/images/achievements/modules_master.png",
  },
  {
    id: "streak_21",
    title: "Блекджек",
    description: "21 день подряд решал задачи. Это не удача — это система!",
    icon: "/pasha/images/achievements/streak_21.png",
  },
  {
    id: "streak_42",
    title: "Ответ на Главный Вопрос",
    description: "42 дня подряд. Ты нашёл ответ на главный вопрос жизни, вселенной и всего такого.",
    icon: "/pasha/images/achievements/streak_42.png",
  },
  {
    id: "streak_100",
    title: "Центурион",
    description: "100 дней непрерывной практики. Ты — командир сотни решённых дней!",
    icon: "/pasha/images/achievements/streak_100.png",
  },
];

export interface StreakMilestone {
  achievementId: string;
  requiredStreak: number;
  previewCode: string;
}

export const streakMilestones: StreakMilestone[] = [
  { achievementId: "streak_21", requiredStreak: 21, previewCode: "blackjack21" },
  { achievementId: "streak_42", requiredStreak: 42, previewCode: "answer42" },
  { achievementId: "streak_100", requiredStreak: 100, previewCode: "centurion100" },
];
