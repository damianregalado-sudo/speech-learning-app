import { useState } from 'react'
import ColoringCanvas from '../components/ColoringCanvas'
import ColorPalette from '../components/ColorPalette'
import ProgressBar from '../components/ProgressBar'
import Narration from '../components/Narration'
import '../styles/ColoringPage.css'

const COLORING_DATA = {
  1: {
    name: 'Gato',
    narration: 'El GATO es naranja y tiene bigotes 😺',
    suggestedColor: '#FF9800',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="100" fill="none" stroke="black" stroke-width="5"/>
      <polygon points="140,110 120,40 160,120" fill="none" stroke="black" stroke-width="5"/>
      <polygon points="260,110 280,40 240,120" fill="none" stroke="black" stroke-width="5"/>
      <circle cx="160" cy="170" r="22" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="240" cy="170" r="22" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="165" cy="175" r="10" fill="black"/>
      <circle cx="245" cy="175" r="10" fill="black"/>
      <polygon points="200,220 195,235 205,235" fill="black"/>
      <path d="M 200 235 Q 185 250 170 235" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M 200 235 Q 215 250 230 235" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <line x1="140" y1="200" x2="70" y2="195" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <line x1="140" y1="215" x2="70" y2="220" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <line x1="260" y1="200" x2="330" y2="195" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <line x1="260" y1="215" x2="330" y2="220" stroke="black" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    svgPaths: [
      { id: 'cat-head', label: 'Cabeza' }
    ]
  },
  2: {
    name: 'Manzana',
    narration: 'La MANZANA es roja y deliciosa 🍎',
    suggestedColor: '#F44336',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="220" r="90" fill="none" stroke="black" stroke-width="5"/>
      <path d="M 180 135 Q 200 125 220 135" fill="none" stroke="black" stroke-width="5"/>
      <rect x="190" y="80" width="20" height="60" fill="none" stroke="black" stroke-width="5"/>
      <ellipse cx="240" cy="110" rx="40" ry="25" fill="none" stroke="black" stroke-width="5" transform="rotate(-30 240 110)"/>
      <circle cx="130" cy="200" r="28" fill="none" stroke="black" stroke-width="3"/>
      <circle cx="270" cy="200" r="28" fill="none" stroke="black" stroke-width="3"/>
    </svg>`,
    svgPaths: [
      { id: 'apple-body', label: 'Manzana' }
    ]
  },
  3: {
    name: 'Pelota',
    narration: 'La PELOTA está lista para jugar ⚽',
    suggestedColor: '#FFFFFF',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="85" fill="none" stroke="black" stroke-width="5"/>
      <line x1="120" y1="200" x2="280" y2="200" stroke="black" stroke-width="4"/>
      <line x1="200" y1="120" x2="200" y2="280" stroke="black" stroke-width="4"/>
      <line x1="145" y1="145" x2="255" y2="255" stroke="black" stroke-width="3"/>
      <line x1="255" y1="145" x2="145" y2="255" stroke="black" stroke-width="3"/>
    </svg>`,
    svgPaths: [
      { id: 'ball-main', label: 'Pelota' }
    ]
  },
  4: {
    name: 'Flor',
    narration: 'La FLOR es hermosa y colorida 🌼',
    suggestedColor: '#FFEB3B',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="80" rx="35" ry="60" fill="none" stroke="black" stroke-width="5"/>
      <ellipse cx="265" cy="115" rx="35" ry="60" fill="none" stroke="black" stroke-width="5" transform="rotate(60 265 115)"/>
      <ellipse cx="265" cy="285" rx="35" ry="60" fill="none" stroke="black" stroke-width="5" transform="rotate(120 265 285)"/>
      <ellipse cx="200" cy="320" rx="35" ry="60" fill="none" stroke="black" stroke-width="5"/>
      <ellipse cx="135" cy="285" rx="35" ry="60" fill="none" stroke="black" stroke-width="5" transform="rotate(-120 135 285)"/>
      <ellipse cx="135" cy="115" rx="35" ry="60" fill="none" stroke="black" stroke-width="5" transform="rotate(-60 135 115)"/>
      <circle cx="200" cy="200" r="50" fill="none" stroke="black" stroke-width="5"/>
      <line x1="200" y1="240" x2="200" y2="340" stroke="black" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="140" cy="290" rx="30" ry="45" fill="none" stroke="black" stroke-width="5" transform="rotate(-45 140 290)"/>
    </svg>`,
    svgPaths: [
      { id: 'flower-main', label: 'Flor' }
    ]
  },
  5: {
    name: 'Plátano',
    narration: 'El PLÁTANO es amarillo y delicioso 🍌',
    suggestedColor: '#FFEB3B',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80 180 Q 150 100 280 160" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
      <path d="M 80 240 Q 150 160 280 220" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
      <circle cx="140" cy="180" r="20" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="180" cy="180" r="20" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="145" cy="185" r="8" fill="black"/>
      <circle cx="185" cy="185" r="8" fill="black"/>
      <path d="M 140 210 Q 160 225 180 210" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    svgPaths: [
      { id: 'banana-main', label: 'Plátano' }
    ]
  },
  6: {
    name: 'Caramelo',
    narration: 'El CARAMELO es dulce y divertido 🍭',
    suggestedColor: '#E91E63',
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Círculo caramelo -->
        <circle cx="200" cy="150" r="70" fill="none" stroke="black" stroke-width="3"/>
        <!-- Espiral adentro -->
        <path d="M 200 100 Q 240 120 240 160 Q 240 200 200 200 Q 160 200 160 160 Q 160 110 200 100"
              fill="none" stroke="black" stroke-width="2"/>
        <!-- Palito -->
        <rect x="185" y="210" width="30" height="120" fill="none" stroke="black" stroke-width="3" rx="5"/>
        <!-- Decoración (moño) -->
        <ellipse cx="150" cy="230" rx="20" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="250" cy="230" rx="20" ry="15" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    svgPaths: [
      { id: 'candy-main', label: 'Caramelo' }
    ]
  },
}

const TOTAL_DRAWINGS = Object.keys(COLORING_DATA).length

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

  const handleNextDrawing = () => {
    if (selectedDrawing < TOTAL_DRAWINGS) {
      setSelectedDrawing(selectedDrawing + 1)
      setFilledAreas(new Set())
      setSessionData({ startTime: Date.now(), accuracy: 0 })
    } else {
      onBack()
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
              <button onClick={handleNextDrawing} className="btn-next">
                {selectedDrawing < TOTAL_DRAWINGS ? 'Siguiente dibujo →' : 'Terminar ✓'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
