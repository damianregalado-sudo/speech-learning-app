import { useState } from 'react'
import TracingCanvas from '../components/TracingCanvas'
import '../styles/TracingPage.css'

const LETTERS = [
  { id: 'A', name: 'Letra A', difficulty: 1 },
  { id: 'B', name: 'Letra B', difficulty: 2 },
  { id: 'C', name: 'Letra C', difficulty: 2 },
  { id: 'D', name: 'Letra D', difficulty: 2 },
  { id: 'E', name: 'Letra E', difficulty: 2 },
  { id: 'L', name: 'Letra L', difficulty: 1 },
  { id: 'M', name: 'Letra M', difficulty: 3 },
  { id: 'O', name: 'Letra O', difficulty: 1 },
  { id: 'P', name: 'Letra P', difficulty: 2 },
  { id: 'T', name: 'Letra T', difficulty: 1 },
]

const REFERENCE_TRACES = {
  'A': [
    [150, 300], [200, 100], [250, 300]
  ],
  'B': [
    [150, 100], [150, 300], [200, 100],
    [200, 150], [150, 150], [200, 150],
    [200, 200], [150, 200], [200, 300]
  ],
  'C': [
    [250, 100], [150, 100], [150, 300], [250, 300]
  ],
  'D': [
    [150, 100], [150, 300], [200, 100],
    [200, 300], [150, 100]
  ],
  'E': [
    [250, 100], [150, 100], [150, 300], [250, 300],
    [150, 200], [230, 200]
  ],
  'L': [
    [150, 100], [150, 300], [250, 300]
  ],
  'M': [
    [150, 300], [150, 100], [200, 200], [250, 100], [250, 300]
  ],
  'O': [
    [150, 100], [250, 100], [250, 300], [150, 300], [150, 100]
  ],
  'P': [
    [150, 300], [150, 100], [200, 100], [200, 200], [150, 200]
  ],
  'T': [
    [150, 100], [250, 100], [200, 100], [200, 300]
  ]
}

export default function TracingPage({ childProfile, onBack }) {
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [completedLetters, setCompletedLetters] = useState(new Set())

  const currentLetter = LETTERS[currentLetterIdx]

  const handleTraceComplete = (trace) => {
    const similarity = calculateSimilarity(trace, REFERENCE_TRACES[currentLetter.id])
    setAccuracy(similarity)

    if (similarity >= 70) {
      setFeedbackText(`¡Excelente! ${similarity.toFixed(0)}% de precisión 🎉`)
      setCompletedLetters(new Set([...completedLetters, currentLetter.id]))
      playSuccess()
    } else if (similarity >= 50) {
      setFeedbackText(`¡Bien! ${similarity.toFixed(0)}% - Intenta de nuevo 👍`)
      playPartial()
    } else {
      setFeedbackText(`Necesitas mejorar. ${similarity.toFixed(0)}% - Observa la línea punteada`)
      playError()
    }

    setShowFeedback(true)
  }

  const handleNextLetter = () => {
    if (accuracy >= 70) {
      if (currentLetterIdx < LETTERS.length - 1) {
        setCurrentLetterIdx(currentLetterIdx + 1)
        setShowFeedback(false)
        setAccuracy(0)
      } else {
        setFeedbackText('¡Completaste todas las letras! 🏆')
      }
    }
  }

  const handleRetry = () => {
    setShowFeedback(false)
    setAccuracy(0)
  }

  const playSuccess = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  }

  const playPartial = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 600
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  }

  const playError = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 300
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  }

  return (
    <div className="tracing-page">
      <div className="tracing-header">
        <button onClick={onBack} className="btn-back">← Volver</button>
        <h2>✏️ Trazo de Letras</h2>
        <div className="child-info">{childProfile?.name}, {childProfile?.age} años</div>
      </div>

      <div className="progress-section">
        <div className="letter-progress">
          {LETTERS.map((letter, idx) => (
            <div
              key={letter.id}
              className={`letter-dot ${idx === currentLetterIdx ? 'active' : ''} ${
                completedLetters.has(letter.id) ? 'completed' : ''
              }`}
              onClick={() => {
                if (completedLetters.has(letter.id)) {
                  setCurrentLetterIdx(idx)
                  setShowFeedback(false)
                }
              }}
            >
              {letter.id}
            </div>
          ))}
        </div>
        <p className="progress-text">
          {completedLetters.size} / {LETTERS.length} letras completadas
        </p>
      </div>

      <div className="tracing-content">
        <div className="instruction-box">
          <h3>Traza la línea azul punteada</h3>
          <p>Sigue el camino con tu dedo. Intenta ser lo más preciso posible.</p>
        </div>

        <div className="canvas-container">
          <TracingCanvas
            letterId={currentLetter.id}
            referenceTrace={REFERENCE_TRACES[currentLetter.id]}
            onTraceComplete={handleTraceComplete}
            disabled={showFeedback}
          />
        </div>

        {showFeedback && (
          <div className={`feedback-box ${accuracy >= 70 ? 'success' : 'retry'}`}>
            <p className="feedback-text">{feedbackText}</p>
            <div className="accuracy-bar">
              <div className="accuracy-fill" style={{ width: `${accuracy}%` }} />
            </div>
            <p className="accuracy-text">{accuracy.toFixed(0)}% de precisión</p>

            <div className="feedback-buttons">
              {accuracy >= 70 ? (
                <>
                  {currentLetterIdx < LETTERS.length - 1 && (
                    <button onClick={handleNextLetter} className="btn-primary">
                      Siguiente Letra →
                    </button>
                  )}
                  {currentLetterIdx === LETTERS.length - 1 && (
                    <button onClick={onBack} className="btn-primary">
                      Ver todas mis letras ✓
                    </button>
                  )}
                </>
              ) : (
                <button onClick={handleRetry} className="btn-secondary">
                  Intentar de nuevo ↻
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function calculateSimilarity(trace1, trace2) {
  if (!trace1 || trace1.length < 3) return 0

  const points1 = normalizeTrace(trace1)
  const points2 = normalizeTrace(trace2)

  const length1 = points1.length
  const length2 = points2.length
  const maxLen = Math.max(length1, length2)

  let totalDistance = 0
  for (let i = 0; i < maxLen; i++) {
    const p1 = points1[Math.floor((i / maxLen) * length1)] || points1[length1 - 1]
    const p2 = points2[Math.floor((i / maxLen) * length2)] || points2[length2 - 1]

    const dx = p1[0] - p2[0]
    const dy = p1[1] - p2[1]
    const distance = Math.sqrt(dx * dx + dy * dy)
    totalDistance += distance
  }

  const avgDistance = totalDistance / maxLen
  const maxExpected = 100
  const similarity = Math.max(0, 100 - (avgDistance / maxExpected) * 100)

  return similarity
}

function normalizeTrace(trace) {
  if (trace.length === 0) return []

  const minX = Math.min(...trace.map(p => p[0]))
  const maxX = Math.max(...trace.map(p => p[0]))
  const minY = Math.min(...trace.map(p => p[1]))
  const maxY = Math.max(...trace.map(p => p[1]))

  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1

  return trace.map(([x, y]) => [
    ((x - minX) / rangeX) * 300,
    ((y - minY) / rangeY) * 300
  ])
}
