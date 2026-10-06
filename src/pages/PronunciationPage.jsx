import { useState, useRef } from 'react'
import { analyzeAudio, recordAudio } from '../utils/audioAnalysis'
import { saveSession } from '../utils/sessionStorage'
import '../styles/PronunciationPage.css'

const SYLLABLES = [
  'PA', 'PE', 'PI', 'PO', 'PU',
  'MA', 'ME', 'MI', 'MO', 'MU',
  'BA', 'BE', 'BI', 'BO', 'BU',
  'TA', 'TE', 'TI', 'TO', 'TU'
]

const SYLLABLE_EMOJIS = {
  'P': '👄', 'M': '👂', 'B': '👶', 'T': '😊', 'L': '😄'
}

export default function PronunciationPage({ childProfile, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [accuracy, setAccuracy] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [completedSyllables, setCompletedSyllables] = useState(new Set())
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const currentSyllable = SYLLABLES[currentIdx]
  const consonant = currentSyllable[0]

  const handleRecordStart = async () => {
    try {
      setIsRecording(true)
      setFeedback('')
      audioChunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const arrayBuffer = await audioBlob.arrayBuffer()
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        const result = analyzeAudio(audioBuffer, currentSyllable)
        setAccuracy(Math.round(result.similarity))

        if (result.similarity >= 75) {
          setFeedback(`¡Excelente! ${result.similarity.toFixed(0)}% de similitud 🎉`)
          setCompletedSyllables(new Set([...completedSyllables, currentSyllable]))
          playSuccess()
        } else if (result.similarity >= 50) {
          setFeedback(`¡Bien! ${result.similarity.toFixed(0)}% - Intenta de nuevo`)
          playPartial()
        } else {
          setFeedback(`Necesitas mejorar. ${result.similarity.toFixed(0)}%`)
          playError()
        }

        stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
      }

      mediaRecorder.start()
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 2000)
    } catch (err) {
      setFeedback('Error al acceder al micrófono')
      setIsRecording(false)
    }
  }

  const handleNext = () => {
    if (accuracy >= 75) {
      if (currentIdx < SYLLABLES.length - 1) {
        setCurrentIdx(currentIdx + 1)
        setAccuracy(null)
        setFeedback('')
      } else {
        saveSession(childProfile.id, 'pronunciation', accuracy, 300)
        setFeedback('¡Completaste todas las sílabas! 🏆')
      }
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
    <div className="pronunciation-page">
      <div className="pronunciation-header">
        <button onClick={onBack} className="btn-back">← Volver</button>
        <h2>🎤 Pronunciación</h2>
        <div className="child-info">{childProfile?.name}, {childProfile?.age} años</div>
      </div>

      <div className="syllable-grid">
        {SYLLABLES.map((syl, idx) => (
          <button
            key={syl}
            className={`syllable-button ${idx === currentIdx ? 'active' : ''} ${
              completedSyllables.has(syl) ? 'completed' : ''
            }`}
            onClick={() => {
              if (completedSyllables.has(syl) || idx === currentIdx) {
                setCurrentIdx(idx)
                setAccuracy(null)
                setFeedback('')
              }
            }}
          >
            {syl}
          </button>
        ))}
      </div>

      <div className="pronunciation-content">
        <div className="articulation-box">
          <div className="articulation-emoji">{SYLLABLE_EMOJIS[consonant] || '😊'}</div>
          <div className="articulation-instructions">Pronuncia: {currentSyllable}</div>

          <div className="recording-controls">
            <button
              onClick={handleRecordStart}
              disabled={isRecording}
              className={`record-button ${isRecording ? 'recording' : ''}`}
            >
              {isRecording ? '🎙️ Grabando...' : '🎙️ Grabar'}
            </button>

            {feedback && (
              <div className={`result-box ${accuracy >= 75 ? 'success' : ''}`}>
                <p className="result-score">{accuracy}%</p>
                <p>{feedback}</p>
                {accuracy >= 75 && currentIdx < SYLLABLES.length - 1 && (
                  <button onClick={handleNext} className="next-button">
                    Siguiente →
                  </button>
                )}
                {currentIdx === SYLLABLES.length - 1 && accuracy >= 75 && (
                  <button onClick={onBack} className="next-button">
                    Ver Dashboard
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="articulation-box">
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Progreso</h3>
            <p style={{ margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {completedSyllables.size} / {SYLLABLES.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
