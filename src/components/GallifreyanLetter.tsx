import React from 'react';
import { SVG_MAPPINGS, DefaultLetter } from './letters';

interface GallifreyanLetterProps {
  letter: string;
  className?: string;
}

export function GallifreyanLetter({ letter, className = '' }: GallifreyanLetterProps) {
  const LetterComponent = SVG_MAPPINGS[letter.toLowerCase()] || DefaultLetter;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full h-full ${className}`}
      style={{ maxHeight: '150px' }}
    >
      <LetterComponent />
    </svg>
  );
}