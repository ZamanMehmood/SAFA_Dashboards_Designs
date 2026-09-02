function parseRatio(ratio) {
  const [w, h] = ratio.split('/').map((part) => parseFloat(part.trim()));
  return { w, h };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Fixed-aspect-ratio placeholder box backed by a real (royalty-free, seeded)
 * stock photo from Picsum so the site looks finished during development.
 * The seed is derived from the label, so the same placeholder always shows
 * the same photo. Swapping in real photography later only requires
 * replacing the <img src> with a real asset inside this same wrapper, so
 * downstream layout never shifts.
 */
function PlaceholderImage({ ratio = '1 / 1', label, className = '', rounded = false, width = 800 }) {
  const { w, h } = parseRatio(ratio);
  const height = Math.round(width * (h / w));
  const seed = slugify(label || ratio);
  const src = `https://picsum.photos/seed/${seed}/${width}/${height}`;

  return (
    <div
      className={`w-full shrink-0 overflow-hidden bg-[repeating-linear-gradient(135deg,theme(colors.placeholder.a),theme(colors.placeholder.a)_12px,theme(colors.placeholder.b)_12px,theme(colors.placeholder.b)_24px)] ${
        rounded ? 'rounded-lg' : ''
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={label || 'Placeholder image'}
        width={width}
        height={height}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default PlaceholderImage;
