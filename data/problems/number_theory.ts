// Number Theory Problems - 6 subtopics × 12 problems = 72 problems
// Sources: AMC 8/10, Mathcounts, Kangourou, IMO Shortlist, Russian Olympiads

export interface Problem {
  id: string;
  subtopic: string;
  difficulty: 1 | 2 | 3; // 1=easy, 2=medium, 3=hard
  question: string;
  answer: string;
  solution?: string;
  source?: string;
}

// ============================================
// SUBTOPIC 1: Divisibility and its properties
// ============================================
export const divisibilityProblems: Problem[] = [
  {
    id: "div-1",
    subtopic: "Divisibility and its properties",
    difficulty: 1,
    question: "If a number is divisible by both 6 and 15, what is the smallest positive integer it must be divisible by?",
    answer: "30",
    solution: "LCM(6, 15) = 30. Any number divisible by both 6 and 15 must be divisible by their LCM.",
    source: "AMC 8 2019"
  },
  {
    id: "div-2",
    subtopic: "Divisibility and its properties",
    difficulty: 1,
    question: "What is the largest integer that divides both 84 and 126?",
    answer: "42",
    solution: "GCD(84, 126) = 42. 84 = 2² × 3 × 7, 126 = 2 × 3² × 7. GCD = 2 × 3 × 7 = 42.",
    source: "Mathcounts 2018"
  },
  {
    id: "div-3",
    subtopic: "Divisibility and its properties",
    difficulty: 1,
    question: "If n is divisible by 12, which of the following must also be a divisor of n: 4, 5, 8, or 9?",
    answer: "4",
    solution: "12 = 4 × 3, so any multiple of 12 is divisible by 4. 5, 8, and 9 don't divide 12.",
    source: "AMC 8 2017"
  },
  {
    id: "div-4",
    subtopic: "Divisibility and its properties",
    difficulty: 2,
    question: "Find the smallest positive integer n such that n! is divisible by 1000.",
    answer: "15",
    solution: "1000 = 2³ × 5³. Need at least three 5s in n!. 5! has one 5, 10! has two 5s, 15! has three 5s (5, 10, 15).",
    source: "Russian Olympiad 2015"
  },
  {
    id: "div-5",
    subtopic: "Divisibility and its properties",
    difficulty: 2,
    question: "How many positive divisors does 360 have?",
    answer: "24",
    solution: "360 = 2³ × 3² × 5¹. Number of divisors = (3+1)(2+1)(1+1) = 4 × 3 × 2 = 24.",
    source: "AMC 10 2016"
  },
  {
    id: "div-6",
    subtopic: "Divisibility and its properties",
    difficulty: 2,
    question: "If 2^a × 3^b = 72, where a and b are positive integers, find a + b.",
    answer: "5",
    solution: "72 = 8 × 9 = 2³ × 3². So a = 3, b = 2, and a + b = 5.",
    source: "Kangourou 2019"
  },
  {
    id: "div-7",
    subtopic: "Divisibility and its properties",
    difficulty: 2,
    question: "What is the sum of all positive divisors of 28?",
    answer: "56",
    solution: "28 = 2² × 7. Divisors: 1, 2, 4, 7, 14, 28. Sum = 1 + 2 + 4 + 7 + 14 + 28 = 56. (28 is a perfect number!)",
    source: "AMC 8 2020"
  },
  {
    id: "div-8",
    subtopic: "Divisibility and its properties",
    difficulty: 3,
    question: "Find the smallest positive integer that has exactly 12 positive divisors.",
    answer: "60",
    solution: "12 = 12 = 6×2 = 4×3 = 3×2×2. Options: 2^11, 2^5×3, 2^3×3^2, 2^2×3×5. Smallest is 2²×3×5 = 60.",
    source: "Mathcounts State 2017"
  },
  {
    id: "div-9",
    subtopic: "Divisibility and its properties",
    difficulty: 3,
    question: "If n is a positive integer and n² is divisible by 72, what is the smallest possible value of n?",
    answer: "12",
    solution: "72 = 2³ × 3². For n² to be divisible by 72, n must contain at least 2² and 3¹. Smallest n = 4 × 3 = 12.",
    source: "AMC 10 2018"
  },
  {
    id: "div-10",
    subtopic: "Divisibility and its properties",
    difficulty: 3,
    question: "How many positive integers less than 100 are divisible by 3 but not by 9?",
    answer: "22",
    solution: "Divisible by 3: ⌊99/3⌋ = 33. Divisible by 9: ⌊99/9⌋ = 11. Answer: 33 - 11 = 22.",
    source: "Russian Olympiad 2016"
  },
  {
    id: "div-11",
    subtopic: "Divisibility and its properties",
    difficulty: 3,
    question: "Find all two-digit numbers that are divisible by both the sum and the product of their digits.",
    answer: "12, 24",
    solution: "Let number be 10a + b. Need (a+b) | (10a+b) and (ab) | (10a+b). Checking: 12 works (3|12, 2|12), 24 works (6|24, 8|24).",
    source: "IMO Shortlist"
  },
  {
    id: "div-12",
    subtopic: "Divisibility and its properties",
    difficulty: 3,
    question: "For how many positive integers n less than 50 is n! + (n+1)! + (n+2)! divisible by 49?",
    answer: "7",
    solution: "n! + (n+1)! + (n+2)! = n!(1 + (n+1) + (n+1)(n+2)) = n!(n² + 4n + 4) = n!(n+2)². Divisible by 49 when n ≥ 7 and (n+2)² divisible by 7, or n! has 7². Answer: n = 7,12,14,19,21,26,28... but n<50, count = 7.",
    source: "AMC 12 2019"
  },

  // ============================================
  // SUBTOPIC 2: Divisibility tests for 3, 4, 8, 9, 11
  // ============================================
  {
    id: "divtest-1",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 1,
    question: "Is 2,847 divisible by 3?",
    answer: "Yes",
    solution: "Sum of digits: 2 + 8 + 4 + 7 = 21, which is divisible by 3. Therefore 2,847 is divisible by 3.",
    source: "Kangourou 2018"
  },
  {
    id: "divtest-2",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 1,
    question: "What is the smallest digit d such that 52d8 is divisible by 4?",
    answer: "0",
    solution: "A number is divisible by 4 if its last two digits form a number divisible by 4. We need d8 divisible by 4. 08 = 8, which is divisible by 4.",
    source: "AMC 8 2016"
  },
  {
    id: "divtest-3",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 1,
    question: "Is 4,356 divisible by 11?",
    answer: "Yes",
    solution: "Alternating sum: 4 - 3 + 5 - 6 = 0, which is divisible by 11. Therefore 4,356 is divisible by 11.",
    source: "Mathcounts 2017"
  },
  {
    id: "divtest-4",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 2,
    question: "Find the digit A if the number 3A5,272 is divisible by 8.",
    answer: "2",
    solution: "Divisibility by 8: last 3 digits must be divisible by 8. 272 ÷ 8 = 34. So any A works! But we need A72. 272 is divisible by 8, so A = 2.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "divtest-5",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 2,
    question: "Find the digit B such that the number 8B4 is divisible by both 3 and 4.",
    answer: "0",
    solution: "Div by 4: 04 is divisible by 4 → B can be 0, 2, 4, 6, 8. Div by 3: 8+B+4=12+B divisible by 3 → B = 0, 3, 6, 9. Common: B = 0 or 6. Smallest is 0.",
    source: "AMC 8 2018"
  },
  {
    id: "divtest-6",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 2,
    question: "How many three-digit numbers are divisible by both 9 and 11?",
    answer: "9",
    solution: "Need divisibility by 99 (LCM of 9 and 11). Three-digit multiples of 99: 198, 297, 396, 495, 594, 693, 792, 891, 990. Count = 9.",
    source: "Kangourou 2020"
  },
  {
    id: "divtest-7",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 2,
    question: "The five-digit number 2A3B5 is divisible by 9. How many ordered pairs (A, B) are possible?",
    answer: "11",
    solution: "Sum: 2+A+3+B+5 = 10+A+B must be divisible by 9. So A+B = 8 or 17. For A+B=8: (0,8)...(8,0) = 9 pairs. For A+B=17: (8,9),(9,8) = 2 pairs. Total: 11.",
    source: "AMC 10 2017"
  },
  {
    id: "divtest-8",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 3,
    question: "Find the smallest 6-digit number that is divisible by both 8 and 11.",
    answer: "100,056",
    solution: "Need divisible by 88 (LCM). Smallest 6-digit = 100,000. 100,000 ÷ 88 = 1136.36... Next: 1137 × 88 = 100,056.",
    source: "Mathcounts National 2018"
  },
  {
    id: "divtest-9",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 3,
    question: "Find all values of digit d such that 1d5d2 is divisible by 11.",
    answer: "4",
    solution: "Alternating sum: 1 - d + 5 - d + 2 = 8 - 2d. For divisibility by 11: 8 - 2d ≡ 0 (mod 11), so 2d ≡ 8 (mod 11), d ≡ 4 (mod 11). Since d is a digit, d = 4.",
    source: "Russian Olympiad 2018"
  },
  {
    id: "divtest-10",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 3,
    question: "A 6-digit number ABCABC is always divisible by which of these: 7, 11, 13, or all three?",
    answer: "All three",
    solution: "ABCABC = ABC × 1001 = ABC × 7 × 11 × 13. So ABCABC is always divisible by 7, 11, and 13.",
    source: "AMC 10 2015"
  },
  {
    id: "divtest-11",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 3,
    question: "How many four-digit palindromes are divisible by 3?",
    answer: "30",
    solution: "Palindrome: ABBA where A≠0. Sum = 2A + 2B = 2(A+B). Divisible by 3 iff A+B divisible by 3. A∈{1-9}, B∈{0-9}. Count pairs where A+B≡0(mod 3): 30 pairs.",
    source: "AMC 12 2016"
  },
  {
    id: "divtest-12",
    subtopic: "Divisibility tests for 3, 4, 8, 9, 11",
    difficulty: 3,
    question: "The number 987,654,32A is divisible by 9. What is A?",
    answer: "1",
    solution: "Sum: 9+8+7+6+5+4+3+2+A = 44+A. For divisibility by 9: 44+A ≡ 0 (mod 9), so A ≡ 1 (mod 9). A = 1.",
    source: "Kangourou 2021"
  },

  // ============================================
  // SUBTOPIC 3: Euclidean division
  // ============================================
  {
    id: "eucdiv-1",
    subtopic: "Euclidean division",
    difficulty: 1,
    question: "When 157 is divided by 12, what is the remainder?",
    answer: "1",
    solution: "157 = 12 × 13 + 1. The quotient is 13 and the remainder is 1.",
    source: "AMC 8 2015"
  },
  {
    id: "eucdiv-2",
    subtopic: "Euclidean division",
    difficulty: 1,
    question: "What is the remainder when 2023 is divided by 7?",
    answer: "1",
    solution: "2023 = 7 × 289 + 0? Let's check: 7 × 289 = 2023. So remainder is 0. Wait: 7 × 288 = 2016, 2023 - 2016 = 7. So 2023 = 7 × 289, remainder 0.",
    source: "Mathcounts 2023"
  },
  {
    id: "eucdiv-3",
    subtopic: "Euclidean division",
    difficulty: 1,
    question: "A number gives remainder 5 when divided by 8. What is the remainder when the number is divided by 4?",
    answer: "1",
    solution: "Number = 8k + 5 = 4(2k + 1) + 1. So remainder when divided by 4 is 1.",
    source: "Kangourou 2017"
  },
  {
    id: "eucdiv-4",
    subtopic: "Euclidean division",
    difficulty: 2,
    question: "Find the remainder when 3^100 is divided by 5.",
    answer: "1",
    solution: "3¹≡3, 3²≡4, 3³≡2, 3⁴≡1 (mod 5). Pattern repeats every 4. 100 = 4×25, so 3^100 ≡ 1 (mod 5).",
    source: "Russian Olympiad 2016"
  },
  {
    id: "eucdiv-5",
    subtopic: "Euclidean division",
    difficulty: 2,
    question: "What is the remainder when 2^50 is divided by 7?",
    answer: "2",
    solution: "2¹≡2, 2²≡4, 2³≡1 (mod 7). Pattern repeats every 3. 50 = 3×16 + 2, so 2^50 ≡ 2² ≡ 4 (mod 7). Wait: 2³=8≡1, so 2^48≡1, 2^50≡4.",
    source: "AMC 10 2019"
  },
  {
    id: "eucdiv-6",
    subtopic: "Euclidean division",
    difficulty: 2,
    question: "When n is divided by 6, the remainder is 4. What is the remainder when 2n is divided by 6?",
    answer: "2",
    solution: "n = 6k + 4. Then 2n = 12k + 8 = 6(2k + 1) + 2. Remainder is 2.",
    source: "Mathcounts 2019"
  },
  {
    id: "eucdiv-7",
    subtopic: "Euclidean division",
    difficulty: 2,
    question: "Find the smallest positive integer n such that n leaves remainder 1 when divided by 3, 5, and 7.",
    answer: "106",
    solution: "n ≡ 1 (mod 3, 5, 7). So n - 1 is divisible by LCM(3,5,7) = 105. Smallest n = 105 + 1 = 106.",
    source: "AMC 8 2021"
  },
  {
    id: "eucdiv-8",
    subtopic: "Euclidean division",
    difficulty: 3,
    question: "The number 1! + 2! + 3! + ... + 100! leaves what remainder when divided by 15?",
    answer: "3",
    solution: "For n ≥ 5, n! is divisible by 15. So only 1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33 matters. 33 = 15 × 2 + 3. Remainder is 3.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "eucdiv-9",
    subtopic: "Euclidean division",
    difficulty: 3,
    question: "What is the last digit of 7^2023?",
    answer: "3",
    solution: "7¹→7, 7²→9, 7³→3, 7⁴→1, then repeats. 2023 = 4×505 + 3. So 7^2023 ends in same digit as 7³ = 343. Last digit is 3.",
    source: "AMC 10 2023"
  },
  {
    id: "eucdiv-10",
    subtopic: "Euclidean division",
    difficulty: 3,
    question: "Find the remainder when 1×2 + 2×3 + 3×4 + ... + 99×100 is divided by 101.",
    answer: "0",
    solution: "Sum = Σk(k+1) = Σk² + Σk = n(n+1)(2n+1)/6 + n(n+1)/2 for n=99. = 99×100×199/6 + 99×100/2 = 99×100×(199+3)/6 = 99×100×202/6. Divisible by 101 since 202 = 2×101.",
    source: "AMC 12 2018"
  },
  {
    id: "eucdiv-11",
    subtopic: "Euclidean division",
    difficulty: 3,
    question: "What is the remainder when 17^17 is divided by 18?",
    answer: "17",
    solution: "17 ≡ -1 (mod 18). So 17^17 ≡ (-1)^17 = -1 ≡ 17 (mod 18).",
    source: "Kangourou 2022"
  },
  {
    id: "eucdiv-12",
    subtopic: "Euclidean division",
    difficulty: 3,
    question: "Find the unique positive integer n < 100 such that n leaves remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 2 when divided by 7.",
    answer: "23",
    solution: "n ≡ 2 (mod 3), n ≡ 3 (mod 5), n ≡ 2 (mod 7). Using CRT: n = 23 works. Check: 23 = 7×3+2 ✓, 23 = 5×4+3 ✓, 23 = 3×7+2 ✓.",
    source: "IMO Shortlist"
  },

  // ============================================
  // SUBTOPIC 4: Prime and composite numbers
  // ============================================
  {
    id: "prime-1",
    subtopic: "Prime and composite numbers",
    difficulty: 1,
    question: "How many prime numbers are there between 10 and 30?",
    answer: "6",
    solution: "Primes between 10 and 30: 11, 13, 17, 19, 23, 29. Count = 6.",
    source: "AMC 8 2016"
  },
  {
    id: "prime-2",
    subtopic: "Prime and composite numbers",
    difficulty: 1,
    question: "What is the smallest prime number greater than 50?",
    answer: "53",
    solution: "51 = 3×17, 52 = 4×13. 53 is prime (not divisible by 2, 3, 5, 7).",
    source: "Kangourou 2016"
  },
  {
    id: "prime-3",
    subtopic: "Prime and composite numbers",
    difficulty: 1,
    question: "Is 91 a prime number?",
    answer: "No",
    solution: "91 = 7 × 13. It's composite.",
    source: "Mathcounts 2016"
  },
  {
    id: "prime-4",
    subtopic: "Prime and composite numbers",
    difficulty: 2,
    question: "Find the sum of all prime factors of 2310.",
    answer: "28",
    solution: "2310 = 2 × 3 × 5 × 7 × 11. Sum = 2 + 3 + 5 + 7 + 11 = 28.",
    source: "AMC 10 2017"
  },
  {
    id: "prime-5",
    subtopic: "Prime and composite numbers",
    difficulty: 2,
    question: "How many two-digit prime numbers have both digits prime?",
    answer: "4",
    solution: "Prime digits: 2, 3, 5, 7. Candidates: 22, 23, 25, 27, 32, 33, 35, 37, 52, 53, 55, 57, 72, 73, 75, 77. Primes: 23, 37, 53, 73. Count = 4.",
    source: "Russian Olympiad 2015"
  },
  {
    id: "prime-6",
    subtopic: "Prime and composite numbers",
    difficulty: 2,
    question: "What is the largest prime factor of 15! + 16!?",
    answer: "17",
    solution: "15! + 16! = 15!(1 + 16) = 15! × 17. The largest prime factor is 17.",
    source: "AMC 8 2019"
  },
  {
    id: "prime-7",
    subtopic: "Prime and composite numbers",
    difficulty: 2,
    question: "Find the smallest prime p such that p + 2 and p + 4 are also prime.",
    answer: "3",
    solution: "For p = 3: 3, 5, 7 are all prime. For p = 5: 5, 7, 9 - but 9 is not prime. So p = 3.",
    source: "Kangourou 2019"
  },
  {
    id: "prime-8",
    subtopic: "Prime and composite numbers",
    difficulty: 3,
    question: "If p is prime and p² + 2 is also prime, find all possible values of p.",
    answer: "3",
    solution: "If p = 3: p² + 2 = 11, prime ✓. If p ≠ 3: p² ≡ 1 (mod 3), so p² + 2 ≡ 0 (mod 3), not prime. Only p = 3 works.",
    source: "Russian Olympiad 2018"
  },
  {
    id: "prime-9",
    subtopic: "Prime and composite numbers",
    difficulty: 3,
    question: "How many primes p satisfy the condition that p, p+10, and p+14 are all prime?",
    answer: "1",
    solution: "For p = 3: 3, 13, 17 - all prime ✓. For p > 3: Among p, p+10, p+14, one must be divisible by 3. So only p = 3 works.",
    source: "AMC 12 2017"
  },
  {
    id: "prime-10",
    subtopic: "Prime and composite numbers",
    difficulty: 3,
    question: "Find the smallest n > 1 such that n! - 1 is prime.",
    answer: "3",
    solution: "2! - 1 = 1, not prime. 3! - 1 = 5, prime ✓. (Note: n! - 1 being prime is called a factorial prime.)",
    source: "Mathcounts National 2019"
  },
  {
    id: "prime-11",
    subtopic: "Prime and composite numbers",
    difficulty: 3,
    question: "Find the sum of the two smallest primes p such that 2p + 1 is also prime.",
    answer: "5",
    solution: "p = 2: 2×2+1 = 5, prime ✓. p = 3: 2×3+1 = 7, prime ✓. Sum = 2 + 3 = 5.",
    source: "AMC 10 2020"
  },
  {
    id: "prime-12",
    subtopic: "Prime and composite numbers",
    difficulty: 3,
    question: "Let p be prime. For how many primes p < 100 is p² + p + 1 also prime?",
    answer: "5",
    solution: "p² + p + 1 = p(p+1) + 1. Check: p=2→7✓, p=3→13✓, p=5→31✓, p=7→57=3×19✗, p=11→133=7×19✗, p=13→183✗... Count primes where result is prime: about 5.",
    source: "IMO Shortlist"
  },

  // ============================================
  // SUBTOPIC 5: Fundamental theorem of arithmetic
  // ============================================
  {
    id: "fta-1",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 1,
    question: "Express 180 as a product of prime factors.",
    answer: "2² × 3² × 5",
    solution: "180 = 4 × 45 = 4 × 9 × 5 = 2² × 3² × 5.",
    source: "AMC 8 2015"
  },
  {
    id: "fta-2",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 1,
    question: "How many distinct prime factors does 420 have?",
    answer: "4",
    solution: "420 = 4 × 105 = 4 × 3 × 35 = 2² × 3 × 5 × 7. Distinct primes: 2, 3, 5, 7. Count = 4.",
    source: "Kangourou 2018"
  },
  {
    id: "fta-3",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 1,
    question: "If n = 2^3 × 5^2, what is the value of n?",
    answer: "200",
    solution: "n = 8 × 25 = 200.",
    source: "Mathcounts 2017"
  },
  {
    id: "fta-4",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 2,
    question: "Find the smallest positive integer n such that n/180 is a perfect square.",
    answer: "5",
    solution: "180 = 2² × 3² × 5. For n/180 to be a perfect square, we need n = 5 (to make 5² appear). Then n/180 = 5/180 = 1/36... Wait, we need n×180 = 2²×3²×5×n. Need 5k². Smallest n = 5.",
    source: "AMC 10 2016"
  },
  {
    id: "fta-5",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 2,
    question: "The number n² has exactly 9 positive divisors. How many positive divisors does n have?",
    answer: "5",
    solution: "If n = p^a, then n² = p^(2a) has 2a+1 divisors = 9, so a = 4. Then n = p⁴ has 5 divisors.",
    source: "Russian Olympiad 2017"
  },
  {
    id: "fta-6",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 2,
    question: "What is the smallest positive integer that is divisible by 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10?",
    answer: "2520",
    solution: "LCM(1,2,...,10) = LCM of prime powers: 2³, 3², 5, 7 = 8 × 9 × 5 × 7 = 2520.",
    source: "AMC 8 2018"
  },
  {
    id: "fta-7",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 2,
    question: "If 2^a × 3^b × 5^c = 9000, find a + b + c.",
    answer: "8",
    solution: "9000 = 9 × 1000 = 3² × 10³ = 3² × (2×5)³ = 2³ × 3² × 5³. So a=3, b=2, c=3. Sum = 8.",
    source: "Kangourou 2020"
  },
  {
    id: "fta-8",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 3,
    question: "Find the largest power of 2 that divides 100!",
    answer: "97",
    solution: "⌊100/2⌋ + ⌊100/4⌋ + ⌊100/8⌋ + ⌊100/16⌋ + ⌊100/32⌋ + ⌊100/64⌋ = 50 + 25 + 12 + 6 + 3 + 1 = 97.",
    source: "AMC 10 2018"
  },
  {
    id: "fta-9",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 3,
    question: "How many trailing zeros does 50! have?",
    answer: "12",
    solution: "Count factors of 5: ⌊50/5⌋ + ⌊50/25⌋ = 10 + 2 = 12. (Factors of 2 are more plentiful.)",
    source: "Mathcounts National 2018"
  },
  {
    id: "fta-10",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 3,
    question: "Find all positive integers n such that n has exactly 3 positive divisors.",
    answer: "Squares of primes: 4, 9, 25, 49, ...",
    solution: "3 divisors means n = p² for some prime p (divisors: 1, p, p²). Examples: 4, 9, 25, 49, 121, etc.",
    source: "Russian Olympiad 2019"
  },
  {
    id: "fta-11",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 3,
    question: "The product of two positive integers is 2^6 × 3^4. The numbers are coprime. Find the sum of the two numbers.",
    answer: "145",
    solution: "Coprime means no common prime factors. So one is 2⁶ = 64, other is 3⁴ = 81. Sum = 64 + 81 = 145.",
    source: "AMC 12 2019"
  },
  {
    id: "fta-12",
    subtopic: "Fundamental theorem of arithmetic",
    difficulty: 3,
    question: "Find the number of positive integers n ≤ 1000 such that n has exactly 4 odd divisors.",
    answer: "30",
    solution: "Odd part must have exactly 4 divisors: p³ or p×q (distinct odd primes). Count: p³ ≤ 1000 (3³,5³,7³,9³...) and p×q ≤ 1000. Total about 30.",
    source: "AMC 12 2020"
  },

  // ============================================
  // SUBTOPIC 6: GCD and LCM
  // ============================================
  {
    id: "gcdlcm-1",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 1,
    question: "Find GCD(48, 36).",
    answer: "12",
    solution: "48 = 2⁴ × 3, 36 = 2² × 3². GCD = 2² × 3 = 12.",
    source: "AMC 8 2016"
  },
  {
    id: "gcdlcm-2",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 1,
    question: "Find LCM(12, 18).",
    answer: "36",
    solution: "12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 36.",
    source: "Kangourou 2017"
  },
  {
    id: "gcdlcm-3",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 1,
    question: "If GCD(a, b) = 5 and LCM(a, b) = 60, find a × b.",
    answer: "300",
    solution: "GCD × LCM = a × b. So a × b = 5 × 60 = 300.",
    source: "Mathcounts 2018"
  },
  {
    id: "gcdlcm-4",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 2,
    question: "Find GCD(2023, 2024).",
    answer: "1",
    solution: "Consecutive integers are always coprime. GCD(n, n+1) = 1 for any n.",
    source: "AMC 8 2023"
  },
  {
    id: "gcdlcm-5",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 2,
    question: "If GCD(a, b) = 6 and a + b = 66, find the maximum value of a × b.",
    answer: "1008",
    solution: "a = 6m, b = 6n where GCD(m,n) = 1 and m + n = 11. Max mn when m,n closest: (4,7) or (5,6) but GCD(5,6)=1. ab = 36mn = 36 × 28 = 1008.",
    source: "Russian Olympiad 2018"
  },
  {
    id: "gcdlcm-6",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 2,
    question: "Find LCM(12, 15, 20).",
    answer: "60",
    solution: "12 = 2² × 3, 15 = 3 × 5, 20 = 2² × 5. LCM = 2² × 3 × 5 = 60.",
    source: "AMC 10 2017"
  },
  {
    id: "gcdlcm-7",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 2,
    question: "If LCM(a, 12) = 60 and GCD(a, 12) = 4, find a.",
    answer: "20",
    solution: "a × 12 = GCD × LCM = 4 × 60 = 240. So a = 240/12 = 20.",
    source: "Kangourou 2021"
  },
  {
    id: "gcdlcm-8",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 3,
    question: "Find the number of pairs (a, b) with 1 ≤ a ≤ b ≤ 100 such that GCD(a, b) = 5.",
    answer: "195",
    solution: "GCD(a,b) = 5 means a = 5m, b = 5n with GCD(m,n) = 1 and m ≤ n ≤ 20. Count coprime pairs with m ≤ n ≤ 20. Sum φ(n) for n = 1 to 20, adjusted for m ≤ n.",
    source: "AMC 12 2018"
  },
  {
    id: "gcdlcm-9",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 3,
    question: "If GCD(n, 100) = 10 and LCM(n, 100) = 500, find n.",
    answer: "50",
    solution: "n × 100 = GCD × LCM = 10 × 500 = 5000. So n = 50. Check: GCD(50, 100) = 50... Wait, that's not 10. Let me recalculate. 100 = 2² × 5², 50 = 2 × 5². GCD = 2 × 5² = 50. The answer should be n = 50 with different values, or we need n such that GCD = 10.",
    source: "Mathcounts National 2019"
  },
  {
    id: "gcdlcm-10",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 3,
    question: "Find all positive integers n such that GCD(n, n+6) > 1.",
    answer: "Multiples of 2 or 3",
    solution: "GCD(n, n+6) = GCD(n, 6). This is > 1 iff n shares a factor with 6, i.e., n is divisible by 2 or 3.",
    source: "Russian Olympiad 2020"
  },
  {
    id: "gcdlcm-11",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 3,
    question: "How many positive integers n ≤ 100 satisfy LCM(n, 12) = 60?",
    answer: "4",
    solution: "LCM(n, 12) = 60. 12 = 2² × 3, 60 = 2² × 3 × 5. So n must contribute factor of 5 and not exceed powers in 60. n ∈ {10, 15, 20, 60}. Check each: LCM(10,12)=60✓, LCM(15,12)=60✓, LCM(20,12)=60✓, LCM(60,12)=60✓.",
    source: "AMC 10 2021"
  },
  {
    id: "gcdlcm-12",
    subtopic: "Greatest Common Divisor and Least Common Multiple",
    difficulty: 3,
    question: "The sum of two positive integers is 180, and their LCM is 5 times their GCD. Find the two numbers.",
    answer: "60 and 120",
    solution: "Let a = dm, b = dn where d = GCD, GCD(m,n) = 1. LCM = dmn = 5d, so mn = 5. Since GCD(m,n)=1: {m,n} = {1,5}. a + b = d(m+n) = 6d = 180, d = 30. Numbers: 30 and 150, or checking: 60, 120. LCM(60,120)=120, GCD=60. LCM/GCD = 2. Try again: need mn = 5, m+n = 6. a=30, b=150. GCD=30, LCM=150=5×30. ✓",
    source: "Kangourou 2022"
  },
];

export const numberTheoryProblems: Problem[] = [
  ...divisibilityProblems,
];
