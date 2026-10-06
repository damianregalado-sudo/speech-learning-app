import { useState, useEffect } from 'react'
import Home from './pages/Home'
import ColoringPage from './pages/ColoringPage'
import TracingPage from './pages/TracingPage'
import './styles/App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [childProfile, setChildProfile] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('childProfile')
    if (saved) {
      setChildProfile(JSON.parse(saved))
    }
  }, [])

  const startSession = (profile, page = 'coloring') => {
    setChildProfile(profile)
    localStorage.setItem('childProfile', JSON.stringify(profile))
    setCurrentPage(page)
  }

  const goHome = () => {
    setCurrentPage('home')
  }

  const goToActivity = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app-container">
      {currentPage === 'home' ? (
        <Home
          onStart={startSession}
          onSelectActivity={goToActivity}
          childProfile={childProfile}
        />
      ) : currentPage === 'coloring' ? (
        <ColoringPage childProfile={childProfile} onBack={goHome} />
      ) : currentPage === 'tracing' ? (
        <TracingPage childProfile={childProfile} onBack={goHome} />
      ) : null}
    </div>
  )
}
