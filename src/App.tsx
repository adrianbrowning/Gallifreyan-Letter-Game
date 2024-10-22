import React, { useEffect, useState } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { GallifreyanLetter } from './components/GallifreyanLetter';
import { useGameState } from './hooks/useGameState';
import { Compass } from 'lucide-react';

function App() {
  const { letters, currentLetter, stats, selectNewLetter, handleGuess } = useGameState();
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    selectNewLetter();
  }, []);

  useEffect(() => {
    if (currentLetter) {
      const otherLetters = letters
        .filter(l => l.id !== currentLetter.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [...otherLetters, currentLetter]
        .sort(() => Math.random() - 0.5)
        .map(l => l.id);
      
      setOptions(allOptions);
    }
  }, [currentLetter]);

  const onGuess = (guessedId: string) => {
    const isCorrect = handleGuess(guessedId);
    
    setFeedback({
      message: isCorrect ? 'Fantastic!' : 'Allons-y, try again!',
      isError: !isCorrect,
    });

    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        selectNewLetter();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen time-vortex-bg gallifreyan-pattern">
      <div className="min-h-screen bg-black/30 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Compass className="w-10 h-10 text-blue-400 animate-spin-slow" />
              <h1 className="text-4xl font-bold text-blue-100">Time Lord Academy</h1>
            </div>
            <p className="text-blue-200 opacity-80">Master the languages of time and space</p>
          </div>

          <ScoreBoard stats={stats} />

          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 tardis-glow border border-blue-900/50">
            {currentLetter && (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-8">
                  <GallifreyanLetter 
                    letter={currentLetter.english} 
                    className="text-blue-300 hover:text-blue-200 transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {options.map((optionId) => (
                    <button
                      key={optionId}
                      onClick={() => onGuess(optionId)}
                      className="p-4 text-lg font-semibold rounded-lg transition-all
                        bg-blue-900/20 text-blue-100 border-2 border-blue-800/50 
                        hover:bg-blue-800/30 hover:border-blue-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      {letters.find(l => l.id === optionId)?.english}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div className={`mt-6 text-lg font-semibold ${
                    feedback.isError ? 'text-red-400' : 'text-blue-300'
                  }`}>
                    {feedback.message}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg p-6 tardis-glow border border-blue-900/50">
            <h2 className="text-xl font-semibold mb-4 text-blue-100">Temporal Progress Matrix</h2>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
              {letters.map((letter) => (
                <div
                  key={letter.id}
                  className={`aspect-square rounded-lg flex items-center justify-center
                    text-sm font-medium transition-all ${
                      letter.attempts === 0
                        ? 'bg-blue-900/20 text-blue-300/50'
                        : letter.correct / letter.attempts > 0.7
                        ? 'bg-blue-600/30 text-blue-200'
                        : 'bg-blue-800/30 text-blue-300'
                    }`}
                  title={`Success rate: ${
                    letter.attempts === 0
                      ? '0'
                      : Math.round((letter.correct / letter.attempts) * 100)
                  }%`}
                >
                  <div className="w-full h-full p-1">
                    <GallifreyanLetter letter={letter.english} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;