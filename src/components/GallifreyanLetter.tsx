import { SVG_MAPPINGS, DefaultLetter } from './letters';

interface GallifreyanLetterProps {
  letter: string;
  className?: string;
}

export function GallifreyanLetter({ letter, className = '' }: GallifreyanLetterProps) {
  const LetterComponent = SVG_MAPPINGS[letter.toLowerCase()] || DefaultLetter;

  //       <svg xmlns="http://www.w3.org/2000/svg"
  //            style={{position: "absolute", top: 0, left: 0}}
  //
  //
  //            viewBox="51 51 689.5999755859375 689.5999755859375">
  return (
      <svg
          // style={{position: "absolute", top: 0, left: 0, maxHeight: 800}}
          style={{maxHeight: 800}}
          viewBox="0 0 800 800"
          className={`w-full h-full ${className}`}
          width={300}
          height={300}
          // style={{maxHeight: '150px'}}
      >
        <LetterComponent/>
      </svg>
  );
}
