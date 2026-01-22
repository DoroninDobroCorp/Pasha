'use client';

import { Topic } from '@/types';
import Image from 'next/image';

interface TopicNodeProps {
  topic: Topic;
  stars: number;
  onSelect: () => void;
}

const categoryColors = {
  number_theory: 'from-cyan-500 to-blue-600',
  algebra: 'from-purple-500 to-pink-600',
  combinatorics: 'from-yellow-500 to-orange-600',
  geometry: 'from-green-500 to-emerald-600'
};

const categoryIcons = {
  number_theory: '/pasha/images/number_theory.jpg',
  algebra: '/pasha/images/algebra.jpg',
  combinatorics: '/pasha/images/Combinatoric.jpg',
  geometry: '/pasha/images/geometry.jpg'
};

export default function TopicNode({ topic, stars, onSelect }: TopicNodeProps) {
  return (
    <div
      className="absolute transition-all duration-300 opacity-100 cursor-pointer hover:scale-110"
      style={{
        left: `${(topic.position.x / 1600) * 100}%`,
        top: `${(topic.position.y / 1000) * 100}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onSelect}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColors[topic.category]} blur-xl opacity-50`} />

      {/* Node circle - ONLY IMAGE */}
      <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-2xl overflow-hidden">
        <Image
          src={categoryIcons[topic.category]}
          alt={topic.category}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[topic.category]} opacity-30`} />
      </div>

      {/* Topic title below node - NO STARS */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <p className="text-xs font-bold text-center text-white drop-shadow-lg bg-black/70 px-2 py-1 rounded">
          {topic.title}
        </p>
      </div>

      {/* Particles effect for new topics */}
      {stars === 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                top: `${20 + i * 20}%`,
                left: `${30 + i * 15}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
