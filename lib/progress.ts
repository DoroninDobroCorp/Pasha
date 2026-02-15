import { UserProgress, PlayerStats, SubtopicProgress } from "@/types";
import { topics } from "@/data/topics";

const STORAGE_KEY = "math_journey_progress";
const STATS_KEY = "math_journey_stats";
const STREAK_KEY = "math_journey_streak";

// Calculate total subtopics across all topics
const TOTAL_SUBTOPICS = topics.reduce(
  (sum, topic) => sum + topic.subtopics.length,
  0,
);
const MAX_STARS = TOTAL_SUBTOPICS * 3; // 3 stars per subtopic = 90 stars

interface SolvedProblem {
  id: string;
  question: string;
  subtopic: string;
  solvedAt: string; // ISO timestamp
}

interface StreakData {
  currentStreak: number;
  lastPracticeDate: string; // ISO date string
  problemsToday: number;
  dailyHistory: { [date: string]: number }; // date -> problems solved
  solvedProblems: { [date: string]: SolvedProblem[] }; // date -> list of solved problems
}

export async function getProgress(): Promise<UserProgress[]> {
  try {
    const response = await fetch('/pasha/api/progress/');
    return await response.json();
  } catch (error) {
    console.error('Failed to load progress:', error);
    return [];
  }
}

