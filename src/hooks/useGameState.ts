import { useState, useEffect } from 'react';
import { Letter, GameStats } from '../types';

const INITIAL_STATS: GameStats = {
  totalAttempts: 0,
  correctGuesses: 0,
  streak: 0,
  bestStreak: 0,
};

export function useGameState() {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const stored = localStorage.getItem('letterProgress');
    if (stored) return JSON.parse(stored);
    return Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(char => ({
      id: char.toLowerCase(),
      english: char,
      attempts: 0,
      correct: 0,
    }));
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const stored = localStorage.getItem('gameStats');
    if (stored) return JSON.parse(stored);
    return INITIAL_STATS;
  });

  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);

  useEffect(() => {
    localStorage.setItem('letterProgress', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(stats));
  }, [stats]);

  const selectNewLetter = () => {
    // Prioritize letters with lower success rate
    const weightedLetters = letters.map(letter => ({
      ...letter,
      weight: 1 + (letter.attempts === 0 ? 3 : letter.attempts - letter.correct),
    }));

    const totalWeight = weightedLetters.reduce((sum, letter) => sum + letter.weight, 0);
    let random = Math.random() * totalWeight;

    for (const letter of weightedLetters) {
      random -= letter.weight;
      if (random <= 0) {
        setCurrentLetter(letters.find(l => l.id === letter.id) || null);
        break;
      }
    }
  };

  const handleGuess = (guessedId: string) => {
    if (!currentLetter) return;

    const isCorrect = guessedId === currentLetter.id;
    const newStats = {
      ...stats,
      totalAttempts: stats.totalAttempts + 1,
      correctGuesses: stats.correctGuesses + (isCorrect ? 1 : 0),
      streak: isCorrect ? stats.streak + 1 : 0,
    };
    newStats.bestStreak = Math.max(newStats.bestStreak, newStats.streak);
    setStats(newStats);

    setLetters(prev => prev.map(letter =>
      letter.id === currentLetter.id
        ? {
            ...letter,
            attempts: letter.attempts + 1,
            correct: letter.correct + (isCorrect ? 1 : 0),
          }
        : letter
    ));

    return isCorrect;
  };

  return {
    letters,
    currentLetter,
    stats,
    selectNewLetter,
    handleGuess,
  };
}
