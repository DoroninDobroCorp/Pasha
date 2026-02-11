"use client";

import { useState } from "react";

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Generate Fibonacci numbers
function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1 || n === 2) return 1;
  let a = 1, b = 1;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

const FIB_CACHE: number[] = [0, 1, 1];
function fib(n: number): number {
  if (n < FIB_CACHE.length) return FIB_CACHE[n];
  for (let i = FIB_CACHE.length; i <= n; i++) {
    FIB_CACHE[i] = FIB_CACHE[i - 1] + FIB_CACHE[i - 2];
  }
  return FIB_CACHE[n];
}

interface ExplorerEntry {
  n: number;
  m: number;
  fn: number;
  fm: number;
  gcdNM: number;
  fGcdNM: number;
  gcdFnFm: number;
  matches: boolean;
}

export default function FibonacciGCD({ onBack }: { onBack: () => void }) {
  const [inputN, setInputN] = useState("6");
  const [inputM, setInputM] = useState("9");
  const [entries, setEntries] = useState<ExplorerEntry[]>([]);
  const [discovered, setDiscovered] = useState(false);
  const [challenge, setChallenge] = useState<{ n: number; m: number; answer: string } | null>(null);
  const [challengeInput, setChallengeInput] = useState("");
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  const explore = () => {
    const n = Math.min(Math.max(parseInt(inputN) || 1, 1), 25);
    const m = Math.min(Math.max(parseInt(inputM) || 1, 1), 25);

    const fn = fib(n);
    const fm = fib(m);
    const gcdNM = gcd(n, m);
    const fGcdNM = fib(gcdNM);
    const gcdFnFm = gcd(fn, fm);

    const entry: ExplorerEntry = {
      n, m, fn, fm, gcdNM, fGcdNM, gcdFnFm,
      matches: fGcdNM === gcdFnFm,
    };

    setEntries((prev) => {
      const exists = prev.some((e) => e.n === n && e.m === m);
      if (exists) return prev;
      const newEntries = [...prev, entry];
      
      // Check if pattern discovered (3+ entries all matching)
      if (newEntries.length >= 3 && newEntries.every((e) => e.matches)) {
        setDiscovered(true);
      }
      return newEntries;
    });
  };

  const generateChallenge = () => {
    const pairs = [
      [10, 15], [8, 12], [7, 14], [9, 12], [6, 15],
      [10, 25], [12, 18], [8, 20], [14, 21], [15, 20],
    ];
    const [n, m] = pairs[Math.floor(Math.random() * pairs.length)];
    const gcdNM = gcd(n, m);
    const answer = fib(gcdNM).toString();
    
    setChallenge({ n, m, answer });
    setChallengeInput("");
    setChallengeFeedback(null);
  };

  const checkChallenge = () => {
    if (!challenge) return;
    if (challengeInput.trim() === challenge.answer) {
      setChallengeFeedback(`✅ Correct! GCD(F_${challenge.n}, F_${challenge.m}) = F_GCD(${challenge.n},${challenge.m}) = F_${gcd(challenge.n, challenge.m)} = ${challenge.answer}`);
    } else {
      setChallengeFeedback(`❌ Not quite. Hint: first find GCD(${challenge.n}, ${challenge.m}), then find that Fibonacci number.`);
    }
  };

  const presetExamples = () => {
    const examples: [number, number][] = [[3, 4], [6, 9], [10, 15], [8, 12], [5, 10]];
    const newEntries: ExplorerEntry[] = examples.map(([n, m]) => {
      const fn = fib(n);
      const fm = fib(m);
      const gcdNM = gcd(n, m);
      const fGcdNM = fib(gcdNM);
      const gcdFnFm = gcd(fn, fm);
      return { n, m, fn, fm, gcdNM, fGcdNM, gcdFnFm, matches: fGcdNM === gcdFnFm };
    });
    setEntries(newEntries);
    setDiscovered(true);
  };

  // Fibonacci sequence display
  const fibSeq = Array.from({ length: 16 }, (_, i) => ({ n: i, val: fib(i) }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm"
        >
          ← Back
        </button>
        <h3 className="text-xl font-bold text-white">
          🌀 Fibonacci × GCD — The Hidden Connection
        </h3>
      </div>

      <p className="text-gray-300 text-sm">
        Explore what happens when you take the GCD of two Fibonacci numbers.
        Can you discover the <strong className="text-yellow-400">secret pattern</strong>?
      </p>

      {/* Fibonacci reference */}
      <div className="bg-black/30 rounded-lg p-3 overflow-x-auto">
        <p className="text-gray-400 text-xs font-bold mb-2">Fibonacci Sequence:</p>
        <div className="flex gap-1 min-w-max">
          {fibSeq.map(({ n, val }) => (
            <div key={n} className="text-center">
              <div className="text-gray-500 text-[10px]">F<sub>{n}</sub></div>
              <div className="px-1.5 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 text-xs font-mono">
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explorer */}
      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="text-white font-bold text-sm mb-3">🔍 Explorer: Pick two indices</h4>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">n =</label>
            <input
              type="number"
              value={inputN}
              onChange={(e) => setInputN(e.target.value)}
              className="w-16 px-2 py-1 bg-black/60 border border-purple-500/50 rounded text-white text-center text-sm"
              min={1}
              max={25}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">m =</label>
            <input
              type="number"
              value={inputM}
              onChange={(e) => setInputM(e.target.value)}
              className="w-16 px-2 py-1 bg-black/60 border border-purple-500/50 rounded text-white text-center text-sm"
              min={1}
              max={25}
            />
          </div>
          <button
            onClick={explore}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-bold"
          >
            Compute
          </button>
          <button
            onClick={presetExamples}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-bold"
          >
            Show 5 Examples
          </button>
        </div>
      </div>

      {/* Results table */}
      {entries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-500/20">
                <th className="px-2 py-1 text-purple-300 text-left">n, m</th>
                <th className="px-2 py-1 text-purple-300">F<sub>n</sub></th>
                <th className="px-2 py-1 text-purple-300">F<sub>m</sub></th>
                <th className="px-2 py-1 text-cyan-300">GCD(F<sub>n</sub>, F<sub>m</sub>)</th>
                <th className="px-2 py-1 text-yellow-300">GCD(n, m)</th>
                <th className="px-2 py-1 text-yellow-300">F<sub>GCD(n,m)</sub></th>
                <th className="px-2 py-1 text-green-300">Match?</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="px-2 py-1 text-gray-300">{e.n}, {e.m}</td>
                  <td className="px-2 py-1 text-purple-300 text-center font-mono">{e.fn}</td>
                  <td className="px-2 py-1 text-purple-300 text-center font-mono">{e.fm}</td>
                  <td className="px-2 py-1 text-cyan-400 text-center font-bold">{e.gcdFnFm}</td>
                  <td className="px-2 py-1 text-yellow-400 text-center">{e.gcdNM}</td>
                  <td className="px-2 py-1 text-yellow-400 text-center font-bold">{e.fGcdNM}</td>
                  <td className="px-2 py-1 text-center">
                    {e.matches ? (
                      <span className="text-green-400 font-bold">✅</span>
                    ) : (
                      <span className="text-red-400 font-bold">❌</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pattern discovery */}
      {discovered && (
        <div className="bg-yellow-500/10 border-2 border-yellow-500/40 rounded-lg p-4">
          <p className="text-yellow-400 text-lg font-bold mb-2">
            🧠 Pattern Discovered!
          </p>
          <div className="bg-black/40 rounded-lg p-3 text-center">
            <p className="text-white text-lg font-bold font-mono">
              GCD(F<sub>n</sub>, F<sub>m</sub>) = F<sub>GCD(n, m)</sub>
            </p>
          </div>
          <p className="text-gray-300 text-sm mt-3">
            This is a remarkable theorem: the GCD of two Fibonacci numbers is itself a Fibonacci number,
            and its index is the GCD of the original indices!
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Example: GCD(F<sub>10</sub>, F<sub>15</sub>) = GCD(55, 610) = 5 = F<sub>5</sub> = F<sub>GCD(10,15)</sub>
          </p>
        </div>
      )}

      {/* Challenge */}
      {discovered && (
        <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-purple-300 font-bold">⚔️ Boss Challenge: Use the theorem!</h4>
            <button
              onClick={generateChallenge}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs font-bold"
            >
              {challenge ? "New Challenge" : "Start Challenge"}
            </button>
          </div>

          {challenge && (
            <div className="space-y-3">
              <p className="text-white font-semibold">
                Find GCD(F<sub>{challenge.n}</sub>, F<sub>{challenge.m}</sub>) using the theorem
                <span className="text-gray-400 text-sm ml-2">
                  (F<sub>{challenge.n}</sub> = {fib(challenge.n)}, F<sub>{challenge.m}</sub> = {fib(challenge.m)})
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkChallenge()}
                  placeholder="Your answer..."
                  className="w-32 px-3 py-2 bg-black/60 border border-purple-500/50 rounded text-white"
                />
                <button
                  onClick={checkChallenge}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold text-sm"
                >
                  Check
                </button>
              </div>
              {challengeFeedback && (
                <p className={`text-sm ${challengeFeedback.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                  {challengeFeedback}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
