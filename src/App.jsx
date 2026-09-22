import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getSelectedCountry } from './utils/storage.js'
import BottomNav from './components/BottomNav.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ContactAgent from './pages/ContactAgent.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

// HashRouter dipakai supaya build statis ini bisa dihosting di mana saja
// (GitHub Pages, dsb.) tanpa perlu konfigurasi server untuk client-side
// routing — sejalan dengan syarat "frontend saja, tanpa backend".

function RequireCountry({ children }) {
  const countryId = getSelectedCountry()
  if (!countryId) return <Navigate to="/" replace />
  return children(countryId)
}

function Shell() {
  const location = useLocation()
  const showNav = location.pathname !== '/'

  return (
    <div className="device-shell">
      <div className="device-frame">
        <div className="device-screen">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route
              path="/dashboard"
              element={<RequireCountry>{(id) => <Dashboard countryId={id} />}</RequireCountry>}
            />
            <Route
              path="/kontak-agen"
              element={<RequireCountry>{(id) => <ContactAgent countryId={id} />}</RequireCountry>}
            />
            <Route path="/profil" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {showNav && <BottomNav />}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
