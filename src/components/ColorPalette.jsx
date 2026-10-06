import '../styles/ColorPalette.css'

export default function ColorPalette({ colors, selectedColor, onColorSelect }) {
  return (
    <div className="color-palette">
      <h3>Elige un color:</h3>
      <div className="color-grid">
        {colors.map((color) => (
          <button
            key={color.hex}
            className={`color-button ${selectedColor === color.hex ? 'active' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorSelect(color.hex)}
            title={color.name}
            aria-label={`Color ${color.name}`}
          >
            {selectedColor === color.hex && (
              <span className="check-mark">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
