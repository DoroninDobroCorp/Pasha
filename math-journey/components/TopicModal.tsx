"use client";

import { useState, useEffect } from "react";
import { Topic } from "@/types";
import { getRandomProblems, Problem as SavedProblem } from "@/data/problems";
import {
  getProgress,
  getSubtopicStars,
  recordProblemSolved,
  getProblemsToday,
} from "@/lib/progress";

interface Problem {
  id: string;
  question: string;
  answer: string;
  hints: string[];
  explanation: string;
  difficulty?: 1 | 2 | 3;
}

interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
}

export default function TopicModal({ topic, onClose }: TopicModalProps) {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [subtopicStars, setSubtopicStars] = useState<Record<string, number>>(
    {},
  );
  const [problemsInSubtopic, setProblemsInSubtopic] = useState(0);

  const loadSubtopicStars = () => {
    const progress = getProgress();
    const stars: Record<string, number> = {};

    topic.subtopics.forEach((subtopicName) => {
      stars[subtopicName] = getSubtopicStars(topic.id, subtopicName, progress);
    });

    setSubtopicStars(stars);
  };

  useEffect(() => {
    loadSubtopicStars();
  }, [topic.id, loadSubtopicStars]);

  const startPractice = () => {
    const subtopic = topic.subtopics[currentSubtopicIndex];
    
    // Get random problems from saved olympiad problems
    const savedProblems = getRandomProblems(subtopic, 1);
    
    if (savedProblems.length > 0) {
      const savedProblem = savedProblems[0];
      // Map saved problem structure to component structure
      const problem: Problem = {
        id: savedProblem.id,
        question: savedProblem.question,
        answer: savedProblem.answer,
        hints: [], // Saved problems don't have hints, but have full solutions
        explanation: savedProblem.solution || "No solution available",
        difficulty: savedProblem.difficulty,
      };
      
      setCurrentProblem(problem);
    } else {
      // Fallback if no problems found
      const problem: Problem = {
        id: "placeholder",
        question: "Practice problems coming soon for this topic!",
        answer: "0",
        hints: [],
        explanation: "More problems will be added soon.",
      };
      setCurrentProblem(problem);
    }
    
    setFeedback(null);
    setUserAnswer("");
    setShowHint(false);
  };

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      if (i < count) {
        // Earned star - bright yellow
        stars.push(
          <span key={i} className="text-yellow-400 text-lg">
            ⭐
          </span>,
        );
      } else {
        // Unearned star - gray and transparent (like in games)
        stars.push(
          <span key={i} className="text-gray-500 opacity-30 text-lg">
            ⭐
          </span>,
        );
      }
    }
    return <span className="inline-flex gap-0.5">{stars}</span>;
  };

  const checkAnswer = () => {
    if (!currentProblem) return;

    const correct =
      userAnswer.toLowerCase().trim() ===
      currentProblem.answer.toString().toLowerCase().trim();

    if (correct) {
      // Record problem solved for streak tracking
      recordProblemSolved();
      
      const problemsToday = getProblemsToday();
      
      setFeedback({
        correct: true,
        message: `✓ Correct! Problems solved today: ${problemsToday}`,
      });
    } else {
      // Wrong answer - allow retry, don't show solution yet
      setFeedback({
        correct: false,
        message: `✗ Not quite. Try again!`,
      });
    }
  };

  // Calculate total stars for this topic
  const totalStars = Object.values(subtopicStars).reduce(
    (sum, stars) => sum + stars,
    0,
  );
  const maxStars = topic.subtopics.length * 3;
  const currentSubtopic = topic.subtopics[currentSubtopicIndex];
  const currentSubtopicStars = subtopicStars[currentSubtopic] || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1e3f] to-[#0a0e27] border-4 border-cyan-500/50 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{topic.title}</h2>
          <p className="text-gray-300">{topic.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm">
              {topic.category.replace("_", " ").toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm">
              {topic.xpReward} XP per problem
            </span>
          </div>
        </div>

        {/* Star Progress */}
        <div className="mb-6 bg-black/40 border-2 border-yellow-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-400 font-bold">Total Progress</span>
            <span className="text-yellow-400 font-bold text-xl">
              ⭐ {totalStars} / {maxStars}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            {totalStars === maxStars && maxStars > 0 && (
              <span className="text-green-400">
                ✓ All subtopics mastered! 🎉
              </span>
            )}
          </div>
        </div>

        {/* Subtopics with selection */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3">
            Select Subtopic to Practice:
          </h3>
          <div className="space-y-2">
            {topic.subtopics.map((subtopic, index) => {
              const stars = subtopicStars[subtopic] || 0;
              const isSelected = index === currentSubtopicIndex;
              const isCompleted = stars === 3;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSubtopicIndex(index);
                    setProblemsInSubtopic(0);
                    setCurrentProblem(null);
                    setFeedback(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-500 text-white"
                      : isCompleted
                        ? "bg-green-500/10 border-green-500/50 text-green-400"
                        : "bg-black/40 border-gray-600 text-gray-300 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1">{subtopic}</span>
                    <span className="ml-2">{renderStars(stars)}</span>
                    {isSelected && !isCompleted && (
                      <span className="text-cyan-400 ml-2">→</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice section */}
        {!currentProblem ? (
          <div className="space-y-4">
            <button
              onClick={startPractice}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {currentSubtopicStars === 3
                ? "Practice Again (3⭐ Earned)"
                : "Start Practice"}
            </button>
            <p className="text-center text-gray-400 text-sm">
              {currentSubtopicStars === 3
                ? "This subtopic is completed! Practice to reinforce or select another."
                : `Solve 3 problems correctly to earn 3⭐ (Current: ${currentSubtopicStars}⭐)`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-black/40 border-2 border-purple-500/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-purple-400 font-bold">
                  Problem {problemsInSubtopic + 1}/3
                </span>
                <span className="text-yellow-400 font-bold">
                  {currentProblem.difficulty === 1 ? "EASY" : currentProblem.difficulty === 2 ? "MEDIUM" : currentProblem.difficulty === 3 ? "HARD" : ""}
                </span>
              </div>

              {/* Question text - made more prominent */}
              <div className="bg-white/10 border-2 border-white/20 rounded-lg p-4 mb-4">
                <p className="text-white text-xl font-semibold leading-relaxed">
                  {currentProblem.question}
                </p>
              </div>

              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !feedback && checkAnswer()
                }
                placeholder="Your answer..."
                className="w-full px-4 py-3 bg-black/60 border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                disabled={feedback !== null}
              />

              {feedback && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    feedback.correct
                      ? "bg-green-500/20 border-2 border-green-500/50 text-green-400"
                      : "bg-red-500/20 border-2 border-red-500/50 text-red-400"
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {!feedback && (
                  <>
                    <button
                      onClick={checkAnswer}
                      className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors"
                    >
                      Submit
                    </button>
                    {currentProblem.hints.length > 0 && (
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-bold rounded-lg transition-colors"
                      >
                        Hint
                      </button>
                    )}
                  </>
                )}
                {feedback && feedback.correct && (
                  <button
                    onClick={startPractice}
                    className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
                  >
                    Next Problem
                  </button>
                )}
                {feedback && !feedback.correct && (
                  <>
                    <button
                      onClick={() => {
                        setFeedback(null);
                        setUserAnswer("");
                      }}
                      className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => {
                        setFeedback({
                          correct: false,
                          message: `Solution: ${currentProblem.explanation}`,
                        });
                      }}
                      className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-bold rounded-lg transition-colors"
                    >
                      Show Solution
                    </button>
                  </>
                )}
              </div>

              {showHint && currentProblem.hints.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 font-bold mb-2">Hint:</p>
                  <p className="text-gray-300">{currentProblem.hints[0]}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
