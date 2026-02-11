// Utility to load initial student progress into localStorage
import { initialStudentProgress, studentStats } from "./studentProgress";
import { saveProgress, savePlayerStats, calculateLevel, getProgress } from "./progress";
import { UserProgress, SubtopicProgress } from "@/types";

/**
 * Loads the predefined student progress into localStorage
 * This represents the student's current achievement level:
 * - Grade 5 → 3⭐ (fully completed)
 * - Grade 4 → 2⭐ (partial progress)
 * - Grade 3 → 1⭐ (minimal progress)
 * - Grade <3 → 0⭐ (not started)
 */
export async function loadStudentProgress(): Promise<void> {
  const userProgress: UserProgress[] = [];

  Object.entries(initialStudentProgress).forEach(([topicId, subtopics]) => {
    const subtopicProgress: SubtopicProgress[] = subtopics.map((sub) => ({
      name: sub.name,
      stars: sub.stars,
    }));

    if (subtopicProgress.some((sp) => sp.stars > 0)) {
      userProgress.push({
        topicId,
        subtopicProgress,
        lastAccessed: new Date(),
      });
    }
  });

  await saveProgress(userProgress);

  const totalStars = studentStats.totalStars;
  const level = calculateLevel(totalStars);

  await savePlayerStats({
    level,
    totalStars,
    maxStars: 90,
    streak: 0,
  });

  console.log("✅ Student progress loaded successfully!");
  console.log(`📊 Total Stars: ${totalStars}/90`);
  console.log(`🎯 Level: ${level}`);
  console.log(
    `📚 Completed Subtopics: ${studentStats.completedSubtopics}/${studentStats.totalSubtopics}`,
  );
}

/**
 * Checks if student progress has been loaded
 */
export async function isProgressLoaded(): Promise<boolean> {
  try {
    const progress = await getProgress();
    return progress.length > 0;
  } catch (error) {
    return false;
  }
}

export async function resetProgress(): Promise<void> {
  try {
    await fetch('/pasha/api/reset/', { method: 'POST' });
    console.log("🔄 Progress reset complete");
  } catch (error) {
    console.error('Failed to reset progress:', error);
  }
}

/**
 * Gets summary of student's current progress by topic
 */
export function getProgressSummary() {
  return {
    total: studentStats,
    byTopic: Object.entries(initialStudentProgress).map(
      ([topicId, subtopics]) => {
        const stars = subtopics.reduce((sum, sub) => sum + sub.stars, 0);
        const maxStars = subtopics.length * 3;
        const completed = subtopics.filter((s) => s.stars === 3).length;

        return {
          topicId,
          stars,
          maxStars,
          completed,
          total: subtopics.length,
          progress: Math.round((stars / maxStars) * 100),
        };
      },
    ),
  };
}
