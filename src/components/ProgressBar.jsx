import '../styles/ProgressBar.css'

export default function ProgressBar({ value, max = 100, label = 'Progreso' }) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div className="progress-container">
      <label className="progress-label">{label}</label>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="progress-text">{Math.round(percentage)}%</span>
    </div>
  )
}
