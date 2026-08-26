import { useLanguage } from '../../context/LanguageContext';

const LETTERS_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LETTERS_AR = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');

/** Jump-to-letter index for the brand directory; clicking a letter filters the grid to matching brand names. */
function AlphabetIndex({ activeLetter, onSelect }) {
  const { language } = useLanguage();
  const letters = language === 'ar' ? LETTERS_AR : LETTERS_EN;

  return (
    <div className="flex gap-4 overflow-x-auto pb-1 text-sm text-ink-secondary [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {letters.map((letter) => (
        <button
          key={letter}
          type="button"
          onClick={() => onSelect(activeLetter === letter ? null : letter)}
          className={`shrink-0 transition-colors ${
            activeLetter === letter ? 'font-bold text-gold' : 'hover:text-ink'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default AlphabetIndex;
