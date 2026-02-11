export type Category =
  | "number_theory"
  | "algebra"
  | "combinatorics"
  | "geometry";

export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  subtopics: string[];
  position: { x: number; y: number };
  xpReward: number;
}

export interface SubtopicProgress {
  name: string;
  stars: number; // 0, 1, 2, or 3 stars earned for this subtopic
}

export interface UserProgress {
  topicId: string;
  subtopicProgress: SubtopicProgress[]; // Track star count per subtopic
  lastAccessed: Date;
}

export interface PlayerStats {
  level: number; // 1-4: Beginner (0-29⭐), Advanced (30-59⭐), Master (60-89⭐), Hero (90⭐)
  totalStars: number;
  maxStars: number;
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO date string when unlocked
}
