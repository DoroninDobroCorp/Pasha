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

export function generateGeometryProblem(subtopic: string, difficulty: 'easy' | 'medium' | 'hard'): Problem {
  const problems: Record<string, () => Problem> = {
    'Sum of angles of a triangle, quadrilateral, pentagon, n-gon': () => {
      const shapes = [
        { name: 'triangle', sides: 3, sum: 180 },
        { name: 'quadrilateral', sides: 4, sum: 360 },
        { name: 'pentagon', sides: 5, sum: 540 },
        { name: 'hexagon', sides: 6, sum: 720 }
      ];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      return {
        id: `geo-angles-${Date.now()}`,
        topicId: 'geo-1',
        difficulty,
        question: `What is the sum of interior angles of a ${shape.name}?`,
        answer: shape.sum.toString(),
        hints: [
          `Use the formula: (n - 2) × 180°`,
          `For a ${shape.name}, n = ${shape.sides}`
        ],
        explanation: `Sum = (${shape.sides} - 2) × 180° = ${shape.sum}°`,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
      };
    },
    'Properties of isosceles triangles. The median, altitude, and angle bisector drawn from the vertex opposite the base coincide.': () => {
      const baseAngle = Math.floor(Math.random() * 40) + 30;
      const vertexAngle = 180 - 2 * baseAngle;
      
      return {
        id: `geo-isosceles-${Date.now()}`,
        topicId: 'geo-2',
        difficulty,
        question: `In an isosceles triangle, the base angles are ${baseAngle}°. What is the vertex angle?`,
        answer: vertexAngle.toString(),
        hints: [
          'In an isosceles triangle, base angles are equal',
          'Sum of all angles in a triangle is 180°'
        ],
        explanation: `Vertex angle = 180° - 2 × ${baseAngle}° = ${vertexAngle}°`,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
      };
    },
    'Area of a rectangle, right triangle, disc, composite figures': () => {
      const type = Math.floor(Math.random() * 3);
      
      if (type === 0) {
        const width = Math.floor(Math.random() * 10) + 3;
        const height = Math.floor(Math.random() * 10) + 3;
        const area = width * height;
        
        return {
          id: `geo-area-rect-${Date.now()}`,
          topicId: 'geo-3',
          difficulty,
          question: `What is the area of a rectangle with width ${width} and height ${height}?`,
          answer: area.toString(),
          hints: ['Area of rectangle = width × height'],
          explanation: `Area = ${width} × ${height} = ${area}`,
          xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
        };
      } else if (type === 1) {
        const base = Math.floor(Math.random() * 10) + 3;
        const height = Math.floor(Math.random() * 10) + 3;
        const area = (base * height) / 2;
        
        return {
          id: `geo-area-tri-${Date.now()}`,
          topicId: 'geo-3',
          difficulty,
          question: `What is the area of a right triangle with base ${base} and height ${height}?`,
          answer: area.toString(),
          hints: ['Area of triangle = (base × height) / 2'],
          explanation: `Area = (${base} × ${height}) / 2 = ${area}`,
          xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
        };
      } else {
        const radius = Math.floor(Math.random() * 5) + 2;
        const area = Math.round(Math.PI * radius * radius * 100) / 100;
        
        return {
          id: `geo-area-circle-${Date.now()}`,
          topicId: 'geo-3',
          difficulty,
          question: `What is the area of a circle with radius ${radius}? (Use π ≈ 3.14, round to 2 decimals)`,
          answer: area.toString(),
          hints: ['Area of circle = π × r²'],
          explanation: `Area = π × ${radius}² ≈ ${area}`,
          xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
        };
      }
    }
  };

  const generator = problems[subtopic];
  return generator ? generator() : generateDefaultProblem(subtopic, difficulty);
}

