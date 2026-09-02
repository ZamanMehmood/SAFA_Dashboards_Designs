import { useState } from 'react';
import Icon from '../common/Icon';

function CollapsibleRow({ icon, label, defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border-none bg-transparent text-sm font-medium text-ink"
      >
        <Icon name={icon} size={18} />
        <span className="flex items-center gap-2">
          {label}
          <Icon name={isOpen ? 'minus' : 'plus'} size={16} />
        </span>
      </button>
      {isOpen && children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default CollapsibleRow;
