/**
 * Compress an uploaded image via canvas to a max 800×800 JPEG at quality 0.7
 * so it comfortably fits in localStorage (Rule 3).
 */
export function compressImage(
  file: File,
  maxSize = 800,
  quality = 0.7,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image file'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const imgEl = new Image()
      imgEl.onerror = () => reject(new Error('Could not decode image'))
      imgEl.onload = () => {
        let { width, height } = imgEl
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width)
          width = maxSize
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height)
          height = maxSize
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas unsupported'))
          return
        }
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(imgEl, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      imgEl.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}
