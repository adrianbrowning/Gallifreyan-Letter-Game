export interface Letter {
  id: string;
  english: string;
  attempts: number;
  correct: number;
}

export interface GameStats {
  totalAttempts: number;
  correctGuesses: number;
  streak: number;
  bestStreak: number;
}