// Index file for all problems
// Total: 360 problems (30 subtopics × 12 problems each)

export { Problem, numberTheoryProblems, divisibilityProblems } from "./number_theory";
export { algebraProblems, percentProblems } from "./algebra";
export { combinatoricsProblems, vennProblems, probabilityProblems } from "./combinatorics";
export { geometryProblems, congruenceProblems, areaProblems, circleProblems } from "./geometry";

import { numberTheoryProblems } from "./number_theory";
import { algebraProblems } from "./algebra";
import { combinatoricsProblems } from "./combinatorics";
import { geometryProblems } from "./geometry";

// All problems combined
export const allProblems = [
  ...numberTheoryProblems,
  ...algebraProblems,
  ...combinatoricsProblems,
  ...geometryProblems,
];

// Get problems by subtopic
export function getProblemsBySubtopic(subtopic: string) {
  return allProblems.filter(p => p.subtopic === subtopic);
}

// Get problems by difficulty
export function getProblemsByDifficulty(difficulty: 1 | 2 | 3) {
  return allProblems.filter(p => p.difficulty === difficulty);
}

// Get random problems for a subtopic
export function getRandomProblems(subtopic: string, count: number = 3) {
  const problems = getProblemsBySubtopic(subtopic);
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get problems for star levels
// 1 star = easy problems, 2 stars = medium, 3 stars = hard
export function getProblemsForStarLevel(subtopic: string, starLevel: 1 | 2 | 3) {
  return allProblems.filter(p => p.subtopic === subtopic && p.difficulty === starLevel);
}

// Statistics
export const problemStats = {
  total: allProblems.length,
  byCategory: {
    numberTheory: numberTheoryProblems.length,
    algebra: algebraProblems.length,
    combinatorics: combinatoricsProblems.length,
    geometry: geometryProblems.length,
  },
  byDifficulty: {
    easy: allProblems.filter(p => p.difficulty === 1).length,
    medium: allProblems.filter(p => p.difficulty === 2).length,
    hard: allProblems.filter(p => p.difficulty === 3).length,
  },
};
