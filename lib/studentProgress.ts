// Initial student progress based on current grades
// Grade mapping: 5→3⭐, 4→2⭐, 3→1⭐, <3→0⭐

export interface SubtopicProgress {
  name: string;
  stars: number; // 0, 1, 2, or 3
  grade: number; // Original grade
}

export const initialStudentProgress = {
  'nt-1': [
    { name: 'Divisibility and its properties', stars: 1, grade: 3 },
    { name: 'Divisibility tests for 3, 4, 8, 9, 11', stars: 3, grade: 5 },
    { name: 'Euclidean division', stars: 2, grade: 4 }
  ],
  'nt-2': [
    { name: 'Prime and composite numbers', stars: 2, grade: 4 },
    { name: 'Fundamental theorem of arithmetic', stars: 3, grade: 5 },
    { name: 'Greatest Common Divisor and Least Common Multiple', stars: 2, grade: 4 }
  ],
  'alg-1': [
    { name: 'Percents', stars: 3, grade: 5 },
    { name: 'Inequalities and operations with them', stars: 1, grade: 3 }
  ],
  'alg-2': [
    { name: 'Laws of exponents with integer exponents', stars: 3, grade: 5 },
    { name: 'Linear equations and inequalities', stars: 2, grade: 4 },
    { name: 'System of equations', stars: 2, grade: 4 }
  ],
  'alg-3': [
    { name: 'Properties of graphs of linear functions. Parallel and orthogonal lines', stars: 3, grade: 5 }
  ],
  'alg-4': [
    { name: 'Absolute value and its properties. Triangle inequality', stars: 1, grade: 3 },
    { name: 'Rational numbers. Infinite periodic decimals', stars: 3, grade: 5 },
    { name: 'Average speed and "joint work" text problems', stars: 2, grade: 4 },
    { name: 'Remarkable identities', stars: 2, grade: 4 }
  ],
  'comb-1': [
    { name: "Venn's diagram", stars: 1, grade: 3 },
    { name: 'Rule of sum', stars: 1, grade: 3 },
    { name: 'Rule of product', stars: 1, grade: 3 }
  ],
  'comb-2': [
    { name: 'Permutations', stars: 1, grade: 3 },
    { name: 'Arrangement with repetition', stars: 1, grade: 3 }
  ],
  'comb-3': [
    { name: 'Definition of probability', stars: 3, grade: 5 },
    { name: 'Average, median, mode', stars: 3, grade: 5 },
    { name: 'Quartiles', stars: 0, grade: 1 }
  ],
  'geo-1': [
    { name: 'Congruent triangles. Criteria for congruence', stars: 3, grade: 5 },
    { name: 'Angles between parallel lines and a transversal', stars: 3, grade: 5 },
    { name: 'Sum of angles of a triangle, quadrilateral, pentagon, n-gon', stars: 3, grade: 5 }
  ],
  'geo-2': [
    { name: 'Properties of isosceles triangles. The median, altitude, and angle bisector drawn from the vertex opposite the base coincide.', stars: 3, grade: 5 }
  ],
  'geo-3': [
    { name: 'Area of a rectangle, right triangle, disc, composite figures', stars: 1, grade: 3 },
    { name: 'Circle, radius, diameter. Properties of radius orthogonal to diameter.', stars: 2, grade: 4 }
  ]
};

// Calculate total stars for student
export function calculateStudentStars(): number {
  let total = 0;
  Object.values(initialStudentProgress).forEach(subtopics => {
    subtopics.forEach(sub => {
      total += sub.stars;
    });
  });
  return total;
}

// Get completed subtopics (3 stars = completed)
export function getCompletedSubtopics(topicId: string): string[] {
  const progress = initialStudentProgress[topicId as keyof typeof initialStudentProgress];
  if (!progress) return [];

  return progress
    .filter(sub => sub.stars === 3)
    .map(sub => sub.name);
}

// Summary stats
export const studentStats = {
  totalStars: calculateStudentStars(), // Should be 61
  maxStars: 90, // 30 subtopics × 3 stars each
  completedSubtopics: Object.values(initialStudentProgress).flat().filter(s => s.stars === 3).length,
  totalSubtopics: 30,
  breakdown: {
    numberTheory: Object.values(initialStudentProgress).slice(0, 2).flat().reduce((sum, s) => sum + s.stars, 0), // 13⭐
    algebra: Object.values(initialStudentProgress).slice(2, 6).flat().reduce((sum, s) => sum + s.stars, 0), // 22⭐
    combinatorics: Object.values(initialStudentProgress).slice(6, 9).flat().reduce((sum, s) => sum + s.stars, 0), // 11⭐
    geometry: Object.values(initialStudentProgress).slice(9, 12).flat().reduce((sum, s) => sum + s.stars, 0) // 15⭐
  }
};
