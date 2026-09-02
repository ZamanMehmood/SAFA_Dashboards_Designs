function FilterTabs({ filters, activeFilter, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap justify-start gap-2 sm:justify-end ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`whitespace-nowrap rounded-full border-none px-[18px] py-2 text-[13px] transition-colors ${
            activeFilter === filter.id ? 'bg-ink text-white' : 'bg-pill text-ink'
          }`}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
