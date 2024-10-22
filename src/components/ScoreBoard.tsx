import React from 'react';
import { Clock, Zap, Trophy } from 'lucide-react';
import { GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
}

export function ScoreBoard({ stats }: ScoreBoardProps) {
  const accuracy = stats.totalAttempts === 0 
    ? 0 
    : Math.round((stats.correctGuesses / stats.totalAttempts) * 100);

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center tardis-glow border border-blue-900/50">
        <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
        <div className="text-2xl font-bold text-blue-100">{accuracy}%</div>
        <div className="text-sm text-blue-300">Temporal Accuracy</div>
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center tardis-glow border border-blue-900/50">
        <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
        <div className="text-2xl font-bold text-blue-100">{stats.streak}</div>
        <div className="text-sm text-blue-300">Time Stream</div>
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 text-center tardis-glow border border-blue-900/50">
        <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-400" />
        <div className="text-2xl font-bold text-blue-100">{stats.bestStreak}</div>
        <div className="text-sm text-blue-300">Best Timeline</div>
      </div>
    </div>
  );
}