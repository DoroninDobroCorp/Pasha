export interface Problem {
  id: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string | number;
  hints: string[];
  explanation: string;
  xpReward: number;
}

export function generateNumberTheoryProblem(subtopic: string, difficulty: 'easy' | 'medium' | 'hard'): Problem {
  const problems: Record<string, () => Problem> = {
    'Divisibility and its properties': () => {
      const num = difficulty === 'easy' ? Math.floor(Math.random() * 100) + 10 : Math.floor(Math.random() * 1000) + 100;
      const divisor = difficulty === 'easy' ? [2, 3, 5][Math.floor(Math.random() * 3)] : [7, 11, 13][Math.floor(Math.random() * 3)];
      const isDivisible = num % divisor === 0;
      
      return {
        id: `nt-div-${Date.now()}`,
        topicId: 'nt-1',
        difficulty,
        question: `Is ${num} divisible by ${divisor}?`,
        answer: isDivisible ? 'yes' : 'no',
        hints: [
          `Try dividing ${num} by ${divisor}`,
          `If the remainder is 0, it's divisible`
        ],
        explanation: `${num} ÷ ${divisor} = ${(num / divisor).toFixed(2)}. ${isDivisible ? 'No remainder, so it is divisible.' : 'There is a remainder, so it is not divisible.'}`,
        xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
      };
    },
    'Prime and composite numbers': () => {
      const num = difficulty === 'easy' ? Math.floor(Math.random() * 20) + 2 : Math.floor(Math.random() * 50) + 20;
      const isPrime = checkPrime(num);
      
      return {
        id: `nt-prime-${Date.now()}`,
        topicId: 'nt-2',
        difficulty,
        question: `Is ${num} a prime number?`,
        answer: isPrime ? 'yes' : 'no',
        hints: [
          'A prime number has exactly two divisors: 1 and itself',
          `Check if ${num} is divisible by any number from 2 to ${Math.floor(Math.sqrt(num))}`
        ],
        explanation: isPrime 
          ? `${num} is prime because it has no divisors other than 1 and itself.`
          : `${num} is composite because it has divisors other than 1 and itself.`,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
      };
    }
  };

  const generator = problems[subtopic];
  return generator ? generator() : generateDefaultProblem(subtopic, difficulty);
}

function checkPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function generateDefaultProblem(subtopic: string, difficulty: 'easy' | 'medium' | 'hard'): Problem {
  return {
    id: `default-${Date.now()}`,
    topicId: 'unknown',
    difficulty,
    question: `Practice problem for: ${subtopic}`,
    answer: '42',
    hints: ['This is a placeholder problem'],
    explanation: 'Problem generator coming soon for this topic!',
    xpReward: 10
  };
}

export function generateAlgebraProblem(subtopic: string, difficulty: 'easy' | 'medium' | 'hard'): Problem {
  if (subtopic.includes('Linear equations')) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 20) - 10;
    const c = Math.floor(Math.random() * 20) - 10;
    const x = (c - b) / a;
    
    return {
      id: `alg-eq-${Date.now()}`,
      topicId: 'alg-2',
      difficulty,
      question: `Solve for x: ${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}`,
      answer: x.toString(),
      hints: [
        `First, subtract ${b} from both sides`,
        `Then divide by ${a}`
      ],
      explanation: `${a}x = ${c - b}, so x = ${x}`,
      xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
    };
  }
  
  return generateDefaultProblem(subtopic, difficulty);
}
