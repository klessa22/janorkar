/** "#c0673a" -> "192, 103, 58" for use in rgba(var(--accent-rgb), x). */
export function hexToRgbString(hex: string): string {
  const clean = hex.replace('#', '').trim()
  const full =
    clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean
  const num = parseInt(full, 16)
  if (Number.isNaN(num) || full.length !== 6) return '192, 103, 58'
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `${r}, ${g}, ${b}`
}

/** Apply the accent colour to the document root as CSS custom properties. */
export function applyAccent(hex: string) {
  const root = document.documentElement
  root.style.setProperty('--color-accent', hex)
  root.style.setProperty('--accent-rgb', hexToRgbString(hex))
}
