import { useState, useEffect } from 'react'
import Home from './pages/Home'
import ColoringPage from './pages/ColoringPage'
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

  const startSession = (profile) => {
    setChildProfile(profile)
    localStorage.setItem('childProfile', JSON.stringify(profile))
    setCurrentPage('coloring')
  }

  const goHome = () => {
    setCurrentPage('home')
  }

  return (
    <div className="app-container">
      {currentPage === 'home' ? (
        <Home onStart={startSession} childProfile={childProfile} />
      ) : (
        <ColoringPage childProfile={childProfile} onBack={goHome} />
      )}
    </div>
  )
}
