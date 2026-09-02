export function placeholderImage(text, { w = 300, h = 300, bg = 'C89B4A', fg = 'FFFFFF' } = {}) {
  const label = encodeURIComponent(text)
  return `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${label}&font=roboto`
}