export async function saveProgress(progress: UserProgress[]): Promise<void> {
  try {
    await fetch('/pasha/api/progress/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress),
    });
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export async function getPlayerStats(): Promise<PlayerStats> {
  try {
    const [statsResponse, streakData] = await Promise.all([
      fetch('/pasha/api/stats/'),
      getStreakData()
    ]);
    const stats = await statsResponse.json();
    stats.streak = streakData.currentStreak;
    return stats;
  } catch (error) {
    console.error('Failed to load stats:', error);
    return { level: 1, totalStars: 0, maxStars: MAX_STARS, streak: 0 };
  }
}

export async function savePlayerStats(stats: PlayerStats): Promise<void> {
  try {
    await fetch('/pasha/api/stats/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    });
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
}

export function getTopicStars(
  topicId: string,
  progress: UserProgress[],
): number {
  const userProgress = progress.find((p) => p.topicId === topicId);
  if (!userProgress) return 0;

  return userProgress.subtopicProgress.reduce((sum, sp) => sum + sp.stars, 0);
}

export function getSubtopicStars(
  topicId: string,
  subtopicName: string,
  progress: UserProgress[],
): number {
  const userProgress = progress.find((p) => p.topicId === topicId);
  if (!userProgress) return 0;

  const subtopic = userProgress.subtopicProgress.find(
    (sp) => sp.name === subtopicName,
  );
  return subtopic ? subtopic.stars : 0;
}

// Calculate level based on total stars
// Level 1 (Beginner): 0-29, Level 2 (Advanced): 30-59, Level 3 (Master): 60-89, Level 4 (Hero): 90
export function calculateLevel(totalStars: number): number {
  if (totalStars >= 90) return 4; // Hero
  if (totalStars >= 60) return 3; // Master
  if (totalStars >= 30) return 2; // Advanced
  return 1; // Beginner
}

// Stars needed for next level
export function starsForNextLevel(
  currentLevel: number,
  currentStars: number,
): number {
  if (currentLevel === 1) return 30 - currentStars; // Beginner → Advanced
  if (currentLevel === 2) return 60 - currentStars; // Advanced → Master
  if (currentLevel === 3) return 90 - currentStars; // Master → Hero
  return 0; // Already Hero!
}

export async function updateSubtopicStars(
  topicId: string,
  subtopicName: string,
  stars: number,
): Promise<void> {
  const progress = await getProgress();
  const existingIndex = progress.findIndex((p) => p.topicId === topicId);

  if (existingIndex >= 0) {
    const existing = progress[existingIndex];
    const subtopicIndex = existing.subtopicProgress.findIndex(
      (sp) => sp.name === subtopicName,
    );

    if (subtopicIndex >= 0) {
      existing.subtopicProgress[subtopicIndex].stars = stars;
    } else {
      existing.subtopicProgress.push({ name: subtopicName, stars });
    }

    existing.lastAccessed = new Date();
  } else {
    progress.push({
      topicId,
      subtopicProgress: [{ name: subtopicName, stars }],
      lastAccessed: new Date(),
    });
  }

  await saveProgress(progress);
  await updatePlayerStats();
}

export async function updatePlayerStats(): Promise<void> {
  const progress = await getProgress();

  const totalStars = progress.reduce((sum, p) => {
    return (
      sum + p.subtopicProgress.reduce((subSum, sp) => subSum + sp.stars, 0)
    );
  }, 0);

  const stats = await getPlayerStats();
  stats.totalStars = totalStars;
  stats.maxStars = MAX_STARS;
  stats.level = calculateLevel(totalStars);
  await savePlayerStats(stats);
}

export async function getStreakData(): Promise<StreakData> {
  try {
    const response = await fetch('/pasha/api/streak/');
    const data = await response.json();
    if (!data.solvedProblems) {
      data.solvedProblems = {};
    }
    return data;
  } catch (error) {
    console.error('Failed to load streak data:', error);
    return {
      currentStreak: 0,
      lastPracticeDate: "",
      problemsToday: 0,
      dailyHistory: {},
      solvedProblems: {},
    };
  }
}

async function saveStreakData(data: StreakData): Promise<void> {
  try {
    await fetch('/pasha/api/streak/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to save streak data:', error);
  }
}

function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export interface MilestoneResult {
  achievementId: string | null;
}

const STREAK_MILESTONES = [21, 42, 100];

export async function recordProblemSolved(problemInfo?: { id: string; question: string; subtopic: string }): Promise<MilestoneResult> {
  const streakData = await getStreakData();
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  
  const previousStreak = streakData.currentStreak;
  
  if (streakData.lastPracticeDate !== today) {
    if (streakData.lastPracticeDate === yesterday) {
      streakData.currentStreak += 1;
    } else if (streakData.lastPracticeDate === "") {
      streakData.currentStreak = 1;
    } else {
      streakData.currentStreak = 1;
    }
    
    streakData.problemsToday = 1;
    streakData.lastPracticeDate = today;
  } else {
    streakData.problemsToday += 1;
  }
  
  streakData.dailyHistory[today] = streakData.problemsToday;
  
  if (problemInfo) {
    if (!streakData.solvedProblems[today]) {
      streakData.solvedProblems[today] = [];
    }
    streakData.solvedProblems[today].push({
      ...problemInfo,
      solvedAt: new Date().toISOString(),
    });
  }
  
  await saveStreakData(streakData);

  // Check for any streak milestone that qualifies but hasn't been unlocked yet
  let achievementId: string | null = null;
  try {
    const res = await fetch('/pasha/api/achievements/');
    const unlocked = await res.json();
    for (const target of STREAK_MILESTONES) {
      if (streakData.currentStreak >= target) {
        const id = `streak_${target}`;
        if (!unlocked.find((a: { id: string }) => a.id === id)) {
          achievementId = id;
          break;
        }
      }
    }
  } catch {
    // If check fails, still try to detect milestone from streak transition
    for (const target of STREAK_MILESTONES) {
      if (previousStreak < target && streakData.currentStreak >= target) {
        achievementId = `streak_${target}`;
        break;
      }
    }
  }

  if (achievementId) {
    // Unlock the achievement immediately so it's persisted even if the page doesn't load
    try {
      await fetch('/pasha/api/achievements/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievementId }),
      });
    } catch {
      // Page will retry unlock — not critical
    }
    return { achievementId };
  }

  return { achievementId: null };
}

export async function getProblemsToday(): Promise<number> {
  const streakData = await getStreakData();
  const today = getTodayDateString();
  
  if (streakData.lastPracticeDate === today) {
    return streakData.problemsToday;
  }
  return 0;
}

export async function getDailyHistory(): Promise<{ [date: string]: number }> {
  const streakData = await getStreakData();
  return streakData.dailyHistory;
}

export async function getSolvedProblemsForDate(date: string): Promise<SolvedProblem[]> {
  const streakData = await getStreakData();
  return streakData.solvedProblems[date] || [];
}

export async function resetStreak(): Promise<void> {
  try {
    await fetch('/pasha/api/reset/', { method: 'POST' });
  } catch (error) {
    console.error('Failed to reset data:', error);
  }
}

export { MAX_STARS };
