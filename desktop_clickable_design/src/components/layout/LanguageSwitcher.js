import { useLanguage } from '../../context/LanguageContext';
import Icon from '../common/Icon';

/**
 * Native <select> keeps this fully accessible/keyboard-operable without a
 * custom dropdown + click-outside implementation. Option labels are shown
 * in their own language (a language switcher doesn't translate itself).
 */
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <label className="flex items-center gap-1.5">
      <Icon name="globe" size={14} />
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label="Select language"
        className="cursor-pointer border-none bg-transparent p-0 text-xs font-semibold text-gold outline-none"
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </label>
  );
}

export default LanguageSwitcher;
