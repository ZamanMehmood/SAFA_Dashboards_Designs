import Icon from '../common/Icon';

function BrandsSearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line px-4 py-3.5 text-ink-secondary">
      <Icon name="search" size={18} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-secondary"
      />
    </div>
  );
}

export default BrandsSearchBar;
