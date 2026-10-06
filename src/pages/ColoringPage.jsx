import { useState } from 'react'
import ColoringCanvas from '../components/ColoringCanvas'
import ColorPalette from '../components/ColorPalette'
import ProgressBar from '../components/ProgressBar'
import Narration from '../components/Narration'
import '../styles/ColoringPage.css'

const COLORING_DATA = {
  1: {
    name: 'Gato',
    narration: 'El GATO es naranja',
    suggestedColor: '#FF9800',
    svgPaths: [
      { id: 'cat-head', label: 'Cabeza', type: 'circle', cx: 200, cy: 150, r: 80 },
      { id: 'cat-left-ear', label: 'Oreja izquierda', type: 'polygon', points: '140,60 160,40 180,80' },
      { id: 'cat-right-ear', label: 'Oreja derecha', type: 'polygon', points: '220,40 240,60 220,80' },
    ]
  },
  2: {
    name: 'Manzana',
    narration: 'La MANZANA es roja',
    suggestedColor: '#F44336',
    svgPaths: [
      { id: 'apple-body', label: 'Cuerpo', type: 'circle', cx: 200, cy: 180, r: 70 },
      { id: 'apple-stem', label: 'Tallo', type: 'rect', x: 195, y: 100, width: 10, height: 80 },
      { id: 'apple-leaf', label: 'Hoja', type: 'path', d: 'M 230,130 Q 260,120 280,150' },
    ]
  },
  3: {
    name: 'Pelota',
    narration: 'La PELOTA es blanca',
    suggestedColor: '#FFFFFF',
    svgPaths: [
      { id: 'ball-main', label: 'Pelota', type: 'circle', cx: 200, cy: 150, r: 60 },
    ]
  },
}

export default function ColoringPage({ childProfile, onBack }) {
  const [selectedDrawing, setSelectedDrawing] = useState(1)
  const [selectedColor, setSelectedColor] = useState('#FF9800')
  const [filledAreas, setFilledAreas] = useState(new Set())
  const [sessionData, setSessionData] = useState({
    startTime: Date.now(),
    accuracy: 0,
  })

  const drawingInfo = COLORING_DATA[selectedDrawing] || COLORING_DATA[1]
  const colors = [
    { name: 'Rojo', hex: '#F44336' },
    { name: 'Azul', hex: '#2196F3' },
    { name: 'Amarillo', hex: '#FFEB3B' },
    { name: 'Verde', hex: '#4CAF50' },
    { name: 'Naranja', hex: '#FF9800' },
    { name: 'Morado', hex: '#9C27B0' },
  ]

  const handleAreaFilled = (areaId) => {
    const newFilled = new Set(filledAreas)
    newFilled.add(areaId)
    setFilledAreas(newFilled)

    const accuracy = Math.min(100, (newFilled.size / drawingInfo.svgPaths.length) * 100)
    setSessionData({ ...sessionData, accuracy })

    playSound('success')
  }

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  return (
    <div className="coloring-page">
      <div className="coloring-header">
        <button onClick={onBack} className="btn-back">← Volver</button>
        <h2>{drawingInfo.name}</h2>
        <div className="child-info">{childProfile?.name}, {childProfile?.age} años</div>
      </div>

      <Narration text={drawingInfo.narration} />

      <div className="coloring-content">
        <div className="canvas-section">
          <ColoringCanvas
            drawingId={selectedDrawing}
            selectedColor={selectedColor}
            filledAreas={filledAreas}
            onAreaFilled={handleAreaFilled}
          />
        </div>

        <div className="controls-section">
          <ColorPalette
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />

          <ProgressBar
            value={sessionData.accuracy}
            max={100}
            label={`${Math.round(sessionData.accuracy)}% coloreado`}
          />

          {sessionData.accuracy >= 80 && (
            <div className="completion-message">
              <p>¡Excelente trabajo! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
