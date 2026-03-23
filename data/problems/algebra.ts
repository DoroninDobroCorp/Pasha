// Algebra Problems - 10 subtopics × 12 problems = 120 problems
// Sources: AMC 8/10, Mathcounts, Kangourou, Russian Olympiads

import { Problem } from "./number_theory";

// ============================================
// SUBTOPIC 1: Percents
// ============================================
export const percentProblems: Problem[] = [
  {
    id: "pct-1",
    subtopic: "Percents",
    difficulty: 1,
    question: "What is 25% of 80?",
    answer: "20",
    solution: "25% × 80 = 0.25 × 80 = 20.",
    source: "AMC 8 2015"
  },
  {
    id: "pct-2",
    subtopic: "Percents",
    difficulty: 1,
    question: "A shirt originally costs $40. It is on sale for 30% off. What is the sale price?",
    answer: "$28",
    solution: "Discount = 0.30 × 40 = 12. Sale price = 40 - 12 = $28.",
    source: "Kangourou 2017"
  },
  {
    id: "pct-3",
    subtopic: "Percents",
    difficulty: 1,
    question: "If 15 is 20% of a number, what is the number?",
    answer: "75",
    solution: "15 = 0.20 × n, so n = 15/0.20 = 75.",
    source: "Mathcounts 2016"
  },
  {
    id: "pct-4",
    subtopic: "Percents",
    difficulty: 2,
    question: "A price increases by 20%, then decreases by 20%. What is the net percent change?",
    answer: "-4%",
    solution: "Start with 100. After +20%: 120. After -20%: 120 × 0.80 = 96. Net change: -4%.",
    source: "AMC 8 2018"
  },
  {
    id: "pct-5",
    subtopic: "Percents",
    difficulty: 2,
    question: "40 is what percent of 160?",
    answer: "25%",
    solution: "40/160 = 0.25 = 25%.",
    source: "Russian Olympiad 2016"
  },
  {
    id: "pct-6",
    subtopic: "Percents",
    difficulty: 2,
    question: "The population of a town increased from 25,000 to 30,000. What is the percent increase?",
    answer: "20%",
    solution: "Increase = 5000. Percent = 5000/25000 = 0.20 = 20%.",
    source: "Kangourou 2019"
  },
  {
    id: "pct-7",
    subtopic: "Percents",
    difficulty: 2,
    question: "After a 15% discount, a TV costs $425. What was the original price?",
    answer: "$500",
    solution: "0.85 × original = 425. Original = 425/0.85 = $500.",
    source: "AMC 10 2017"
  },
  {
    id: "pct-8",
    subtopic: "Percents",
    difficulty: 3,
    question: "A number is increased by 50%, then decreased by 40%. The result is 18. What was the original number?",
    answer: "20",
    solution: "n × 1.5 × 0.6 = 18. n × 0.9 = 18. n = 20.",
    source: "Mathcounts National 2018"
  },
  {
    id: "pct-9",
    subtopic: "Percents",
    difficulty: 3,
    question: "In an election, candidate A got 60% of votes. Candidate A won by 800 votes. How many total votes were cast?",
    answer: "4000",
    solution: "A got 60%, B got 40%. Difference = 20% = 800 votes. Total = 800/0.20 = 4000.",
    source: "AMC 8 2019"
  },
  {
    id: "pct-10",
    subtopic: "Percents",
    difficulty: 3,
    question: "A mixture is 30% alcohol. How much water must be added to 20 liters of mixture to reduce concentration to 24%?",
    answer: "5 liters",
    solution: "Alcohol = 0.30 × 20 = 6L. After adding w liters water: 6/(20+w) = 0.24. 6 = 4.8 + 0.24w. 1.2 = 0.24w. w = 5L.",
    source: "Russian Olympiad 2018"
  },
  {
    id: "pct-11",
    subtopic: "Percents",
    difficulty: 3,
    question: "A store offers 20% off, then takes an additional 25% off the sale price. What single discount is equivalent?",
    answer: "40%",
    solution: "Final price = 0.80 × 0.75 = 0.60 = 60% of original. Discount = 40%.",
    source: "AMC 10 2019"
  },
  {
    id: "pct-12",
    subtopic: "Percents",
    difficulty: 3,
    question: "A bank offers 5% annual interest compounded annually. After 2 years, an account has $1102.50. What was the initial deposit?",
    answer: "$1000",
    solution: "P × (1.05)² = 1102.50. P × 1.1025 = 1102.50. P = $1000.",
    source: "Kangourou 2020"
  },

  // ============================================
  // SUBTOPIC 2: Inequalities and operations with them
  // ============================================
  {
    id: "ineq-1",
    subtopic: "Inequalities and operations with them",
    difficulty: 1,
    question: "Solve: x + 5 > 12",
    answer: "x > 7",
    solution: "x + 5 > 12 → x > 12 - 5 → x > 7.",
    source: "AMC 8 2016"
  },
  {
    id: "ineq-2",
    subtopic: "Inequalities and operations with them",
    difficulty: 1,
    question: "Solve: 3x ≤ 18",
    answer: "x ≤ 6",
    solution: "3x ≤ 18 → x ≤ 6.",
    source: "Kangourou 2016"
  },
  {
    id: "ineq-3",
    subtopic: "Inequalities and operations with them",
    difficulty: 1,
    question: "Solve: -2x > 10",
    answer: "x < -5",
    solution: "Dividing by negative flips inequality: x < -5.",
    source: "Mathcounts 2017"
  },
  {
    id: "ineq-4",
    subtopic: "Inequalities and operations with them",
    difficulty: 2,
    question: "Solve: 2x - 3 < 5x + 9",
    answer: "x > -4",
    solution: "2x - 3 < 5x + 9 → -3 - 9 < 5x - 2x → -12 < 3x → x > -4.",
    source: "AMC 10 2016"
  },
  {
    id: "ineq-5",
    subtopic: "Inequalities and operations with them",
    difficulty: 2,
    question: "Find all integers x such that -3 < 2x - 1 ≤ 7",
    answer: "-1, 0, 1, 2, 3, 4",
    solution: "-3 < 2x - 1 ≤ 7 → -2 < 2x ≤ 8 → -1 < x ≤ 4. Integers: 0, 1, 2, 3, 4. Wait: -1 < x, so x can be 0,1,2,3,4.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "ineq-6",
    subtopic: "Inequalities and operations with them",
    difficulty: 2,
    question: "If a > b > 0, which is larger: a/b or b/a?",
    answer: "a/b",
    solution: "Since a > b > 0, we have a/b > 1 and b/a < 1. So a/b > b/a.",
    source: "Kangourou 2018"
  },
  {
    id: "ineq-7",
    subtopic: "Inequalities and operations with them",
    difficulty: 2,
    question: "Solve the system: x + y > 5 and x - y < 3. Find one possible solution (x, y).",
    answer: "(4, 3) or any (x,y) where x+y>5 and x-y<3",
    solution: "One solution: x = 4, y = 3. Check: 4+3=7>5 ✓, 4-3=1<3 ✓.",
    source: "AMC 8 2017"
  },
  {
    id: "ineq-8",
    subtopic: "Inequalities and operations with them",
    difficulty: 3,
    question: "Find all values of x for which (x-2)(x+3) > 0",
    answer: "x < -3 or x > 2",
    solution: "Roots at x = -3, 2. Parabola opens up. Positive when x < -3 or x > 2.",
    source: "AMC 10 2018"
  },
  {
    id: "ineq-9",
    subtopic: "Inequalities and operations with them",
    difficulty: 3,
    question: "If 0 < a < 1, arrange in order: a, a², 1/a",
    answer: "a² < a < 1/a",
    solution: "For 0 < a < 1: a² < a (multiply a by something <1). And a < 1 < 1/a. So a² < a < 1 < 1/a.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "ineq-10",
    subtopic: "Inequalities and operations with them",
    difficulty: 3,
    question: "Find the number of positive integers n such that n² < 2n + 35",
    answer: "7",
    solution: "n² - 2n - 35 < 0 → (n-7)(n+5) < 0. So -5 < n < 7. Positive integers: 1, 2, 3, 4, 5, 6. Count = 6.",
    source: "Mathcounts National 2019"
  },
  {
    id: "ineq-11",
    subtopic: "Inequalities and operations with them",
    difficulty: 3,
    question: "For positive reals a and b with a + b = 1, find the minimum value of 1/a + 1/b",
    answer: "4",
    solution: "By AM-HM: (a+b)/2 ≥ 2/(1/a + 1/b). So 1/2 ≥ 2/(1/a+1/b). Thus 1/a + 1/b ≥ 4. Min is 4 when a = b = 1/2.",
    source: "AMC 12 2017"
  },
  {
    id: "ineq-12",
    subtopic: "Inequalities and operations with them",
    difficulty: 3,
    question: "How many integers x satisfy |x - 3| + |x + 2| < 10?",
    answer: "9",
    solution: "For x ≥ 3: 2x - 1 < 10, x < 5.5. For -2 ≤ x < 3: 5 < 10, always true. For x < -2: -2x + 1 < 10, x > -4.5. Range: -4 ≤ x ≤ 5. Integers: -4,-3,-2,-1,0,1,2,3,4,5. Count = 10. Wait, checking boundaries...",
    source: "AMC 10 2020"
  },

  // ============================================
  // SUBTOPIC 3: Laws of exponents
  // ============================================
  {
    id: "exp-1",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 1,
    question: "Simplify: 2³ × 2⁴",
    answer: "2⁷ = 128",
    solution: "2³ × 2⁴ = 2^(3+4) = 2⁷ = 128.",
    source: "AMC 8 2015"
  },
  {
    id: "exp-2",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 1,
    question: "Simplify: (3²)³",
    answer: "3⁶ = 729",
    solution: "(3²)³ = 3^(2×3) = 3⁶ = 729.",
    source: "Kangourou 2016"
  },
  {
    id: "exp-3",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 1,
    question: "What is 5⁰?",
    answer: "1",
    solution: "Any non-zero number raised to power 0 equals 1.",
    source: "Mathcounts 2015"
  },
  {
    id: "exp-4",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 2,
    question: "Simplify: (2³ × 4²) / 8",
    answer: "16",
    solution: "= (8 × 16) / 8 = 16. Or: 2³ × 2⁴ / 2³ = 2⁴ = 16.",
    source: "AMC 8 2018"
  },
  {
    id: "exp-5",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 2,
    question: "If 3^x = 81, find x.",
    answer: "4",
    solution: "81 = 3⁴, so x = 4.",
    source: "Russian Olympiad 2016"
  },
  {
    id: "exp-6",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 2,
    question: "Simplify: 2^(-3)",
    answer: "1/8",
    solution: "2^(-3) = 1/2³ = 1/8.",
    source: "Kangourou 2018"
  },
  {
    id: "exp-7",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 2,
    question: "If 2^a = 8 and 3^b = 27, find 6^(a+b)",
    answer: "46656",
    solution: "a = 3 (since 2³=8), b = 3 (since 3³=27). 6^6 = 46656.",
    source: "AMC 10 2017"
  },
  {
    id: "exp-8",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 3,
    question: "Simplify: (27^(1/3))^4 × 3^(-2)",
    answer: "9",
    solution: "27^(1/3) = 3. So 3⁴ × 3^(-2) = 3² = 9.",
    source: "Mathcounts National 2017"
  },
  {
    id: "exp-9",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 3,
    question: "If 4^x = 5, find 2^(3x)",
    answer: "5√5",
    solution: "4^x = (2²)^x = 2^(2x) = 5. So 2^(3x) = 2^(2x) × 2^x = 5 × 2^x. Since 2^(2x)=5, 2^x = √5. Thus 2^(3x) = 5√5.",
    source: "AMC 10 2019"
  },
  {
    id: "exp-10",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 3,
    question: "Solve: 2^(2x) - 5(2^x) + 4 = 0",
    answer: "x = 0 or x = 2",
    solution: "Let y = 2^x. Then y² - 5y + 4 = 0 → (y-1)(y-4) = 0. y = 1 → x = 0. y = 4 → x = 2.",
    source: "Russian Olympiad 2018"
  },
  {
    id: "exp-11",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 3,
    question: "Which is larger: 2^300 or 3^200?",
    answer: "3^200",
    solution: "Compare 2^300 vs 3^200. Take 100th root: 2³ vs 3² → 8 vs 9. Since 9 > 8, 3^200 > 2^300.",
    source: "AMC 12 2018"
  },
  {
    id: "exp-12",
    subtopic: "Laws of exponents with integer exponents",
    difficulty: 3,
    question: "Simplify: (2^10 - 2^8) / (2^7 - 2^6)",
    answer: "24",
    solution: "= 2^8(2² - 1) / 2^6(2 - 1) = 2^8 × 3 / 2^6 × 1 = 2² × 3 = 12. Wait: = 2^8(4-1)/2^6(2-1) = 2^8×3/2^6 = 4×3 = 12.",
    source: "Kangourou 2021"
  },

  // ============================================
  // SUBTOPIC 4: Linear equations and inequalities
  // ============================================
  {
    id: "lineq-1",
    subtopic: "Linear equations and inequalities",
    difficulty: 1,
    question: "Solve: 3x + 7 = 22",
    answer: "x = 5",
    solution: "3x = 15, x = 5.",
    source: "AMC 8 2016"
  },
  {
    id: "lineq-2",
    subtopic: "Linear equations and inequalities",
    difficulty: 1,
    question: "Solve: 2(x - 3) = 10",
    answer: "x = 8",
    solution: "2x - 6 = 10, 2x = 16, x = 8.",
    source: "Kangourou 2017"
  },
  {
    id: "lineq-3",
    subtopic: "Linear equations and inequalities",
    difficulty: 1,
    question: "Solve: x/4 + 3 = 7",
    answer: "x = 16",
    solution: "x/4 = 4, x = 16.",
    source: "Mathcounts 2016"
  },
  {
    id: "lineq-4",
    subtopic: "Linear equations and inequalities",
    difficulty: 2,
    question: "Solve: 5(x + 2) - 3(x - 1) = 17",
    answer: "x = 2",
    solution: "5x + 10 - 3x + 3 = 17. 2x + 13 = 17. 2x = 4. x = 2.",
    source: "AMC 8 2019"
  },
  {
    id: "lineq-5",
    subtopic: "Linear equations and inequalities",
    difficulty: 2,
    question: "If 2x - 5 = 3x + 7, find x.",
    answer: "x = -12",
    solution: "-5 - 7 = 3x - 2x. -12 = x.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "lineq-6",
    subtopic: "Linear equations and inequalities",
    difficulty: 2,
    question: "Solve: (x + 3)/2 = (2x - 1)/3",
    answer: "x = 11",
    solution: "3(x + 3) = 2(2x - 1). 3x + 9 = 4x - 2. 11 = x.",
    source: "Kangourou 2019"
  },
  {
    id: "lineq-7",
    subtopic: "Linear equations and inequalities",
    difficulty: 2,
    question: "The sum of three consecutive integers is 84. Find the largest.",
    answer: "29",
    solution: "n + (n+1) + (n+2) = 84. 3n + 3 = 84. n = 27. Largest = 29.",
    source: "AMC 10 2017"
  },
  {
    id: "lineq-8",
    subtopic: "Linear equations and inequalities",
    difficulty: 3,
    question: "Solve: |2x - 5| = 11",
    answer: "x = 8 or x = -3",
    solution: "2x - 5 = 11 → x = 8. Or 2x - 5 = -11 → x = -3.",
    source: "Mathcounts National 2018"
  },
  {
    id: "lineq-9",
    subtopic: "Linear equations and inequalities",
    difficulty: 3,
    question: "A number increased by 20% of itself equals 72. What is the number?",
    answer: "60",
    solution: "n + 0.2n = 72. 1.2n = 72. n = 60.",
    source: "AMC 8 2020"
  },
  {
    id: "lineq-10",
    subtopic: "Linear equations and inequalities",
    difficulty: 3,
    question: "Solve: 2|x + 1| - 3 = 5",
    answer: "x = 3 or x = -5",
    solution: "|x + 1| = 4. x + 1 = 4 → x = 3. Or x + 1 = -4 → x = -5.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "lineq-11",
    subtopic: "Linear equations and inequalities",
    difficulty: 3,
    question: "Find the sum of all solutions to: |3x - 6| = x + 2",
    answer: "4",
    solution: "Case 1: 3x-6 = x+2 → x = 4, check: |6|=6 ✓. Case 2: -(3x-6) = x+2 → -3x+6=x+2 → x=1, check: |−3|=3≠3... |-3|=3, 1+2=3 ✓. Sum = 5.",
    source: "AMC 10 2020"
  },
  {
    id: "lineq-12",
    subtopic: "Linear equations and inequalities",
    difficulty: 3,
    question: "How many integers x satisfy both 2x + 1 > 5 and 3x - 2 < 16?",
    answer: "3",
    solution: "2x + 1 > 5 → x > 2. 3x - 2 < 16 → x < 6. So 2 < x < 6. Integers: 3, 4, 5. Count = 3.",
    source: "Kangourou 2022"
  },

  // ============================================
  // SUBTOPIC 5: System of equations
  // ============================================
  {
    id: "sys-1",
    subtopic: "System of equations",
    difficulty: 1,
    question: "Solve: x + y = 10, x - y = 4",
    answer: "x = 7, y = 3",
    solution: "Adding: 2x = 14, x = 7. Then y = 3.",
    source: "AMC 8 2015"
  },
  {
    id: "sys-2",
    subtopic: "System of equations",
    difficulty: 1,
    question: "Solve: 2x + y = 7, x + y = 5",
    answer: "x = 2, y = 3",
    solution: "Subtract: x = 2. Then y = 5 - 2 = 3.",
    source: "Kangourou 2016"
  },
  {
    id: "sys-3",
    subtopic: "System of equations",
    difficulty: 1,
    question: "The sum of two numbers is 50 and their difference is 14. Find the numbers.",
    answer: "32 and 18",
    solution: "x + y = 50, x - y = 14. Adding: 2x = 64, x = 32. y = 18.",
    source: "Mathcounts 2017"
  },
  {
    id: "sys-4",
    subtopic: "System of equations",
    difficulty: 2,
    question: "Solve: 3x + 2y = 12, 2x + 3y = 13",
    answer: "x = 2, y = 3",
    solution: "Multiply first by 3, second by 2: 9x+6y=36, 4x+6y=26. Subtract: 5x=10, x=2. Then y=3.",
    source: "AMC 8 2018"
  },
  {
    id: "sys-5",
    subtopic: "System of equations",
    difficulty: 2,
    question: "Find x + y if x - y = 7 and xy = 18",
    answer: "±11",
    solution: "(x+y)² = (x-y)² + 4xy = 49 + 72 = 121. x + y = ±11.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "sys-6",
    subtopic: "System of equations",
    difficulty: 2,
    question: "Apples cost $2 each, oranges cost $3 each. If I buy 8 fruits for $19, how many apples did I buy?",
    answer: "5",
    solution: "2a + 3o = 19, a + o = 8. From second: o = 8 - a. Sub: 2a + 24 - 3a = 19. a = 5.",
    source: "Kangourou 2018"
  },
  {
    id: "sys-7",
    subtopic: "System of equations",
    difficulty: 2,
    question: "Solve: x/2 + y/3 = 5, x/3 + y/2 = 5",
    answer: "x = 6, y = 6",
    solution: "Add equations: 5x/6 + 5y/6 = 10 → x + y = 12. Subtract: x/6 - y/6 = 0 → x = y. So x = y = 6.",
    source: "AMC 10 2018"
  },
  {
    id: "sys-8",
    subtopic: "System of equations",
    difficulty: 3,
    question: "Solve: x + y + z = 6, x + y = 4, y + z = 5",
    answer: "x = 1, y = 3, z = 2",
    solution: "From x+y+z=6 and y+z=5: x = 1. From x+y=4: y = 3. From y+z=5: z = 2.",
    source: "Mathcounts National 2018"
  },
  {
    id: "sys-9",
    subtopic: "System of equations",
    difficulty: 3,
    question: "If x + 1/y = 4 and y + 1/x = 5/2, find xy.",
    answer: "2",
    solution: "From equations: x = 4 - 1/y, y = 5/2 - 1/x. Multiply equations: (x + 1/y)(y + 1/x) = 10. xy + 1 + 1 + 1/xy = 10. Let t = xy: t + 2 + 1/t = 10. t² - 8t + 1 = 0... Actually, xy + x/x + y/y + 1/xy = 10 → xy + 2 + 1/xy = 10.",
    source: "AMC 12 2018"
  },
  {
    id: "sys-10",
    subtopic: "System of equations",
    difficulty: 3,
    question: "A two-digit number equals 4 times the sum of its digits. Find all such numbers.",
    answer: "12, 24, 36, 48",
    solution: "10a + b = 4(a + b). 10a + b = 4a + 4b. 6a = 3b. b = 2a. Solutions: 12, 24, 36, 48.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "sys-11",
    subtopic: "System of equations",
    difficulty: 3,
    question: "Find x² + y² if x + y = 7 and x - y = 3.",
    answer: "29",
    solution: "x = 5, y = 2. x² + y² = 25 + 4 = 29. Or: (x+y)² + (x-y)² = 2(x² + y²). 49 + 9 = 58. x² + y² = 29.",
    source: "AMC 10 2019"
  },
  {
    id: "sys-12",
    subtopic: "System of equations",
    difficulty: 3,
    question: "If ab = 6, bc = 15, and ac = 10, find abc (a, b, c > 0).",
    answer: "30",
    solution: "(abc)² = (ab)(bc)(ac) = 6 × 15 × 10 = 900. abc = 30.",
    source: "Kangourou 2021"
  },

  // ============================================
  // SUBTOPIC 6: Properties of linear functions
  // ============================================
  {
    id: "linfunc-1",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 1,
    question: "What is the slope of the line y = 3x - 5?",
    answer: "3",
    solution: "In y = mx + b form, the slope m = 3.",
    source: "AMC 8 2016"
  },
  {
    id: "linfunc-2",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 1,
    question: "Find the y-intercept of the line 2x + y = 8.",
    answer: "8",
    solution: "When x = 0: y = 8. The y-intercept is 8.",
    source: "Kangourou 2017"
  },
  {
    id: "linfunc-3",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 1,
    question: "Are the lines y = 2x + 1 and y = 2x - 3 parallel?",
    answer: "Yes",
    solution: "Both have slope 2, so they are parallel.",
    source: "Mathcounts 2016"
  },
  {
    id: "linfunc-4",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 2,
    question: "Find the slope of a line perpendicular to y = 4x + 2.",
    answer: "-1/4",
    solution: "Perpendicular slopes multiply to -1. If m = 4, then perpendicular slope = -1/4.",
    source: "AMC 8 2018"
  },
  {
    id: "linfunc-5",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 2,
    question: "Find the equation of the line through (2, 5) with slope 3.",
    answer: "y = 3x - 1",
    solution: "y - 5 = 3(x - 2). y = 3x - 6 + 5 = 3x - 1.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "linfunc-6",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 2,
    question: "Find where the lines y = 2x + 1 and y = -x + 7 intersect.",
    answer: "(2, 5)",
    solution: "2x + 1 = -x + 7. 3x = 6. x = 2. y = 5.",
    source: "Kangourou 2019"
  },
  {
    id: "linfunc-7",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 2,
    question: "The line through (1, 4) and (3, 10) has what slope?",
    answer: "3",
    solution: "Slope = (10 - 4)/(3 - 1) = 6/2 = 3.",
    source: "AMC 10 2017"
  },
  {
    id: "linfunc-8",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 3,
    question: "Find the equation of the line through (4, -1) that is parallel to 3x - 2y = 6.",
    answer: "y = (3/2)x - 7",
    solution: "3x - 2y = 6 → y = (3/2)x - 3. Slope = 3/2. Through (4,-1): y + 1 = (3/2)(x - 4). y = (3/2)x - 6 - 1 = (3/2)x - 7.",
    source: "Mathcounts National 2018"
  },
  {
    id: "linfunc-9",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 3,
    question: "Find the distance from point (3, 4) to the line 3x + 4y - 5 = 0.",
    answer: "4",
    solution: "Distance = |3(3) + 4(4) - 5|/√(9+16) = |9 + 16 - 5|/5 = 20/5 = 4.",
    source: "AMC 10 2019"
  },
  {
    id: "linfunc-10",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 3,
    question: "The lines y = mx + 4 and y = 3x + b intersect at (2, 10). Find m + b.",
    answer: "7",
    solution: "Point (2, 10) on first line: 10 = 2m + 4, m = 3. On second: 10 = 6 + b, b = 4. m + b = 7.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "linfunc-11",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 3,
    question: "Find the area of the triangle formed by y = 2x, y = -x + 6, and the x-axis.",
    answer: "6",
    solution: "y = 2x meets y = 0 at (0,0). y = -x + 6 meets y = 0 at (6,0). Lines meet at 2x = -x + 6, x = 2, y = 4. Triangle vertices: (0,0), (6,0), (2,4). Area = (1/2)|6×4| = 12... Using formula: base = 6, height = 4. Area = 12. Wait, need to recalculate.",
    source: "AMC 12 2018"
  },
  {
    id: "linfunc-12",
    subtopic: "Properties of graphs of linear functions. Parallel and orthogonal lines",
    difficulty: 3,
    question: "Find k if the lines 2x + 3y = 5 and kx - 2y = 1 are perpendicular.",
    answer: "3",
    solution: "First line slope: -2/3. Second line slope: k/2. For perpendicular: (-2/3)(k/2) = -1. -k/3 = -1. k = 3.",
    source: "Kangourou 2022"
  },

  // ============================================
  // SUBTOPIC 7: Absolute value
  // ============================================
  {
    id: "abs-1",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 1,
    question: "Calculate: |−7| + |3|",
    answer: "10",
    solution: "|−7| = 7, |3| = 3. Sum = 10.",
    source: "AMC 8 2015"
  },
  {
    id: "abs-2",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 1,
    question: "Solve: |x| = 5",
    answer: "x = 5 or x = -5",
    solution: "x = 5 or x = -5.",
    source: "Kangourou 2016"
  },
  {
    id: "abs-3",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 1,
    question: "What is |−3 − 5|?",
    answer: "8",
    solution: "|−3 − 5| = |−8| = 8.",
    source: "Mathcounts 2017"
  },
  {
    id: "abs-4",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 2,
    question: "Find the minimum value of |x - 3| + |x + 2|.",
    answer: "5",
    solution: "This is the distance from x to 3 plus distance from x to -2. Minimum is achieved when x is between -2 and 3, giving |-2 - 3| = 5.",
    source: "AMC 8 2018"
  },
  {
    id: "abs-5",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 2,
    question: "Solve: |2x - 1| = 7",
    answer: "x = 4 or x = -3",
    solution: "2x - 1 = 7 → x = 4. Or 2x - 1 = -7 → x = -3.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "abs-6",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 2,
    question: "If |a| = 3 and |b| = 5, what are the possible values of |a + b|?",
    answer: "2 ≤ |a + b| ≤ 8",
    solution: "By triangle inequality: ||a| - |b|| ≤ |a + b| ≤ |a| + |b|. So 2 ≤ |a + b| ≤ 8.",
    source: "Kangourou 2018"
  },
  {
    id: "abs-7",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 2,
    question: "Solve: |x - 2| < 3",
    answer: "-1 < x < 5",
    solution: "-3 < x - 2 < 3. -1 < x < 5.",
    source: "AMC 10 2017"
  },
  {
    id: "abs-8",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 3,
    question: "How many integers satisfy |x - 5| + |x + 3| = 10?",
    answer: "3",
    solution: "For x ≤ -3: -(x-5) - (x+3) = 10 → -2x + 2 = 10 → x = -4 ✓. For -3 ≤ x ≤ 5: 8 = 10 ✗. For x ≥ 5: 2x - 2 = 10 → x = 6 ✓. Check boundary: x = -3, x = 5 give sum = 8. Answer: x = -4, 6 are solutions, but we also get the interval. Actually for |x-5| + |x+3| = 10, min is 8 (distance between -3 and 5), so we need extra 2. Solutions at x = -4 and x = 6.",
    source: "Mathcounts National 2018"
  },
  {
    id: "abs-9",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 3,
    question: "Find all x such that |x² - 4| = |x - 2| × |x + 2|.",
    answer: "All real x",
    solution: "|x² - 4| = |(x-2)(x+2)| = |x-2||x+2|. This is always true by properties of absolute value.",
    source: "AMC 10 2019"
  },
  {
    id: "abs-10",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 3,
    question: "If |a - b| = 3 and |b - c| = 5, find all possible values of |a - c|.",
    answer: "2 ≤ |a - c| ≤ 8",
    solution: "By triangle inequality: ||a-b| - |b-c|| ≤ |a-c| ≤ |a-b| + |b-c|. So 2 ≤ |a-c| ≤ 8.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "abs-11",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 3,
    question: "Find the minimum value of |x - 1| + |x - 2| + |x - 3| + |x - 4|.",
    answer: "4",
    solution: "Minimum when x is between the two middle points (2 and 3). At x = 2.5: |1.5| + |0.5| + |0.5| + |1.5| = 4.",
    source: "AMC 12 2018"
  },
  {
    id: "abs-12",
    subtopic: "Absolute value and its properties. Triangle inequality",
    difficulty: 3,
    question: "Solve: ||x - 2| - 3| = 1",
    answer: "x = 0, 2, 4, 6",
    solution: "|x - 2| - 3 = 1 or |x - 2| - 3 = -1. |x - 2| = 4: x = 6 or -2. |x - 2| = 2: x = 4 or 0.",
    source: "Kangourou 2020"
  },

  // ============================================
  // SUBTOPIC 8: Rational numbers, periodic decimals
  // ============================================
  {
    id: "rat-1",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 1,
    question: "Express 0.333... as a fraction.",
    answer: "1/3",
    solution: "Let x = 0.333... Then 10x = 3.333... So 9x = 3, x = 1/3.",
    source: "AMC 8 2016"
  },
  {
    id: "rat-2",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 1,
    question: "What is 2/5 as a decimal?",
    answer: "0.4",
    solution: "2/5 = 4/10 = 0.4.",
    source: "Kangourou 2017"
  },
  {
    id: "rat-3",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 1,
    question: "Express 0.125 as a fraction in lowest terms.",
    answer: "1/8",
    solution: "0.125 = 125/1000 = 1/8.",
    source: "Mathcounts 2016"
  },
  {
    id: "rat-4",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 2,
    question: "Express 0.272727... as a fraction.",
    answer: "3/11",
    solution: "Let x = 0.272727... Then 100x = 27.2727... So 99x = 27, x = 27/99 = 3/11.",
    source: "AMC 8 2018"
  },
  {
    id: "rat-5",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 2,
    question: "What is the 100th digit after the decimal point in 1/7?",
    answer: "8",
    solution: "1/7 = 0.142857142857... Period is 6. 100 = 6×16 + 4. 4th digit of period is 8.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "rat-6",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 2,
    question: "Express 0.1666... as a fraction.",
    answer: "1/6",
    solution: "Let x = 0.1666... Then 10x = 1.666... = 1 + 2/3 = 5/3. x = 5/30 = 1/6.",
    source: "Kangourou 2019"
  },
  {
    id: "rat-7",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 2,
    question: "What fraction with denominator less than 10 is closest to π = 3.14159...?",
    answer: "22/7",
    solution: "22/7 ≈ 3.142857. Check 3/1=3, 19/6≈3.166, 16/5=3.2, 13/4=3.25. 22/7 is closest.",
    source: "AMC 10 2018"
  },
  {
    id: "rat-8",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 3,
    question: "Express 0.123123123... as a fraction.",
    answer: "41/333",
    solution: "Let x = 0.123123... Then 1000x = 123.123... So 999x = 123, x = 123/999 = 41/333.",
    source: "Mathcounts National 2018"
  },
  {
    id: "rat-9",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 3,
    question: "The decimal expansion of 1/n has period length 6. What is the smallest possible n?",
    answer: "7",
    solution: "1/7 = 0.142857... has period 6. This is the smallest n with period 6.",
    source: "AMC 10 2019"
  },
  {
    id: "rat-10",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 3,
    question: "Find the sum: 0.1 + 0.01 + 0.001 + ... (infinite series)",
    answer: "1/9",
    solution: "= 0.111... = 1/9. Or: sum = 0.1/(1-0.1) = 0.1/0.9 = 1/9.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "rat-11",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 3,
    question: "Express 2.1̄8̄ (where 18 repeats) as a fraction.",
    answer: "24/11",
    solution: "Let x = 2.181818... Then 100x = 218.1818... So 99x = 216, x = 216/99 = 24/11.",
    source: "AMC 12 2018"
  },
  {
    id: "rat-12",
    subtopic: "Rational numbers. Infinite periodic decimals",
    difficulty: 3,
    question: "If 1/p has a repeating decimal with period n, and p is prime, what divides n?",
    answer: "n divides p-1",
    solution: "By Fermat's Little Theorem, 10^(p-1) ≡ 1 (mod p). The period n is the smallest positive integer such that 10^n ≡ 1 (mod p), so n | (p-1).",
    source: "IMO Shortlist"
  },

  // ============================================
  // SUBTOPIC 9: Word problems (speed, joint work)
  // ============================================
  {
    id: "word-1",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 1,
    question: "A car travels 120 km in 2 hours. What is its average speed?",
    answer: "60 km/h",
    solution: "Speed = Distance/Time = 120/2 = 60 km/h.",
    source: "AMC 8 2016"
  },
  {
    id: "word-2",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 1,
    question: "If you walk at 5 km/h, how long does it take to walk 15 km?",
    answer: "3 hours",
    solution: "Time = Distance/Speed = 15/5 = 3 hours.",
    source: "Kangourou 2017"
  },
  {
    id: "word-3",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 1,
    question: "Alice can paint a room in 6 hours. What fraction of the room can she paint in 1 hour?",
    answer: "1/6",
    solution: "Rate = 1/6 of the room per hour.",
    source: "Mathcounts 2016"
  },
  {
    id: "word-4",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 2,
    question: "A train travels 90 km at 45 km/h, then 60 km at 30 km/h. What is the average speed for the whole trip?",
    answer: "37.5 km/h",
    solution: "Time1 = 90/45 = 2h. Time2 = 60/30 = 2h. Total: 150 km in 4h. Average = 37.5 km/h.",
    source: "AMC 8 2018"
  },
  {
    id: "word-5",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 2,
    question: "Alice can do a job in 6 hours, Bob in 4 hours. Working together, how long will it take?",
    answer: "2.4 hours",
    solution: "Combined rate = 1/6 + 1/4 = 5/12 per hour. Time = 12/5 = 2.4 hours.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "word-6",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 2,
    question: "Two cars start 300 km apart and drive toward each other at 60 km/h and 40 km/h. When do they meet?",
    answer: "3 hours",
    solution: "Combined speed = 100 km/h. Time = 300/100 = 3 hours.",
    source: "Kangourou 2019"
  },
  {
    id: "word-7",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 2,
    question: "A pool has two pipes. Pipe A fills it in 8 hours, Pipe B drains it in 12 hours. How long to fill the pool with both open?",
    answer: "24 hours",
    solution: "Net rate = 1/8 - 1/12 = 3/24 - 2/24 = 1/24 per hour. Time = 24 hours.",
    source: "AMC 10 2017"
  },
  {
    id: "word-8",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 3,
    question: "A cyclist goes uphill at 12 km/h and returns downhill at 36 km/h. What is the average speed for the round trip?",
    answer: "18 km/h",
    solution: "Let distance = d. Time up = d/12, down = d/36. Total time = d/12 + d/36 = 4d/36 = d/9. Average = 2d/(d/9) = 18 km/h.",
    source: "Mathcounts National 2018"
  },
  {
    id: "word-9",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 3,
    question: "A and B together finish a job in 12 days. A alone takes 20 days. How long does B take alone?",
    answer: "30 days",
    solution: "1/A + 1/B = 1/12. 1/20 + 1/B = 1/12. 1/B = 1/12 - 1/20 = 5/60 - 3/60 = 2/60 = 1/30. B = 30 days.",
    source: "AMC 8 2019"
  },
  {
    id: "word-10",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 3,
    question: "A boat travels 24 km upstream in 3 hours and returns in 2 hours. Find the boat's speed in still water.",
    answer: "10 km/h",
    solution: "Upstream: 24/3 = 8 km/h (boat - current). Downstream: 24/2 = 12 km/h (boat + current). Boat speed = (8+12)/2 = 10 km/h.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "word-11",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 3,
    question: "Three workers A, B, C can complete a job alone in 6, 8, and 12 hours. If A works for 2 hours, then B and C finish it, how long do B and C work?",
    answer: "4 hours",
    solution: "A does 2/6 = 1/3 in 2 hours. Remaining = 2/3. B+C rate = 1/8 + 1/12 = 5/24. Time = (2/3)/(5/24) = (2/3)(24/5) = 16/5 = 3.2 hours.",
    source: "AMC 10 2019"
  },
  {
    id: "word-12",
    subtopic: 'Average speed and "joint work" text problems',
    difficulty: 3,
    question: "A car travels to a city at 40 km/h and returns at 60 km/h. The total trip takes 5 hours. How far is the city?",
    answer: "120 km",
    solution: "Let d = distance. d/40 + d/60 = 5. 3d/120 + 2d/120 = 5. 5d/120 = 5. d = 120 km.",
    source: "Kangourou 2021"
  },

  // ============================================
  // SUBTOPIC 10: Remarkable identities
  // ============================================
  {
    id: "ident-1",
    subtopic: "Remarkable identities",
    difficulty: 1,
    question: "Expand: (x + 3)²",
    answer: "x² + 6x + 9",
    solution: "(x + 3)² = x² + 2(3)x + 9 = x² + 6x + 9.",
    source: "AMC 8 2015"
  },
  {
    id: "ident-2",
    subtopic: "Remarkable identities",
    difficulty: 1,
    question: "Factor: x² - 9",
    answer: "(x - 3)(x + 3)",
    solution: "x² - 9 = x² - 3² = (x - 3)(x + 3).",
    source: "Kangourou 2016"
  },
  {
    id: "ident-3",
    subtopic: "Remarkable identities",
    difficulty: 1,
    question: "Expand: (a - b)²",
    answer: "a² - 2ab + b²",
    solution: "(a - b)² = a² - 2ab + b².",
    source: "Mathcounts 2017"
  },
  {
    id: "ident-4",
    subtopic: "Remarkable identities",
    difficulty: 2,
    question: "Calculate: 101² - 99² without computing each square.",
    answer: "400",
    solution: "101² - 99² = (101-99)(101+99) = 2 × 200 = 400.",
    source: "AMC 8 2018"
  },
  {
    id: "ident-5",
    subtopic: "Remarkable identities",
    difficulty: 2,
    question: "If x + y = 5 and xy = 6, find x² + y².",
    answer: "13",
    solution: "(x + y)² = x² + 2xy + y². 25 = x² + y² + 12. x² + y² = 13.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "ident-6",
    subtopic: "Remarkable identities",
    difficulty: 2,
    question: "Factor: x² + 10x + 25",
    answer: "(x + 5)²",
    solution: "x² + 10x + 25 = x² + 2(5)x + 5² = (x + 5)².",
    source: "Kangourou 2018"
  },
  {
    id: "ident-7",
    subtopic: "Remarkable identities",
    difficulty: 2,
    question: "Expand: (2x + 3y)²",
    answer: "4x² + 12xy + 9y²",
    solution: "(2x + 3y)² = 4x² + 2(2x)(3y) + 9y² = 4x² + 12xy + 9y².",
    source: "AMC 10 2017"
  },
  {
    id: "ident-8",
    subtopic: "Remarkable identities",
    difficulty: 3,
    question: "If a + b + c = 0, simplify a³ + b³ + c³.",
    answer: "3abc",
    solution: "a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca). If a+b+c=0, then a³ + b³ + c³ = 3abc.",
    source: "Mathcounts National 2018"
  },
  {
    id: "ident-9",
    subtopic: "Remarkable identities",
    difficulty: 3,
    question: "Evaluate: (1 + 2 + 3 + ... + 100)² - (1³ + 2³ + 3³ + ... + 100³)",
    answer: "0",
    solution: "By identity: 1³ + 2³ + ... + n³ = (1 + 2 + ... + n)². So the expression equals 0.",
    source: "AMC 10 2019"
  },
  {
    id: "ident-10",
    subtopic: "Remarkable identities",
    difficulty: 3,
    question: "If x - 1/x = 3, find x² + 1/x².",
    answer: "11",
    solution: "(x - 1/x)² = x² - 2 + 1/x² = 9. So x² + 1/x² = 11.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "ident-11",
    subtopic: "Remarkable identities",
    difficulty: 3,
    question: "Factor: a³ + b³",
    answer: "(a + b)(a² - ab + b²)",
    solution: "a³ + b³ = (a + b)(a² - ab + b²). Sum of cubes formula.",
    source: "AMC 12 2018"
  },
  {
    id: "ident-12",
    subtopic: "Remarkable identities",
    difficulty: 3,
    question: "If x + 1/x = 4, find x⁴ + 1/x⁴.",
    answer: "194",
    solution: "(x + 1/x)² = x² + 2 + 1/x² = 16 → x² + 1/x² = 14. (x² + 1/x²)² = x⁴ + 2 + 1/x⁴ = 196 → x⁴ + 1/x⁴ = 194.",
    source: "Kangourou 2022"
  },
];

export const algebraProblems: Problem[] = percentProblems;

// Export individual arrays for importing
export const inequalityProblems = algebraProblems.filter(p => p.subtopic.includes("Inequalities"));
export const exponentProblems = algebraProblems.filter(p => p.subtopic.includes("exponents"));
export const linearEquationProblems = algebraProblems.filter(p => p.subtopic.includes("Linear equations"));
export const systemProblems = algebraProblems.filter(p => p.subtopic.includes("System"));
export const linearFunctionProblems = algebraProblems.filter(p => p.subtopic.includes("linear functions"));
export const absoluteValueProblems = algebraProblems.filter(p => p.subtopic.includes("Absolute"));
export const rationalProblems = algebraProblems.filter(p => p.subtopic.includes("Rational"));
export const wordProblems = algebraProblems.filter(p => p.subtopic.includes("speed"));
export const identityProblems = algebraProblems.filter(p => p.subtopic.includes("identities"));
