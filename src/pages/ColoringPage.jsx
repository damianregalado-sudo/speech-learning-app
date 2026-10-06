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
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Cabeza -->
        <circle cx="200" cy="180" r="90" fill="none" stroke="black" stroke-width="3"/>
        <!-- Orejas izquierda -->
        <polygon points="130,100 110,40 150,90" fill="none" stroke="black" stroke-width="3"/>
        <!-- Orejas derecha -->
        <polygon points="270,100 290,40 250,90" fill="none" stroke="black" stroke-width="3"/>
        <!-- Ojos grandes -->
        <circle cx="160" cy="160" r="25" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="240" cy="160" r="25" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="165" cy="165" r="12" fill="black"/>
        <circle cx="245" cy="165" r="12" fill="black"/>
        <!-- Nariz -->
        <polygon points="200,200 195,215 205,215" fill="black"/>
        <!-- Boca sonriente -->
        <path d="M 200 215 Q 180 235 160 220" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <path d="M 200 215 Q 220 235 240 220" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <!-- Bigotes izquierda -->
        <line x1="130" y1="190" x2="80" y2="180" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <line x1="130" y1="210" x2="80" y2="220" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <!-- Bigotes derecha -->
        <line x1="270" y1="190" x2="320" y2="180" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <line x1="270" y1="210" x2="320" y2="220" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    svgPaths: [
      { id: 'cat-head', label: 'Cabeza' }
    ]
  },
  2: {
    name: 'Manzana',
    narration: 'La MANZANA es roja y deliciosa 🍎',
    suggestedColor: '#F44336',
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Cuerpo manzana -->
        <circle cx="200" cy="220" r="80" fill="none" stroke="black" stroke-width="3"/>
        <!-- Mejillas sonrosadas (área para colorear) -->
        <circle cx="140" cy="200" r="30" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="260" cy="200" r="30" fill="none" stroke="black" stroke-width="2"/>
        <!-- Tallo -->
        <rect x="190" y="120" width="20" height="60" fill="none" stroke="black" stroke-width="3"/>
        <!-- Hoja -->
        <ellipse cx="230" cy="145" rx="35" ry="20" fill="none" stroke="black" stroke-width="3" transform="rotate(-30 230 145)"/>
        <!-- Brillo decorativo -->
        <ellipse cx="170" cy="160" rx="15" ry="25" fill="none" stroke="black" stroke-width="2" opacity="0.6"/>
      </svg>
    `,
    svgPaths: [
      { id: 'apple-body', label: 'Manzana' }
    ]
  },
  3: {
    name: 'Pelota',
    narration: 'La PELOTA está lista para jugar ⚽',
    suggestedColor: '#FFFFFF',
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Círculo principal -->
        <circle cx="200" cy="200" r="70" fill="none" stroke="black" stroke-width="3"/>
        <!-- Líneas decorativas -->
        <path d="M 130 200 Q 200 150 270 200" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 130 200 Q 200 250 270 200" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="200" cy="180" r="8" fill="black"/>
        <circle cx="190" cy="220" r="8" fill="black"/>
        <circle cx="210" cy="220" r="8" fill="black"/>
      </svg>
    `,
    svgPaths: [
      { id: 'ball-main', label: 'Pelota' }
    ]
  },
  4: {
    name: 'Flor',
    narration: 'La FLOR es hermosa y colorida 🌼',
    suggestedColor: '#FFEB3B',
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Pétalos -->
        <ellipse cx="200" cy="100" rx="30" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="280" cy="140" rx="30" ry="50" fill="none" stroke="black" stroke-width="3" transform="rotate(60 280 140)"/>
        <ellipse cx="280" cy="260" rx="30" ry="50" fill="none" stroke="black" stroke-width="3" transform="rotate(120 280 260)"/>
        <ellipse cx="200" cy="300" rx="30" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="120" cy="260" rx="30" ry="50" fill="none" stroke="black" stroke-width="3" transform="rotate(-120 120 260)"/>
        <ellipse cx="120" cy="140" rx="30" ry="50" fill="none" stroke="black" stroke-width="3" transform="rotate(-60 120 140)"/>
        <!-- Centro -->
        <circle cx="200" cy="200" r="40" fill="none" stroke="black" stroke-width="3"/>
        <!-- Tallo -->
        <path d="M 200 240 Q 180 300 170 340" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <!-- Hoja -->
        <ellipse cx="140" cy="290" rx="25" ry="40" fill="none" stroke="black" stroke-width="3" transform="rotate(-45 140 290)"/>
      </svg>
    `,
    svgPaths: [
      { id: 'flower-main', label: 'Flor' }
    ]
  },
  5: {
    name: 'Plátano',
    narration: 'El PLÁTANO es amarillo y delicioso 🍌',
    suggestedColor: '#FFEB3B',
    svg: `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Forma curva del plátano -->
        <path d="M 100 200 Q 200 100 300 180" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M 100 240 Q 200 140 300 220" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <!-- Ojos grandes -->
        <circle cx="150" cy="200" r="18" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="180" cy="200" r="18" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="155" cy="205" r="8" fill="black"/>
        <circle cx="185" cy="205" r="8" fill="black"/>
        <!-- Sonrisa -->
        <path d="M 150 225 Q 165 240 180 225" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
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
