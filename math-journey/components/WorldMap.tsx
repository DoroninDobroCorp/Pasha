"use client";

import { useEffect, useState } from "react";
import { topics, ISLANDS, ISLAND_NAMES } from "@/data/topics";
import { getProgress, getTopicStars } from "@/lib/progress";
import { UserProgress, Topic, Category } from "@/types";
import TopicNode from "./TopicNode";
import TopicModal from "./TopicModal";
import {
  loadStudentProgress,
  isProgressLoaded,
} from "@/lib/loadStudentProgress";

const islandColors = {
  number_theory: "bg-cyan-500/10",
  algebra: "bg-purple-500/10",
  combinatorics: "bg-yellow-500/10",
  geometry: "bg-green-500/10",
};

const islandBorders = {
  number_theory: "border-cyan-500/30",
  algebra: "border-purple-500/30",
  combinatorics: "border-yellow-500/30",
  geometry: "border-green-500/30",
};

const islandTextColors = {
  number_theory: "text-cyan-400",
  algebra: "text-purple-400",
  combinatorics: "text-yellow-400",
  geometry: "text-green-400",
};

export default function WorldMap() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    setMounted(true);

    // Auto-load student progress on first visit
    if (!isProgressLoaded()) {
      loadStudentProgress();
    }

    setProgress(getProgress());
  }, []);

  const refreshProgress = () => {
    setProgress(getProgress());
  };

  const getIslandProgress = (category: Category) => {
    const categoryTopics = topics.filter((t) => t.category === category);

    // Calculate stars based on subtopic progress
    const totalStars = categoryTopics.reduce((sum, topic) => {
      const userProgress = progress.find((p) => p.topicId === topic.id);
      if (!userProgress) return sum;

      // Sum up all stars from subtopic progress
      const topicStars = userProgress.subtopicProgress.reduce((subSum, sp) => {
        return subSum + sp.stars;
      }, 0);

      return sum + topicStars;
    }, 0);

    // Max stars = total subtopics in category * 3
    const maxStars = categoryTopics.reduce((sum, topic) => {
      return sum + topic.subtopics.length * 3;
    }, 0);

    return { totalStars, maxStars };
  };

  if (!mounted) return null;

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background image with drawn islands */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/world_map_background.jpg)" }}
        />

        {/* Subtle dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Map container - fixed aspect ratio 16:10 to match background */}
        <div className="relative w-full max-w-[90vw] aspect-[16/10] max-h-[90vh]">
          {/* Island labels and progress */}
          {Object.entries(ISLANDS).map(([category, pos]) => {
            const cat = category as Category;
            const { totalStars, maxStars } = getIslandProgress(cat);

            return (
              <div key={category}>
                {/* Island name with strong background */}
                <div
                  className="absolute"
                  style={{
                    left: `${(pos.x / 1600) * 100}%`,
                    top: `${((pos.y - 260) / 1000) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="bg-black/90 backdrop-blur-md border-2 border-white/50 rounded-xl px-4 py-1 shadow-2xl">
                    <h2
                      className={`text-2xl font-bold ${islandTextColors[cat]} whitespace-nowrap`}
                    >
                      {ISLAND_NAMES[cat]}
                    </h2>
                  </div>
                </div>

                {/* Island progress with strong background */}
                <div
                  className="absolute"
                  style={{
                    left: `${(pos.x / 1600) * 100}%`,
                    top: `${((pos.y + 260) / 1000) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="bg-black/90 backdrop-blur-md border-2 border-white/50 rounded-full px-4 py-1 shadow-2xl">
                    <span className="text-white font-bold text-base">
                      ⭐ {totalStars}/{maxStars}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Topic nodes */}
          {topics.map((topic) => {
            const stars = getTopicStars(topic.id, progress);
            return (
              <TopicNode
                key={topic.id}
                topic={topic}
                stars={stars}
                onSelect={() => setSelectedTopic(topic)}
              />
            );
          })}
        </div>
      </div>

      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={() => {
            setSelectedTopic(null);
            refreshProgress();
          }}
        />
      )}
    </>
  );
}
