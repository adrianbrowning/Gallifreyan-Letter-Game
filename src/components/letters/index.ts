import { LetterA } from './LetterA';
import { LetterB } from './LetterB';
import { LetterC } from './LetterC';
import { LetterD } from './LetterD';
import { DefaultLetter } from './DefaultLetter';

export const SVG_MAPPINGS: Record<string, React.ComponentType> = {
  a: LetterA,
  b: LetterB,
  c: LetterC,
  d: LetterD,
};

export { DefaultLetter };