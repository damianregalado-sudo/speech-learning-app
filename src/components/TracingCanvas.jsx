import { useRef, useEffect, useState } from 'react'
import '../styles/TracingCanvas.css'

export default function TracingCanvas({
  letterId,
  referenceTrace,
  onTraceComplete,
  disabled = false
}) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [trace, setTrace] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#2196F3'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    if (referenceTrace && referenceTrace.length > 1) {
      ctx.beginPath()
      ctx.moveTo(referenceTrace[0][0], referenceTrace[0][1])
      for (let i = 1; i < referenceTrace.length; i++) {
        ctx.lineTo(referenceTrace[i][0], referenceTrace[i][1])
      }
      ctx.stroke()
    }

    ctx.setLineDash([])
    ctx.fillStyle = '#F5F5F5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#CCCCCC'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath()
      ctx.moveTo((canvas.width / 10) * i, 0)
      ctx.lineTo((canvas.width / 10) * i, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, (canvas.height / 10) * i)
      ctx.lineTo(canvas.width, (canvas.height / 10) * i)
      ctx.stroke()
    }

    ctx.strokeStyle = '#2196F3'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    if (referenceTrace && referenceTrace.length > 1) {
      ctx.beginPath()
      ctx.moveTo(referenceTrace[0][0], referenceTrace[0][1])
      for (let i = 1; i < referenceTrace.length; i++) {
        ctx.lineTo(referenceTrace[i][0], referenceTrace[i][1])
      }
      ctx.stroke()
    }

    if (trace.length > 1) {
      ctx.setLineDash([])
      ctx.strokeStyle = '#4CAF50'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(trace[0][0], trace[0][1])
      for (let i = 1; i < trace.length; i++) {
        ctx.lineTo(trace[i][0], trace[i][1])
      }
      ctx.stroke()
    }
  }, [trace, referenceTrace])

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    let clientX, clientY
    if (e.touches) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    return [
      (clientX - rect.left) * scaleX,
      (clientY - rect.top) * scaleY
    ]
  }

  const handleMouseDown = (e) => {
    if (disabled) return
    setIsDrawing(true)
    const coords = getCanvasCoordinates(e)
    setTrace([coords])
  }

  const handleMouseMove = (e) => {
    if (!isDrawing || disabled) return
    const coords = getCanvasCoordinates(e)
    setTrace([...trace, coords])
  }

  const handleMouseUp = () => {
    if (isDrawing && trace.length > 10) {
      onTraceComplete(trace)
    }
    setIsDrawing(false)
  }

  const handleTouchStart = (e) => {
    if (disabled) return
    e.preventDefault()
    setIsDrawing(true)
    const coords = getCanvasCoordinates(e)
    setTrace([coords])
  }

  const handleTouchMove = (e) => {
    if (!isDrawing || disabled) return
    e.preventDefault()
    const coords = getCanvasCoordinates(e)
    setTrace([...trace, coords])
  }

  const handleTouchEnd = (e) => {
    if (isDrawing && trace.length > 10) {
      onTraceComplete(trace)
    }
    setIsDrawing(false)
  }

  const handleClear = () => {
    setTrace([])
  }

  return (
    <div className="tracing-canvas-container">
      <canvas
        ref={canvasRef}
        className={`tracing-canvas ${disabled ? 'disabled' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: disabled ? 'default' : 'crosshair', touchAction: 'none' }}
      />
      {!disabled && (
        <div className="canvas-controls">
          <button onClick={handleClear} className="btn-clear">
            🗑️ Limpiar
          </button>
        </div>
      )}
    </div>
  )
}