export function generateCombinatoricsProblem(subtopic: string, difficulty: 'easy' | 'medium' | 'hard'): Problem {
  const problems: Record<string, () => Problem> = {
    'Rule of sum': () => {
      const a = Math.floor(Math.random() * 20) + 5;
      const b = Math.floor(Math.random() * 20) + 5;
      const answer = a + b;
      
      return {
        id: `comb-sum-${Date.now()}`,
        topicId: 'comb-1',
        difficulty,
        question: `There are ${a} red balls and ${b} blue balls. How many ways can you choose one ball?`,
        answer: answer.toString(),
        hints: [
          'Use the rule of sum: if you can do task A in m ways OR task B in n ways, total is m + n',
          `You can choose red in ${a} ways OR blue in ${b} ways`
        ],
        explanation: `Total ways = ${a} + ${b} = ${answer}`,
        xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
      };
    },
    'Rule of product': () => {
      const shirts = Math.floor(Math.random() * 5) + 3;
      const pants = Math.floor(Math.random() * 5) + 3;
      const answer = shirts * pants;
      
      return {
        id: `comb-prod-${Date.now()}`,
        topicId: 'comb-1',
        difficulty,
        question: `You have ${shirts} shirts and ${pants} pairs of pants. How many different outfits can you make?`,
        answer: answer.toString(),
        hints: [
          'Use the rule of product: if you do task A in m ways AND task B in n ways, total is m × n',
          `Choose shirt in ${shirts} ways AND pants in ${pants} ways`
        ],
        explanation: `Total outfits = ${shirts} × ${pants} = ${answer}`,
        xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
      };
    },
    'Permutations': () => {
      const n = difficulty === 'easy' ? Math.floor(Math.random() * 3) + 3 : Math.floor(Math.random() * 3) + 5;
      const factorial = (num: number): number => num <= 1 ? 1 : num * factorial(num - 1);
      const answer = factorial(n);
      
      return {
        id: `comb-perm-${Date.now()}`,
        topicId: 'comb-2',
        difficulty,
        question: `How many ways can you arrange ${n} different books on a shelf?`,
        answer: answer.toString(),
        hints: [
          `Use permutation formula: n!`,
          `${n}! = ${n} × ${n-1} × ... × 2 × 1`
        ],
        explanation: `${n}! = ${answer}`,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
      };
    },
    'Definition of probability': () => {
      const total = Math.floor(Math.random() * 10) + 10;
      const favorable = Math.floor(Math.random() * (total - 2)) + 1;
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(favorable, total);
      const num = favorable / divisor;
      const den = total / divisor;
      
      return {
        id: `comb-prob-${Date.now()}`,
        topicId: 'comb-3',
        difficulty,
        question: `A bag has ${total} balls, ${favorable} are red. What is the probability of picking a red ball? (Answer as fraction: numerator/denominator)`,
        answer: `${num}/${den}`,
        hints: [
          'Probability = favorable outcomes / total outcomes',
          `Simplify ${favorable}/${total}`
        ],
        explanation: `P = ${favorable}/${total} = ${num}/${den}`,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35
      };
    },
    'Average, median, mode': () => {
      const nums = Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
      const sum = nums.reduce((a, b) => a + b, 0);
      const avg = Math.round(sum / nums.length * 10) / 10;
      const median = nums[2];
      
      const type = Math.floor(Math.random() * 2);
      
      if (type === 0) {
        return {
          id: `comb-avg-${Date.now()}`,
          topicId: 'comb-3',
          difficulty,
          question: `Find the average of: ${nums.join(', ')}`,
          answer: avg.toString(),
          hints: [
            'Average = sum of all numbers / count',
            `Sum = ${sum}, Count = ${nums.length}`
          ],
          explanation: `Average = ${sum} / ${nums.length} = ${avg}`,
          xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
        };
      } else {
        return {
          id: `comb-median-${Date.now()}`,
          topicId: 'comb-3',
          difficulty,
          question: `Find the median of: ${nums.join(', ')}`,
          answer: median.toString(),
          hints: [
            'Median is the middle value when numbers are sorted',
            `Sorted: ${nums.join(', ')}`
          ],
          explanation: `Median = ${median} (middle value)`,
          xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
        };
      }
    }
  };

  const generator = problems[subtopic];
  return generator ? generator() : generateDefaultProblem(subtopic, difficulty);
}
