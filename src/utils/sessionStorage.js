export function saveSession(childId, module, accuracy, duration) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')

  sessions.push({
    id: Date.now(),
    childId,
    module,
    accuracy: Math.round(accuracy),
    duration,
    date: new Date().toISOString(),
    timestamp: Date.now()
  })

  localStorage.setItem('sessions', JSON.stringify(sessions))
  return sessions
}

export function getSessions(childId) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
  return sessions.filter(s => s.childId === childId).sort((a, b) => b.timestamp - a.timestamp)
}

export function getWeeklyStats(childId) {
  const sessions = getSessions(childId)
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
  const weekSessions = sessions.filter(s => s.timestamp > oneWeekAgo)

  const byModule = {}
  weekSessions.forEach(s => {
    if (!byModule[s.module]) {
      byModule[s.module] = { count: 0, totalAccuracy: 0 }
    }
    byModule[s.module].count++
    byModule[s.module].totalAccuracy += s.accuracy
  })

  const stats = {}
  Object.keys(byModule).forEach(module => {
    stats[module] = {
      sessions: byModule[module].count,
      avgAccuracy: Math.round(byModule[module].totalAccuracy / byModule[module].count)
    }
  })

  return stats
}

export function getModuleProgress(childId, module) {
  const sessions = getSessions(childId).filter(s => s.module === module)
  if (sessions.length === 0) return { completed: 0, avgAccuracy: 0, trend: 'new' }

  const avgAccuracy = Math.round(
    sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
  )

  const recentAccuracy = sessions.slice(0, 5).map(s => s.accuracy)
  let trend = 'stable'
  if (recentAccuracy.length >= 2) {
    const firstHalf = recentAccuracy.slice(0, Math.ceil(recentAccuracy.length / 2))
    const secondHalf = recentAccuracy.slice(Math.ceil(recentAccuracy.length / 2))
    const avgFirst = firstHalf.reduce((a, b) => a + b) / firstHalf.length
    const avgSecond = secondHalf.reduce((a, b) => a + b) / secondHalf.length
    trend = avgSecond > avgFirst ? 'improving' : avgSecond < avgFirst ? 'declining' : 'stable'
  }

  return {
    completed: sessions.length,
    avgAccuracy,
    trend
  }
}

export function exportSessionsJSON(childId) {
  const childProfile = JSON.parse(localStorage.getItem('childProfile') || '{}')
  const sessions = getSessions(childId)

  const exportData = {
    child: childProfile,
    exportedAt: new Date().toISOString(),
    sessions,
    summary: {
      totalSessions: sessions.length,
      avgAccuracy: sessions.length > 0
        ? Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length)
        : 0,
      moduleBreakdown: getWeeklyStats(childId)
    }
  }

  return JSON.stringify(exportData, null, 2)
}
