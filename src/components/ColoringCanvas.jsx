import { useRef, useEffect, useState } from 'react'
import { floodFill } from '../utils/floodFill'
import '../styles/ColoringCanvas.css'

export default function ColoringCanvas({
  drawingId,
  selectedColor,
  filledAreas,
  onAreaFilled,
}) {
  const canvasRef = useRef(null)
  const [imageData, setImageData] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400

    // Clear canvas
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw simple line-based drawing based on drawingId
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3

    if (drawingId === 1) {
      // Cat
      ctx.beginPath()
      ctx.arc(200, 150, 80, 0, Math.PI * 2)
      ctx.stroke()

      // Ears
      ctx.beginPath()
      ctx.moveTo(140, 60)
      ctx.lineTo(160, 40)
      ctx.lineTo(180, 80)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(220, 40)
      ctx.lineTo(240, 60)
      ctx.lineTo(220, 80)
      ctx.closePath()
      ctx.stroke()

      // Eyes
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(170, 130, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(230, 130, 8, 0, Math.PI * 2)
      ctx.fill()

      // Mouth
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(200, 160, 15, 0, Math.PI)
      ctx.stroke()
    } else if (drawingId === 2) {
      // Apple
      ctx.beginPath()
      ctx.arc(200, 180, 70, 0, Math.PI * 2)
      ctx.stroke()

      // Stem
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(195, 100, 10, 80)

      // Leaf
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(230, 130, 20, 0, Math.PI)
      ctx.stroke()
    } else if (drawingId === 3) {
      // Ball with panels
      ctx.beginPath()
      ctx.arc(200, 150, 60, 0, Math.PI * 2)
      ctx.stroke()

      // Hexagon pattern
      ctx.beginPath()
      ctx.moveTo(230, 130)
      ctx.lineTo(270, 150)
      ctx.lineTo(250, 190)
      ctx.lineTo(210, 190)
      ctx.lineTo(190, 150)
      ctx.closePath()
      ctx.stroke()
    }

    // Save image data for flood fill
    setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height))
  }, [drawingId])

  const handleCanvasClick = (e) => {
    if (!imageData) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))

    const ctx = canvas.getContext('2d')
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Flood fill
    const hexColor = selectedColor
    const rgb = parseInt(hexColor.slice(1), 16)
    const r = (rgb >> 16) & 255
    const g = (rgb >> 8) & 255
    const b = rgb & 255

    floodFill(data, x, y, r, g, b)
    ctx.putImageData(data, 0, 0)

    // Track filled area
    const areaId = `area_${x}_${y}`
    onAreaFilled(areaId)
  }

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onClick={handleCanvasClick}
        style={{ cursor: 'crosshair' }}
      />
    </div>
  )
}
