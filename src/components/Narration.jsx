import { useState } from 'react'
import '../styles/Narration.css'

export default function Narration({ text }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playNarration = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'es-ES'
      utterance.rate = 0.8
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="narration-container">
      <p className="narration-text">{text}</p>
      <button
        className={`btn-narration ${isPlaying ? 'playing' : ''}`}
        onClick={playNarration}
        disabled={isPlaying}
      >
        {isPlaying ? '🔊 Escuchando...' : '🔊 Escuchar'}
      </button>
    </div>
  )
}
