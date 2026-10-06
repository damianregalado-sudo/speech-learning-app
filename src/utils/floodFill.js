export function floodFill(imageData, startX, startY, fillR, fillG, fillB, tolerance = 30) {
  const data = imageData.data
  const width = imageData.width
  const height = imageData.height

  const pixelIndex = (startY * width + startX) * 4
  const originalR = data[pixelIndex]
  const originalG = data[pixelIndex + 1]
  const originalB = data[pixelIndex + 2]
  const originalA = data[pixelIndex + 3]

  if (originalA === 0) return

  const stack = [[startX, startY]]
  const visited = new Set()

  while (stack.length > 0) {
    const [x, y] = stack.pop()
    const key = `${x},${y}`

    if (visited.has(key)) continue
    if (x < 0 || x >= width || y < 0 || y >= height) continue

    const idx = (y * width + x) * 4
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]
    const a = data[idx + 3]

    const diff =
      Math.abs(r - originalR) +
      Math.abs(g - originalG) +
      Math.abs(b - originalB)

    if (diff > tolerance || a === 0) continue

    visited.add(key)

    data[idx] = fillR
    data[idx + 1] = fillG
    data[idx + 2] = fillB
    data[idx + 3] = 255

    stack.push([x + 1, y])
    stack.push([x - 1, y])
    stack.push([x, y + 1])
    stack.push([x, y - 1])
  }
}
