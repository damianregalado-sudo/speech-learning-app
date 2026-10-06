import { useState } from 'react'
import { saveSession } from '../utils/sessionStorage'
import '../styles/ReadingPage.css'

const WORDS = [
  { word: 'PATA', emoji: '🦵', image: '🦆' },
  { word: 'GATO', emoji: '🐱', image: '😺' },
  { word: 'MANO', emoji: '✋', image: '👋' },
  { word: 'CASA', emoji: '🏠', image: '🏡' },
  { word: 'DADO', emoji: '🎲', image: '🎰' },
  { word: 'BOCA', emoji: '👄', image: '😬' },
  { word: 'NATA', emoji: '🥛', image: '🍶' },
  { word: 'SOLO', emoji: '🎵', image: '🎶' },
  { word: 'PUMA', emoji: '🐆', image: '🐅' },
  { word: 'ROCA', emoji: '🪨', image: '⛰️' }
]

export default function ReadingPage({ childProfile, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [mode, setMode] = useState('read')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedWords, setCompletedWords] = useState(new Set())

  const currentWord = WORDS[currentIdx]

  const handleMatch = (correct) => {
    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) {
      playSuccess()
      setCompletedWords(new Set([...completedWords, currentWord.word]))
    } else {
      playError()
    }
  }

  const handleNext = () => {
    if (isCorrect && currentIdx < WORDS.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setShowFeedback(false)
      setMode('read')
    } else if (currentIdx === WORDS.length - 1 && isCorrect) {
      saveSession(childProfile.id, 'reading', 85, 600)
      setShowFeedback(false)
    }
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

  const readWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word)
    utterance.lang = 'es-ES'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="reading-page">
      <div className="reading-header">
        <button onClick={onBack} className="btn-back">← Volver</button>
        <h2>📖 Lectura</h2>
        <div className="child-info">{childProfile?.name} - {completedWords.size}/{WORDS.length}</div>
      </div>

      <div className="reading-content">
        <div className="word-display">
          <div className="word-big">{currentWord.word}</div>
          <div className="word-syllables">
            {currentWord.word.split('').map((letter, idx) => (
              <span key={idx} style={{ marginRight: idx < currentWord.word.length - 1 ? '4px' : 0 }}>
                {letter}
              </span>
            ))}
          </div>
          <div className="word-image">{currentWord.emoji}</div>

          <div className="word-controls">
            <button onClick={readWord} className="btn-listen">
              🔊 Escuchar
            </button>
          </div>
        </div>

        {!showFeedback ? (
          <div className="word-options">
            <h3>¿Cuál es {currentWord.word}?</h3>
            <div className="options-grid">
              {WORDS.slice(0, 4).map((w) => (
                <button
                  key={w.word}
                  onClick={() => handleMatch(w.word === currentWord.word)}
                  className="option-button"
                >
                  <span className="option-emoji">{w.image}</span>
                  <span className="option-text">{w.word}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`reading-feedback ${isCorrect ? 'success' : ''}`}>
            <p className="feedback-message">
              {isCorrect ? '¡Correcto! 🎉' : 'Intenta de nuevo 😊'}
            </p>
            {isCorrect && (
              <>
                {currentIdx < WORDS.length - 1 && (
                  <button onClick={handleNext} className="next-button">
                    Siguiente palabra →
                  </button>
                )}
                {currentIdx === WORDS.length - 1 && (
                  <button onClick={onBack} className="next-button">
                    Completaste todas! 🏆
                  </button>
                )}
              </>
            )}
            {!isCorrect && (
              <button onClick={() => setShowFeedback(false)} className="next-button">
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
