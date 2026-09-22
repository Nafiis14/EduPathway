import { useEffect, useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { getCountryById } from '../data/countries.js'
import { getProfile, setProfile } from '../utils/storage.js'
import { buildMessageText, buildWhatsAppLink, buildEmailLink } from '../utils/message.js'

export default function ContactAgent({ countryId }) {
  const country = getCountryById(countryId)
  const saved = getProfile()

  const [name, setName] = useState(saved.name)
  const [major, setMajor] = useState(saved.major)
  const [channel, setChannel] = useState('whatsapp')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setProfile({ name, major })
  }, [name, major])

  const message = buildMessageText({
    name,
    major,
    country: country.name,
    agent: country.agent,
  })

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API tidak tersedia — pengguna bisa salin manual dari kotak teks.
    }
  }

  function handleSend() {
    if (channel === 'whatsapp') {
      window.open(buildWhatsAppLink(message), '_blank')
    } else {
      window.location.href = buildEmailLink({
        subject: `Konsultasi Studi ke ${country.name}`,
        body: message,
      })
    }
  }

  return (
    <div className="device-scroll">
      <div className="page-title-block">
        <h1>Hubungi {country.agent}</h1>
        <p>Isi data singkat ini, EduPathway rakit pesannya untukmu.</p>
      </div>

      <div className="field" style={{ marginBottom: 14 }}>
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          placeholder="Nama lengkap kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field" style={{ marginBottom: 18 }}>
        <label htmlFor="major">Jurusan</label>
        <input
          id="major"
          type="text"
          placeholder="Contoh: Sistem Informasi"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </div>

      <div className="channel-toggle" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={channel === 'whatsapp' ? 'active' : ''}
          onClick={() => setChannel('whatsapp')}
        >
          <MessageCircle strokeWidth={2} />
          WhatsApp
        </button>
        <button
          type="button"
          className={channel === 'email' ? 'active' : ''}
          onClick={() => setChannel('email')}
        >
          <Mail strokeWidth={2} />
          Email
        </button>
      </div>

      <div className="card message-preview" style={{ marginBottom: 16 }}>
        {message}
      </div>

      <div className="contact-actions">
        <button type="button" className="btn btn-primary btn-block" onClick={handleSend}>
          {channel === 'whatsapp' ? 'Buka di WhatsApp' : 'Buka di Email'}
        </button>
        <button type="button" className="btn btn-outline btn-block" onClick={handleCopy}>
          Salin pesan
        </button>
        {copied && <p className="copy-feedback">Pesan tersalin ✓</p>}
      </div>
    </div>
  )
}
