"use client";

import { useState, useRef, useEffect, useCallback } from "react";

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

interface Tooth {
  angle: number;
  marked: boolean;
}

function generateTeeth(count: number, markedIndex: number): Tooth[] {
  return Array.from({ length: count }, (_, i) => ({
    angle: (i * 360) / count,
    marked: i === markedIndex,
  }));
}

export default function GearSync({ onBack }: { onBack: () => void }) {
  const [teethA, setTeethA] = useState(12);
  const [teethB, setTeethB] = useState(18);
  const [inputA, setInputA] = useState("12");
  const [inputB, setInputB] = useState("18");
  const [rotationStep, setRotationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalLCM = lcm(teethA, teethB);
  const totalSteps = totalLCM; // each step = 1 tooth engagement
  const rotationsA = totalLCM / teethA;
  const rotationsB = totalLCM / teethB;

  // Angles per step
  const anglePerStepA = 360 / teethA;
  const anglePerStepB = 360 / teethB;

  const currentAngleA = rotationStep * anglePerStepA;
  const currentAngleB = -(rotationStep * anglePerStepB); // opposite direction

  const isSynced = rotationStep > 0 && rotationStep % totalSteps === 0;

  const applyNumbers = () => {
    const na = Math.min(Math.max(parseInt(inputA) || 4, 4), 40);
    const nb = Math.min(Math.max(parseInt(inputB) || 4, 4), 40);
    setTeethA(na);
    setTeethB(nb);
    setRotationStep(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const stepForward = useCallback(() => {
    setRotationStep((s) => {
      if (s >= totalSteps) return s;
      return s + 1;
    });
  }, [totalSteps]);

  const play = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    
    if (rotationStep >= totalSteps) {
      setRotationStep(0);
    }
    
    setIsPlaying(true);
    timerRef.current = setInterval(() => {
      setRotationStep((s) => {
        if (s >= totalSteps) {
          setIsPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return s;
        }
        return s + 1;
      });
    }, 300 / speed);
  }, [isPlaying, rotationStep, totalSteps, speed]);

  const reset = () => {
    setRotationStep(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Restart interval when speed changes during playback
  useEffect(() => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRotationStep((s) => {
          if (s >= totalSteps) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return s;
          }
          return s + 1;
        });
      }, 300 / speed);
    }
  }, [speed, isPlaying, totalSteps]);

  const renderGear = (
    cx: number,
    cy: number,
    radius: number,
    teeth: number,
    rotation: number,
    color: string,
    label: string
  ) => {
    const toothHeight = 10;
    const innerR = radius - 5;
    const outerR = radius + toothHeight;

    // Generate gear path
    const points: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = ((i * 360) / teeth + rotation) * (Math.PI / 180);
      const a2 = (((i + 0.3) * 360) / teeth + rotation) * (Math.PI / 180);
      const a3 = (((i + 0.5) * 360) / teeth + rotation) * (Math.PI / 180);
      const a4 = (((i + 0.7) * 360) / teeth + rotation) * (Math.PI / 180);
      const a5 = (((i + 1) * 360) / teeth + rotation) * (Math.PI / 180);

      points.push(`${cx + innerR * Math.cos(a1)},${cy + innerR * Math.sin(a1)}`);
      points.push(`${cx + outerR * Math.cos(a2)},${cy + outerR * Math.sin(a2)}`);
      points.push(`${cx + outerR * Math.cos(a3)},${cy + outerR * Math.sin(a3)}`);
      points.push(`${cx + outerR * Math.cos(a4)},${cy + outerR * Math.sin(a4)}`);
      points.push(`${cx + innerR * Math.cos(a5)},${cy + innerR * Math.sin(a5)}`);
    }

    // Marked tooth position (tooth 0)
    const markedAngle = (rotation * Math.PI) / 180;
    const markedX = cx + (outerR + 8) * Math.cos(markedAngle);
    const markedY = cy + (outerR + 8) * Math.sin(markedAngle);

    return (
      <g>
        <polygon
          points={points.join(" ")}
          fill={color}
          stroke={color.replace("CC", "FF")}
          strokeWidth="1.5"
          opacity="0.85"
        />
        <circle cx={cx} cy={cy} r={innerR * 0.4} fill="#1a1e3f" stroke={color} strokeWidth="2" />
        {/* Marked tooth indicator */}
        <circle
          cx={markedX}
          cy={markedY}
          r={6}
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        {/* Label */}
        <text x={cx} y={cy + 2} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          {label}
        </text>
      </g>
    );
  };

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
        <h3 className="text-xl font-bold text-white">⚙️ Gear Synchronization — LCM</h3>
      </div>

      <p className="text-gray-300 text-sm">
        Two gears mesh together. The <strong className="text-yellow-400">marked teeth</strong> (gold dots) start
        aligned. After how many teeth engagements do they meet again? That&apos;s the <strong className="text-cyan-400">LCM</strong>!
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Gear A teeth:</label>
          <input
            type="number"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            className="w-16 px-2 py-1 bg-black/60 border border-cyan-500/50 rounded text-white text-center text-sm"
            min={4}
            max={40}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Gear B teeth:</label>
          <input
            type="number"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            className="w-16 px-2 py-1 bg-black/60 border border-cyan-500/50 rounded text-white text-center text-sm"
            min={4}
            max={40}
          />
        </div>
        <button
          onClick={applyNumbers}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm font-bold"
        >
          Apply
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={play}
          className={`px-4 py-2 ${isPlaying ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700"} rounded-lg text-white text-sm font-bold`}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={stepForward}
          disabled={isPlaying || rotationStep >= totalSteps}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg text-white text-sm font-bold"
        >
          Step +1
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-bold"
        >
          Reset
        </button>
        <div className="flex items-center gap-2 ml-2">
          <label className="text-gray-400 text-xs">Speed:</label>
          <input
            type="range"
            min={0.5}
            max={4}
            step={0.5}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-20"
          />
          <span className="text-gray-300 text-xs">{speed}x</span>
        </div>
      </div>

      {/* SVG Visualization */}
      <div className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-2 flex justify-center">
        <svg width="460" height="260" viewBox="0 0 460 260">
          {/* Gear A */}
          {renderGear(140, 130, 60, teethA, currentAngleA, "#4ECDC4CC", `${teethA}T`)}
          {/* Gear B */}
          {renderGear(310, 130, 70, teethB, currentAngleB, "#FF6B6BCC", `${teethB}T`)}
          
          {/* Mesh point indicator */}
          <line x1="210" y1="130" x2="240" y2="130" stroke="#FFD700" strokeWidth="2" strokeDasharray="4,4" />
        </svg>
      </div>

      {/* Counter */}
      <div className="bg-black/30 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Teeth engaged:</span>{" "}
            <span className="text-cyan-400 font-bold">{rotationStep} / {totalSteps}</span>
          </div>
          <div>
            <span className="text-gray-400">LCM({teethA}, {teethB}):</span>{" "}
            <span className="text-yellow-400 font-bold">{totalLCM}</span>
          </div>
          <div>
            <span className="text-teal-400">Gear A rotations:</span>{" "}
            <span className="text-white font-bold">{(rotationStep / teethA).toFixed(1)} / {rotationsA}</span>
          </div>
          <div>
            <span className="text-red-400">Gear B rotations:</span>{" "}
            <span className="text-white font-bold">{(rotationStep / teethB).toFixed(1)} / {rotationsB}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 bg-black/40 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-yellow-500 transition-all duration-200 rounded-full"
            style={{ width: `${(rotationStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Sync celebration */}
      {isSynced && (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-green-400 text-lg font-bold">
            🎉 Marked teeth met again!
          </p>
          <p className="text-gray-300 text-sm mt-1">
            After <strong className="text-yellow-400">{totalLCM}</strong> tooth engagements,
            Gear A made <strong className="text-teal-400">{rotationsA}</strong> full rotations and
            Gear B made <strong className="text-red-400">{rotationsB}</strong>.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            LCM({teethA}, {teethB}) = {totalLCM} &nbsp;|&nbsp; GCD({teethA}, {teethB}) = {gcd(teethA, teethB)}
          </p>
        </div>
      )}
    </div>
  );
}
