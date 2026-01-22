import { UserProgress, PlayerStats, SubtopicProgress } from "@/types";
import { topics } from "@/data/topics";

const STORAGE_KEY = "math_journey_progress";
const STATS_KEY = "math_journey_stats";

// Calculate total subtopics across all topics
const TOTAL_SUBTOPICS = topics.reduce(
  (sum, topic) => sum + topic.subtopics.length,
  0,
);
const MAX_STARS = TOTAL_SUBTOPICS * 3; // 3 stars per subtopic = 90 stars

export function getProgress(): UserProgress[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveProgress(progress: UserProgress[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getPlayerStats(): PlayerStats {
  if (typeof window === "undefined") {
    return { level: 1, totalStars: 0, maxStars: MAX_STARS, streak: 0 };
  }
  const stored = localStorage.getItem(STATS_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        level: 1,
        totalStars: 0,
        maxStars: MAX_STARS,
        streak: 0,
      };
}

export function savePlayerStats(stats: PlayerStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function getTopicStars(
  topicId: string,
  progress: UserProgress[],
): number {
  const userProgress = progress.find((p) => p.topicId === topicId);
  if (!userProgress) return 0;

  // Sum up stars from all subtopics
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

export function updateSubtopicStars(
  topicId: string,
  subtopicName: string,
  stars: number,
): void {
  const progress = getProgress();
  const existingIndex = progress.findIndex((p) => p.topicId === topicId);

  if (existingIndex >= 0) {
    // Topic exists, update or add subtopic
    const existing = progress[existingIndex];
    const subtopicIndex = existing.subtopicProgress.findIndex(
      (sp) => sp.name === subtopicName,
    );

    if (subtopicIndex >= 0) {
      // Update existing subtopic
      existing.subtopicProgress[subtopicIndex].stars = stars;
    } else {
      // Add new subtopic
      existing.subtopicProgress.push({ name: subtopicName, stars });
    }

    existing.lastAccessed = new Date();
  } else {
    // Topic doesn't exist, create it
    progress.push({
      topicId,
      subtopicProgress: [{ name: subtopicName, stars }],
      lastAccessed: new Date(),
    });
  }

  saveProgress(progress);
  updatePlayerStats();
}

export function updatePlayerStats(): void {
  const progress = getProgress();

  // Calculate total stars
  const totalStars = progress.reduce((sum, p) => {
    return (
      sum + p.subtopicProgress.reduce((subSum, sp) => subSum + sp.stars, 0)
    );
  }, 0);

  const stats = getPlayerStats();
  stats.totalStars = totalStars;
  stats.maxStars = MAX_STARS;
  stats.level = calculateLevel(totalStars);
  savePlayerStats(stats);
}

export { MAX_STARS };
