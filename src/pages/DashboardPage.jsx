import { useMemo } from 'react'
import { getSessions, getWeeklyStats, exportSessionsJSON } from '../utils/sessionStorage'
import '../styles/DashboardPage.css'

export default function DashboardPage({ childProfile, onBack }) {
  const sessions = useMemo(() => getSessions(childProfile.id), [childProfile.id])
  const weeklyStats = useMemo(() => getWeeklyStats(childProfile.id), [childProfile.id])

  const stats = useMemo(() => {
    const byModule = {}
    sessions.forEach(s => {
      if (!byModule[s.module]) {
        byModule[s.module] = { sessions: 0, totalAccuracy: 0 }
      }
      byModule[s.module].sessions++
      byModule[s.module].totalAccuracy += s.accuracy
    })

    const results = {}
    Object.keys(byModule).forEach(m => {
      results[m] = {
        sessions: byModule[m].sessions,
        avgAccuracy: Math.round(byModule[m].totalAccuracy / byModule[m].sessions)
      }
    })
    return results
  }, [sessions])

  const totalSessions = sessions.length
  const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length)
    : 0
  const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / 60)

  const handleExport = () => {
    const json = exportSessionsJSON(childProfile.id)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `reporte_${childProfile.name}_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const modules = ['colorear', 'tracing', 'pronunciation', 'reading']
  const moduleNames = { colorear: 'Colorear', tracing: 'Trazo', pronunciation: 'Pronunciación', reading: 'Lectura' }
  const moduleColors = { colorear: '#FF9800', tracing: '#2196F3', pronunciation: '#9C27B0', reading: '#4CAF50' }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>📊 Mi Progreso</h2>
        <p>{childProfile.name}, {childProfile.age} años</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Sesiones</h3>
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-unit">completadas</div>
        </div>
        <div className="stat-card">
          <h3>Precisión Promedio</h3>
          <div className="stat-value">{avgAccuracy}%</div>
          <div className="stat-unit">promedio</div>
        </div>
        <div className="stat-card">
          <h3>Tiempo Total</h3>
          <div className="stat-value">{totalMinutes}</div>
          <div className="stat-unit">minutos</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Precisión por Módulo</h3>
          <div className="chart">
            {modules.map(m => (
              <div
                key={m}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div
                  className="chart-bar"
                  style={{
                    height: `${(stats[m]?.avgAccuracy || 0) * 2}px`,
                    backgroundColor: moduleColors[m]
                  }}
                >
                  {stats[m]?.avgAccuracy && (
                    <span className="chart-bar-value">{stats[m].avgAccuracy}%</span>
                  )}
                </div>
                <span className="chart-bar-label">{moduleNames[m]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>Sesiones por Módulo</h3>
          <div className="chart">
            {modules.map(m => (
              <div
                key={m}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div
                  className="chart-bar"
                  style={{
                    height: `${Math.min(200, (stats[m]?.sessions || 0) * 20)}px`,
                    backgroundColor: moduleColors[m]
                  }}
                >
                  {stats[m]?.sessions && (
                    <span className="chart-bar-value">{stats[m].sessions}</span>
                  )}
                </div>
                <span className="chart-bar-label">{moduleNames[m]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sessions.length > 0 && (
        <div className="sessions-table">
          <h3>Últimas Sesiones</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Módulo</th>
                <th>Precisión</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 10).map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.date).toLocaleDateString('es-ES')}</td>
                  <td>
                    <span className={`module-badge ${s.module}`}>
                      {moduleNames[s.module]}
                    </span>
                  </td>
                  <td>{s.accuracy}%</td>
                  <td>{Math.round(s.duration / 60)}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <button onClick={handleExport} className="export-button">
          📥 Exportar Datos
        </button>
        <button onClick={onBack} className="btn-primary" style={{ marginLeft: '10px' }}>
          ← Volver
        </button>
      </div>
    </div>
  )
}
