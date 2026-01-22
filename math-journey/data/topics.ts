import { Topic } from "@/types";

// Island positions (center of each island) - Adjusted to match drawn background
const ISLANDS = {
  number_theory: { x: 400, y: 280 }, // Top-left island on background
  algebra: { x: 1100, y: 280 }, // Top-right island on background
  geometry: { x: 400, y: 720 }, // Bottom-left island on background
  combinatorics: { x: 1100, y: 720 }, // Bottom-right island on background
};

export const topics: Topic[] = [
  // NUMBER THEORY ISLAND (top-left) - 6 subtopics total
  {
    id: "nt-1",
    title: "Divisibility",
    category: "number_theory",
    description: "Learn divisibility and its properties",
    subtopics: [
      "Divisibility and its properties",
      "Divisibility tests for 3, 4, 8, 9, 11",
      "Euclidean division",
    ],
    position: { x: 280, y: 280 },
    xpReward: 100,
  },
  {
    id: "nt-2",
    title: "Primes & GCD/LCM",
    category: "number_theory",
    description: "Prime numbers and GCD/LCM",
    subtopics: [
      "Prime and composite numbers",
      "Fundamental theorem of arithmetic",
      "Greatest Common Divisor and Least Common Multiple",
    ],
    position: { x: 420, y: 280 },
    xpReward: 150,
  },

  // ALGEBRA ISLAND (top-right) - 10 subtopics total
  {
    id: "alg-1",
    title: "Basics",
    category: "algebra",
    description: "Percents and inequalities",
    subtopics: ["Percents", "Inequalities and operations with them"],
    position: { x: 980, y: 200 },
    xpReward: 100,
  },
  {
    id: "alg-2",
    title: "Equations",
    category: "algebra",
    description: "Exponents and equations",
    subtopics: [
      "Laws of exponents with integer exponents",
      "Linear equations and inequalities",
      "System of equations",
    ],
    position: { x: 1120, y: 240 },
    xpReward: 150,
  },
  {
    id: "alg-3",
    title: "Functions",
    category: "algebra",
    description: "Linear functions and graphs",
    subtopics: [
      "Properties of graphs of linear functions. Parallel and orthogonal lines",
    ],
    position: { x: 1200, y: 320 },
    xpReward: 100,
  },
  {
    id: "alg-4",
    title: "Advanced Topics",
    category: "algebra",
    description: "Absolute value, rationals, and word problems",
    subtopics: [
      "Absolute value and its properties. Triangle inequality",
      "Rational numbers. Infinite periodic decimals",
      'Average speed and "joint work" text problems',
      "Remarkable identities",
    ],
    position: { x: 1060, y: 380 },
    xpReward: 200,
  },

  // COMBINATORICS ISLAND (bottom-right) - 8 subtopics total
  {
    id: "comb-1",
    title: "Counting",
    category: "combinatorics",
    description: "Venn diagrams and counting rules",
    subtopics: ["Venn's diagram", "Rule of sum", "Rule of product"],
    position: { x: 980, y: 680 },
    xpReward: 100,
  },
  {
    id: "comb-2",
    title: "Arrangements",
    category: "combinatorics",
    description: "Permutations and arrangements",
    subtopics: ["Permutations", "Arrangement with repetition"],
    position: { x: 1120, y: 720 },
    xpReward: 100,
  },
  {
    id: "comb-3",
    title: "Probability",
    category: "combinatorics",
    description: "Probability and statistics",
    subtopics: [
      "Definition of probability",
      "Average, median, mode",
      "Quartiles",
    ],
    position: { x: 1200, y: 780 },
    xpReward: 150,
  },

  // GEOMETRY ISLAND (bottom-left) - 6 subtopics total
  {
    id: "geo-1",
    title: "Triangles",
    category: "geometry",
    description: "Congruent triangles and angles",
    subtopics: [
      "Congruent triangles. Criteria for congruence",
      "Angles between parallel lines and a transversal",
      "Sum of angles of a triangle, quadrilateral, pentagon, n-gon",
    ],
    position: { x: 280, y: 720 },
    xpReward: 150,
  },
  {
    id: "geo-2",
    title: "Special Triangles",
    category: "geometry",
    description: "Properties of isosceles triangles",
    subtopics: [
      "Properties of isosceles triangles. The median, altitude, and angle bisector drawn from the vertex opposite the base coincide.",
    ],
    position: { x: 420, y: 720 },
    xpReward: 100,
  },
  {
    id: "geo-3",
    title: "Areas & Circles",
    category: "geometry",
    description: "Calculate areas and work with circles",
    subtopics: [
      "Area of a rectangle, right triangle, disc, composite figures",
      "Circle, radius, diameter. Properties of radius orthogonal to diameter.",
    ],
    position: { x: 350, y: 800 },
    xpReward: 150,
  },
];

export const ISLAND_NAMES = {
  number_theory: "Number Theory",
  algebra: "Algebra",
  combinatorics: "Combinatorics",
  geometry: "Geometry",
};

export { ISLANDS };
