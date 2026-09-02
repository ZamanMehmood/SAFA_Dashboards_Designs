import { useState } from 'react';
import PlaceholderImage from '../common/PlaceholderImage';

const THUMBNAIL_COUNT = 6;

function ImageGallery({ title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-3">
      <div className="min-w-0 flex-1">
        <PlaceholderImage ratio="9 / 8" label={`${title} — view ${activeIndex + 1}`} rounded />
      </div>
      <div className="flex w-20 shrink-0 flex-col gap-3">
        {Array.from({ length: THUMBNAIL_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-lg ${
              activeIndex === index ? 'ring-2 ring-gold ring-offset-1' : ''
            }`}
          >
            <PlaceholderImage ratio="1 / 1" label={`${index + 1}`} rounded />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
