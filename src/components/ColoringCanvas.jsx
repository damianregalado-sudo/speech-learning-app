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

    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (drawingId === 1) {
      // GATO CARICATURESCO
      ctx.beginPath()
      ctx.arc(200, 180, 90, 0, Math.PI * 2)
      ctx.stroke()

      // Orejas
      ctx.beginPath()
      ctx.moveTo(130, 100)
      ctx.lineTo(110, 40)
      ctx.lineTo(150, 90)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(270, 100)
      ctx.lineTo(290, 40)
      ctx.lineTo(250, 90)
      ctx.closePath()
      ctx.stroke()

      // Ojos grandes
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(160, 160, 25, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(240, 160, 25, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Pupilas grandes
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(165, 165, 12, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(245, 165, 12, 0, Math.PI * 2)
      ctx.fill()

      // Nariz
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.moveTo(200, 200)
      ctx.lineTo(195, 215)
      ctx.lineTo(205, 215)
      ctx.closePath()
      ctx.fill()

      // Bigotes
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(130, 190)
      ctx.lineTo(80, 180)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(130, 210)
      ctx.lineTo(80, 220)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(270, 190)
      ctx.lineTo(320, 180)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(270, 210)
      ctx.lineTo(320, 220)
      ctx.stroke()

      // Sonrisa
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(200, 215, 20, 0, Math.PI)
      ctx.stroke()
    } else if (drawingId === 2) {
      // MANZANA CARICATURESCA
      ctx.beginPath()
      ctx.arc(200, 220, 80, 0, Math.PI * 2)
      ctx.stroke()

      // Mejillas rosadas (solo contorno)
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(140, 200, 30, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(260, 200, 30, 0, Math.PI * 2)
      ctx.stroke()

      // Tallo
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(200, 140)
      ctx.lineTo(200, 60)
      ctx.stroke()

      // Hoja
      ctx.beginPath()
      ctx.ellipse(240, 90, 35, 20, -0.5, 0, Math.PI * 2)
      ctx.stroke()

      // Brillo
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(170, 160, 15, 25, 0, 0, Math.PI * 2)
      ctx.stroke()
    } else if (drawingId === 3) {
      // PELOTA CARICATURESCA
      ctx.beginPath()
      ctx.arc(200, 200, 70, 0, Math.PI * 2)
      ctx.stroke()

      // Líneas decorativas
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(130, 200)
      ctx.quadraticCurveTo(200, 150, 270, 200)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(130, 200)
      ctx.quadraticCurveTo(200, 250, 270, 200)
      ctx.stroke()

      // Puntos
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(200, 180, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(190, 220, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(210, 220, 8, 0, Math.PI * 2)
      ctx.fill()
    } else if (drawingId === 4) {
      // FLOR CARICATURESCA
      ctx.lineWidth = 3
      const petalX = 200
      const petalY = 200
      const petalDist = 60

      // 6 pétalos
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const x = petalX + Math.cos(angle) * petalDist
        const y = petalY + Math.sin(angle) * petalDist

        ctx.beginPath()
        ctx.ellipse(x, y, 30, 50, angle, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Centro
      ctx.beginPath()
      ctx.arc(200, 200, 40, 0, Math.PI * 2)
      ctx.stroke()

      // Tallo
      ctx.beginPath()
      ctx.moveTo(200, 240)
      ctx.quadraticCurveTo(180, 300, 170, 340)
      ctx.stroke()

      // Hoja
      ctx.beginPath()
      ctx.ellipse(140, 290, 25, 40, -0.8, 0, Math.PI * 2)
      ctx.stroke()
    } else if (drawingId === 5) {
      // PLÁTANO CARICATURESCO
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(100, 200)
      ctx.quadraticCurveTo(200, 100, 300, 180)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(100, 240)
      ctx.quadraticCurveTo(200, 140, 300, 220)
      ctx.stroke()

      // Ojos
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(150, 200, 18, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(180, 200, 18, 0, Math.PI * 2)
      ctx.stroke()

      // Pupilas
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(155, 205, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(185, 205, 8, 0, Math.PI * 2)
      ctx.fill()

      // Sonrisa
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(167, 225, 15, 0, Math.PI)
      ctx.stroke()
    } else if (drawingId === 6) {
      // CARAMELO CARICATURESCO
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(200, 150, 70, 0, Math.PI * 2)
      ctx.stroke()

      // Espiral
      ctx.lineWidth = 2
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.arc(200, 150, 20 + i * 15, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Palito
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(185, 210)
      ctx.lineTo(185, 330)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(215, 210)
      ctx.lineTo(215, 330)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(200, 210)
      ctx.lineTo(200, 330)
      ctx.stroke()

      // Moño
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(150, 230, 20, 15, 0, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.ellipse(250, 230, 20, 15, 0, 0, Math.PI * 2)
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
