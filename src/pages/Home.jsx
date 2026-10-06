import { useState } from 'react'
import '../styles/Home.css'

const DRAWINGS = [
  { id: 1, name: 'Gato', emoji: '🐱', color: 'naranja' },
  { id: 2, name: 'Manzana', emoji: '🍎', color: 'rojo' },
  { id: 3, name: 'Pelota', emoji: '⚽', color: 'blanco y negro' },
  { id: 4, name: 'Flor', emoji: '🌸', color: 'rosa' },
  { id: 5, name: 'Plátano', emoji: '🍌', color: 'amarillo' },
  { id: 6, name: 'Caramelo', emoji: '🍭', color: 'multicolor' },
]

export default function Home({ onStart, onSelectActivity, childProfile }) {
  const [showForm, setShowForm] = useState(!childProfile)
  const [childName, setChildName] = useState(childProfile?.name || '')
  const [childAge, setChildAge] = useState(childProfile?.age || 4)

  const handleStart = () => {
    if (childName.trim()) {
      onStart({
        id: Date.now(),
        name: childName,
        age: childAge,
        createdAt: new Date().toISOString(),
      }, 'home')
      setShowForm(false)
    }
  }

  const handleSelectActivity = (activity) => {
    if (!childProfile) {
      setShowForm(true)
      return
    }
    onSelectActivity(activity)
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>🎨 Aprendo a Hablar</h1>
        <p className="subtitle">Colorea y aprende</p>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-box">
            <h2>¡Hola! Cuéntanos quién eres</h2>

            <div className="form-group">
              <label htmlFor="name">Tu nombre:</label>
              <input
                id="name"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Escribe tu nombre"
                className="input-text"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">¿Cuántos años tienes?</label>
              <select
                id="age"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                className="input-select"
              >
                {[2, 3, 4, 5, 6, 7, 8].map((age) => (
                  <option key={age} value={age}>{age} años</option>
                ))}
              </select>
            </div>

            <button onClick={handleStart} className="btn-primary btn-large">
              ¡Empezar! 🚀
            </button>
          </div>
        </div>
      )}

      {childProfile && !showForm && (
        <div className="welcome-box">
          <h2>¡Hola {childProfile.name}! 👋</h2>
          <p className="welcome-text">Tienes {childProfile.age} años</p>

          <div className="progress-section">
            <h3>Tu progreso esta semana:</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Sesiones</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dibujos coloreados</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Precisión</span>
                <span className="stat-value">0%</span>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button onClick={() => setShowForm(true)} className="btn-secondary">
              Cambiar perfil
            </button>
          </div>
        </div>
      )}

      <div className="activities-section">
        <h3>¿Qué quieres hacer?</h3>
        <div className="activities-grid">
          <button
            onClick={() => handleSelectActivity('coloring')}
            className="activity-card colorear"
          >
            <div className="activity-emoji">🎨</div>
            <div className="activity-title">Colorear</div>
            <div className="activity-description">Pinta los dibujos</div>
            <div className="activity-difficulty">Nivel: Fácil</div>
          </button>

          <button
            onClick={() => handleSelectActivity('tracing')}
            className="activity-card tracing"
          >
            <div className="activity-emoji">✏️</div>
            <div className="activity-title">Trazo de Letras</div>
            <div className="activity-description">Aprende a escribir</div>
            <div className="activity-difficulty">Nivel: Medio</div>
          </button>
        </div>
      </div>

      {childProfile && (
        <div className="drawings-grid">
          <h3>Dibujos para colorear:</h3>
          <div className="grid">
            {DRAWINGS.map((drawing) => (
              <div key={drawing.id} className="drawing-card" onClick={() => handleSelectActivity('coloring')}>
                <div className="drawing-emoji">{drawing.emoji}</div>
                <p className="drawing-name">{drawing.name}</p>
                <p className="drawing-color">({drawing.color})</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
