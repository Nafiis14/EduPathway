import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, BadgeCheck } from 'lucide-react'
import { getProfile, setProfile, resetAllData } from '../utils/storage.js'

export default function Profile() {
  const navigate = useNavigate()
  const saved = getProfile()
  const [name, setName] = useState(saved.name)
  const [nim, setNim] = useState(saved.nim)

  function handleBlurSave() {
    setProfile({ name, nim })
  }

  function handleReset() {
    const ok = window.confirm(
      'Hapus semua data EduPathway di perangkat ini? Progres checklist, negara pilihan, dan profil akan hilang.'
    )
    if (ok) {
      resetAllData()
      navigate('/')
    }
  }

  return (
    <div className="device-scroll">
      <div className="page-title-block">
        <h1>Profil</h1>
        <span className="profile-role">
          <BadgeCheck size={14} />
          Perancang UI/UX aplikasi ini
        </span>
      </div>

      <div className="field" style={{ marginBottom: 14 }}>
        <label htmlFor="pname">Nama</label>
        <input
          id="pname"
          type="text"
          placeholder="Nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlurSave}
        />
      </div>

      <div className="field" style={{ marginBottom: 22 }}>
        <label htmlFor="nim">NIM</label>
        <input
          id="nim"
          type="text"
          placeholder="Nomor Induk Mahasiswa"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          onBlur={handleBlurSave}
        />
      </div>

      <hr className="divider-dashed" />

      <div className="card rating-card">
        <div className="rating-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} fill={i < 4 ? 'var(--gold)' : 'none'} strokeWidth={1.5} />
          ))}
        </div>
        <p className="rating-score">4.7 / 5.0</p>
        <p className="review-quote">
          "Aplikasi yang sangat ringan! Saya suka karena tidak perlu repot
          bikin akun atau login. Checklist-nya sangat membantu saya menyusun
          dokumen sebelum menghubungi agen konselor."
        </p>
        <p className="review-author">— Pengguna Simulasi</p>
      </div>

      <div className="danger-zone">
        <button type="button" onClick={handleReset}>
          Reset semua data
        </button>
      </div>
    </div>
  )
}
