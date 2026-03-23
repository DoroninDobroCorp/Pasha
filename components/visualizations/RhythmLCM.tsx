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

// Generate drum sounds using Web Audio API
function playDrum(audioCtx: AudioContext, type: "kick" | "snare", time: number) {
  if (type === "kick") {
    // Deep kick drum
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.15);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.2);
  } else {
    // Snare-like hit (noise burst + tone)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.1);
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.12);

    // Noise component
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = audioCtx.createBufferSource();
    const noiseGain = audioCtx.createGain();
    noise.buffer = buffer;
    noiseGain.gain.setValueAtTime(0.4, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    noise.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start(time);
    noise.stop(time + 0.1);
  }
}

function playCymbal(audioCtx: AudioContext, time: number) {
  // Bright cymbal crash for sync moment
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc1.type = "square";
  osc1.frequency.setValueAtTime(800, time);
  osc2.type = "sawtooth";
  osc2.frequency.setValueAtTime(1200, time);
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);
  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + 0.4);
  osc2.stop(time + 0.4);
}

export default function RhythmLCM({ onBack }: { onBack: () => void }) {
  const [beatA, setBeatA] = useState(3);
  const [beatB, setBeatB] = useState(4);
  const [inputA, setInputA] = useState("3");
  const [inputB, setInputB] = useState("4");
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatRef = useRef(0);
  const currentBeatElementRef = useRef<HTMLDivElement | null>(null);

  const totalLCM = lcm(beatA, beatB);

  const applyNumbers = () => {
    stop();
    const na = Math.min(Math.max(parseInt(inputA) || 2, 2), 12);
    const nb = Math.min(Math.max(parseInt(inputB) || 2, 2), 12);
    setBeatA(na);
    setBeatB(nb);
    setCurrentBeat(0);
    beatRef.current = 0;
  };

  const getOrCreateAudioCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(0);
    beatRef.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (isPlaying) {
      stop();
      return;
    }

    const ctx = getOrCreateAudioCtx();
    setIsPlaying(true);
    beatRef.current = 0;
    setCurrentBeat(0);

    const interval = (60 / bpm) * 1000; // ms per beat

    timerRef.current = setInterval(() => {
      beatRef.current++;
      const beat = beatRef.current;
      setCurrentBeat(beat);

      // Loop infinitely - reset visual after completing one LCM cycle (beats 1 to totalLCM)
      const visualBeat = ((beat - 1) % totalLCM) + 1;

      const now = ctx.currentTime;
      const isA = visualBeat % beatA === 0;
      const isB = visualBeat % beatB === 0;
      const isBoth = isA && isB;

      if (isBoth) {
        playCymbal(ctx, now);
      } else {
        if (isA) playDrum(ctx, "kick", now);
        if (isB) playDrum(ctx, "snare", now);
      }
    }, interval);
  }, [isPlaying, bpm, beatA, beatB, totalLCM, getOrCreateAudioCtx, stop]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Auto-scroll to current beat
  useEffect(() => {
    if (isPlaying && currentBeatElementRef.current) {
      currentBeatElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentBeat, isPlaying]);

  // Generate timeline cells - show current position in the cycle (1 to totalLCM, no zero)
  const visualBeat = currentBeat > 0 ? ((currentBeat - 1) % totalLCM) + 1 : 0;
  const timelineCells = Array.from({ length: totalLCM }, (_, i) => {
    const beat = i + 1; // Start from 1
    const isA = beat % beatA === 0;
    const isB = beat % beatB === 0;
    const isBoth = isA && isB;
    const isCurrent = beat === visualBeat;
    return { beat, isA, isB, isBoth, isCurrent };
  });

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
          🥁 Rhythm LCM — Hear the Math!
        </h3>
      </div>

      <p className="text-gray-300 text-sm">
        Drum A beats every <strong className="text-teal-400">{beatA}</strong> seconds,
        Drum B every <strong className="text-red-400">{beatB}</strong> seconds.
        They start together — when do they <strong className="text-yellow-400">sync again</strong>?
        That&apos;s LCM({beatA}, {beatB}) = <strong className="text-yellow-400">{totalLCM}</strong>!
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Drum A every:</label>
          <input
            type="number"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            className="w-16 px-2 py-1 bg-black/60 border border-teal-500/50 rounded text-white text-center text-sm"
            min={2}
            max={12}
          />
          <span className="text-gray-500 text-sm">sec</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Drum B every:</label>
          <input
            type="number"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            className="w-16 px-2 py-1 bg-black/60 border border-red-500/50 rounded text-white text-center text-sm"
            min={2}
            max={12}
          />
          <span className="text-gray-500 text-sm">sec</span>
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
          {isPlaying ? "⏹ Stop" : "▶ Play Rhythm"}
        </button>
        <div className="flex items-center gap-2 ml-2">
          <label className="text-gray-400 text-xs">BPM:</label>
          <input
            type="range"
            min={60}
            max={200}
            step={10}
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-24"
          />
          <span className="text-gray-300 text-xs w-8">{bpm}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs items-center">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-teal-500" />
          <span className="text-teal-400">Drum A (kick)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-red-400">Drum B (snare)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          <span className="text-yellow-400">Both! (cymbal)</span>
        </div>
        {currentBeat > 0 && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <span className="text-purple-300 font-bold">Cycle:</span>
            <span className="text-purple-100 text-lg font-mono">
              {Math.floor((currentBeat - 1) / totalLCM) + 1}
            </span>
            <span className="text-purple-400 text-xs">
              (beat {visualBeat}/{totalLCM})
            </span>
          </div>
        )}
      </div>

      {/* Timeline visualization */}
      <div className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4 overflow-x-auto">
        {/* Drum A row */}
        <div className="flex items-center gap-0.5 mb-1">
          <span className="text-teal-400 text-xs w-16 shrink-0 font-bold">Drum A</span>
          <div className="flex gap-0.5">
            {timelineCells.map(({ beat, isA, isBoth, isCurrent }) => (
              <div
                key={`a-${beat}`}
                ref={isCurrent ? currentBeatElementRef : null}
                className={`w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all duration-150 ${
                  isCurrent
                    ? isBoth
                      ? "bg-yellow-500 text-black scale-125 shadow-lg shadow-yellow-500/50"
                      : isA
                        ? "bg-teal-500 text-black scale-125 shadow-lg shadow-teal-500/50"
                        : "bg-gray-700 text-gray-500 scale-110"
                    : isA
                      ? isBoth
                        ? "bg-yellow-500/40 text-yellow-300 border border-yellow-500/50"
                        : "bg-teal-500/30 text-teal-300 border border-teal-500/30"
                      : "bg-gray-800/50 text-gray-600"
                }`}
              >
                {isA ? "🥁" : beat}
              </div>
            ))}
          </div>
        </div>

        {/* Drum B row */}
        <div className="flex items-center gap-0.5 mb-1">
          <span className="text-red-400 text-xs w-16 shrink-0 font-bold">Drum B</span>
          <div className="flex gap-0.5">
            {timelineCells.map(({ beat, isB, isBoth, isCurrent }) => (
              <div
                key={`b-${beat}`}
                className={`w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all duration-150 ${
                  isCurrent
                    ? isBoth
                      ? "bg-yellow-500 text-black scale-125 shadow-lg shadow-yellow-500/50"
                      : isB
                        ? "bg-red-500 text-black scale-125 shadow-lg shadow-red-500/50"
                        : "bg-gray-700 text-gray-500 scale-110"
                    : isB
                      ? isBoth
                        ? "bg-yellow-500/40 text-yellow-300 border border-yellow-500/50"
                        : "bg-red-500/30 text-red-300 border border-red-500/30"
                      : "bg-gray-800/50 text-gray-600"
                }`}
              >
                {isB ? "🪘" : beat}
              </div>
            ))}
          </div>
        </div>

        {/* Beat numbers */}
        <div className="flex items-center gap-0.5">
          <span className="text-gray-500 text-xs w-16 shrink-0">Beat</span>
          <div className="flex gap-0.5">
            {timelineCells.map(({ beat, isBoth }) => (
              <div
                key={`n-${beat}`}
                className={`w-7 h-4 flex items-center justify-center text-[9px] ${
                  isBoth ? "text-yellow-400 font-bold" : "text-gray-600"
                }`}
              >
                {beat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-black/30 rounded-lg p-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-400">LCM({beatA}, {beatB}):</span>{" "}
          <span className="text-yellow-400 font-bold">{totalLCM}</span>
        </div>
        <div>
          <span className="text-gray-400">GCD({beatA}, {beatB}):</span>{" "}
          <span className="text-cyan-400 font-bold">{gcd(beatA, beatB)}</span>
        </div>
        <div>
          <span className="text-teal-400">Drum A hits:</span>{" "}
          <span className="text-white font-bold">{Math.floor(totalLCM / beatA) + 1}</span>
        </div>
        <div>
          <span className="text-red-400">Drum B hits:</span>{" "}
          <span className="text-white font-bold">{Math.floor(totalLCM / beatB) + 1}</span>
        </div>
      </div>

      {/* Sync celebration */}
      {currentBeat >= totalLCM && (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-green-400 text-lg font-bold">
            🎵 Both drums sync at beat {totalLCM}! 🎵
          </p>
          <p className="text-gray-300 text-sm mt-1">
            LCM({beatA}, {beatB}) = {totalLCM} — that&apos;s when the rhythms align!
          </p>
        </div>
      )}
    </div>
  );
}
