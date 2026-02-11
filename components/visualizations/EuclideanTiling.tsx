"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface TilingStep {
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
}

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F0B27A", "#82E0AA",
];

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function computeSteps(width: number, height: number): TilingStep[] {
  const steps: TilingStep[] = [];
  let x = 0, y = 0, w = width, h = height;
  let colorIdx = 0;
  let horizontal = true;

  while (w > 0 && h > 0) {
    if (w >= h) {
      const count = Math.floor(w / h);
      for (let i = 0; i < count; i++) {
        steps.push({
          x: x + i * h,
          y,
          size: h,
          color: COLORS[colorIdx % COLORS.length],
          label: `${h}×${h}`,
        });
      }
      x += count * h;
      w -= count * h;
      colorIdx++;
    } else {
      const count = Math.floor(h / w);
      for (let i = 0; i < count; i++) {
        steps.push({
          x,
          y: y + i * w,
          size: w,
          color: COLORS[colorIdx % COLORS.length],
          label: `${w}×${w}`,
        });
      }
      y += count * w;
      h -= count * w;
      colorIdx++;
    }
  }

  return steps;
}

export default function EuclideanTiling({ onBack }: { onBack: () => void }) {
  const [inputA, setInputA] = useState("30");
  const [inputB, setInputB] = useState("12");
  const [a, setA] = useState(30);
  const [b, setB] = useState(12);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [askSize, setAskSize] = useState<{ w: number; h: number; step: number } | null>(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const steps = computeSteps(a, b);
  const result = gcd(a, b);

  const applyNumbers = () => {
    const na = Math.min(Math.max(parseInt(inputA) || 2, 2), 200);
    const nb = Math.min(Math.max(parseInt(inputB) || 2, 2), 200);
    setA(na);
    setB(nb);
    setVisibleSteps(0);
    setIsAnimating(false);
    setAskSize(null);
    setQuizAnswer("");
    setQuizFeedback(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Interactive step-by-step with quiz
  const nextStepWithQuiz = useCallback(() => {
    if (visibleSteps >= steps.length) return;

    // Determine the current rectangle dimensions at this step
    let w = a, h = b, sx = 0, sy = 0;
    let consumed = 0;
    let cw = a, ch = b;
    
    // Simulate steps to find current rectangle
    for (let i = 0; i < visibleSteps; i++) {
      const step = steps[i];
      consumed++;
    }

    // Find what the next square size should be
    const nextStep = steps[visibleSteps];
    
    // Ask the student: what's the biggest square that fits?
    // Calculate the remaining rectangle at this point
    let remW = a, remH = b;
    let cx = 0, cy = 0;
    
    // Replay to find remaining dimensions
    let tempSteps = computeSteps(a, b);
    // Group by color to find remaining rectangle after current visible steps
    let processedSquares = 0;
    let lastRemW = a, lastRemH = b;
    
    // Simple approach: the next step's size IS the answer
    setAskSize({ w: remW, h: remH, step: visibleSteps });
    setQuizAnswer("");
    setQuizFeedback(null);
  }, [visibleSteps, steps, a, b]);

  const checkQuizAnswer = () => {
    const nextStep = steps[visibleSteps];
    const correctSize = nextStep.size;
    const userVal = parseInt(quizAnswer);

    if (userVal === correctSize) {
      setQuizFeedback("✅ Correct! That's the largest square that fits!");
      setTimeout(() => {
        setVisibleSteps((v) => v + 1);
        setAskSize(null);
        setQuizFeedback(null);
        setQuizAnswer("");
      }, 1000);
    } else {
      setQuizFeedback(`❌ Not quite. Think about the shorter side of the remaining rectangle.`);
    }
  };

  const autoAnimate = useCallback(() => {
    setVisibleSteps(0);
    setIsAnimating(true);
    setAskSize(null);
    
    let step = 0;
    const animate = () => {
      step++;
      setVisibleSteps(step);
      if (step < steps.length) {
        timerRef.current = setTimeout(animate, 600);
      } else {
        setIsAnimating(false);
      }
    };
    timerRef.current = setTimeout(animate, 400);
  }, [steps.length]);

  const showAll = () => {
    setVisibleSteps(steps.length);
    setIsAnimating(false);
    setAskSize(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Calculate scale
  const maxDisplayW = 520;
  const maxDisplayH = 360;
  const scale = Math.min(maxDisplayW / a, maxDisplayH / b);

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
          🟧 Euclid&apos;s Algorithm — Rectangle Tiling
        </h3>
      </div>

      <p className="text-gray-300 text-sm">
        Cut the largest possible square from a rectangle, repeat with the remainder.
        The side of the <strong className="text-yellow-400">last square</strong> = GCD!
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Width:</label>
          <input
            type="number"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            className="w-20 px-2 py-1 bg-black/60 border border-cyan-500/50 rounded text-white text-center"
            min={2}
            max={200}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Height:</label>
          <input
            type="number"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            className="w-20 px-2 py-1 bg-black/60 border border-cyan-500/50 rounded text-white text-center"
            min={2}
            max={200}
          />
        </div>
        <button
          onClick={applyNumbers}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm font-bold"
        >
          Apply
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={autoAnimate}
          disabled={isAnimating}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white text-sm font-bold"
        >
          ▶ Auto Animate
        </button>
        <button
          onClick={nextStepWithQuiz}
          disabled={isAnimating || visibleSteps >= steps.length}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white text-sm font-bold"
        >
          Step by Step (Quiz)
        </button>
        <button
          onClick={showAll}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-bold"
        >
          Show All
        </button>
      </div>

      {/* Quiz prompt */}
      {askSize && visibleSteps < steps.length && (
        <div className="bg-yellow-500/10 border-2 border-yellow-500/40 rounded-lg p-4">
          <p className="text-yellow-300 font-bold mb-2">
            🤔 What is the side length of the largest square you can cut next?
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkQuizAnswer()}
              placeholder="Side length..."
              className="w-32 px-3 py-2 bg-black/60 border border-yellow-500/50 rounded text-white"
            />
            <button
              onClick={checkQuizAnswer}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-bold text-sm"
            >
              Check
            </button>
          </div>
          {quizFeedback && (
            <p className={`mt-2 text-sm ${quizFeedback.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
              {quizFeedback}
            </p>
          )}
        </div>
      )}

      {/* Visualization */}
      <div
        ref={canvasRef}
        className="relative bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4 overflow-hidden"
        style={{ minHeight: b * scale + 40 }}
      >
        {/* Rectangle outline */}
        <div
          className="relative border-2 border-white/30"
          style={{ width: a * scale, height: b * scale }}
        >
          {steps.slice(0, visibleSteps).map((step, i) => (
            <div
              key={i}
              className="absolute border border-black/40 flex items-center justify-center transition-all duration-500"
              style={{
                left: step.x * scale,
                top: step.y * scale,
                width: step.size * scale,
                height: step.size * scale,
                backgroundColor: step.color + "CC",
                animation: `fadeInScale 0.4s ease-out`,
              }}
            >
              {step.size * scale > 35 && (
                <span className="text-black font-bold text-xs drop-shadow-sm">
                  {step.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Dimension labels */}
        <div
          className="absolute text-cyan-400 text-xs font-bold"
          style={{ top: b * scale + 20, left: (a * scale) / 2 - 10 }}
        >
          {a}
        </div>
        <div
          className="absolute text-cyan-400 text-xs font-bold"
          style={{ top: (b * scale) / 2 - 8, left: a * scale + 10 }}
        >
          {b}
        </div>
      </div>

      {/* Result */}
      {visibleSteps === steps.length && steps.length > 0 && (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-green-400 text-lg font-bold">
            🎉 GCD({a}, {b}) = {result}
          </p>
          <p className="text-gray-300 text-sm mt-1">
            The last square has side <strong className="text-yellow-400">{result}</strong> —
            that&apos;s the Greatest Common Divisor!
          </p>
        </div>
      )}

      {/* Algorithm trace */}
      {visibleSteps > 0 && (
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-gray-400 text-xs font-bold mb-1">Algorithm trace:</p>
          <div className="text-gray-300 text-xs space-y-0.5">
            {(() => {
              const trace: string[] = [];
              let ta = a, tb = b;
              while (tb !== 0) {
                const q = Math.floor(ta / tb);
                const r = ta % tb;
                trace.push(`${ta} = ${q} × ${tb} + ${r}`);
                [ta, tb] = [tb, r];
              }
              trace.push(`→ GCD = ${ta}`);
              return trace.map((line, i) => (
                <div key={i} className={i === trace.length - 1 ? "text-yellow-400 font-bold" : ""}>
                  {line}
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
