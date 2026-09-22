import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { COUNTRIES } from '../data/countries.js'
import { setSelectedCountry } from '../utils/storage.js'

export default function Onboarding() {
  const navigate = useNavigate()

  function handleSelect(countryId) {
    setSelectedCountry(countryId)
    navigate('/dashboard')
  }

  return (
    <div className="device-scroll">
      <div className="onboarding-hero">
        <div className="onboarding-mark">E</div>
        <h1>Mau studi ke negara mana?</h1>
        <p>
          Pilih tujuanmu, dan EduPathway langsung menyiapkan roadmap dokumen
          serta checklist persiapannya — semua tersimpan di perangkatmu.
        </p>
      </div>

      <div className="country-list">
        {COUNTRIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="country-card"
            onClick={() => handleSelect(c.id)}
          >
            <span className="country-flag">{c.flag}</span>
            <span className="country-info">
              <h3>{c.name}</h3>
              <p>{c.tagline}</p>
            </span>
            <ChevronRight className="country-arrow" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  )
}
