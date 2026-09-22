import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, MessageCircleMore } from 'lucide-react'
import { getCountryById } from '../data/countries.js'
import { getChecklistState, setTaskDone, clearSelectedCountry } from '../utils/storage.js'
import ProgressRing from '../components/ProgressRing.jsx'

function captionFor(percent) {
  if (percent === 100) return 'Siap Berangkat! 🎉'
  if (percent >= 70) return 'Hampir siap, tinggal sedikit lagi'
  if (percent >= 30) return 'Terus semangat, jalan terus'
  return 'Baru mulai, satu per satu ya'
}

export default function Dashboard({ countryId }) {
  const navigate = useNavigate()
  const country = getCountryById(countryId)
  const taskIds = useMemo(() => country.tasks.map((t) => t.id), [country])
  const [checklist, setChecklist] = useState(() => getChecklistState(country.id, taskIds))

  const doneCount = taskIds.filter((id) => checklist[id]).length
  const percent = Math.round((doneCount / taskIds.length) * 100)

  const groups = useMemo(() => {
    const map = new Map()
    for (const task of country.tasks) {
      if (!map.has(task.category)) map.set(task.category, [])
      map.get(task.category).push(task)
    }
    return Array.from(map.entries())
  }, [country])

  function toggle(taskId) {
    const next = setTaskDone(country.id, taskId, !checklist[taskId], taskIds)
    setChecklist(next)
  }

  function handleChangeCountry() {
    clearSelectedCountry()
    navigate('/')
  }

  return (
    <div className="device-scroll">
      <div className="dash-header">
        <div className="dash-country">
          <span className="country-flag">{country.flag}</span>
          <div>
            <div className="dash-country-name">Tujuan studi</div>
            <h3>{country.name}</h3>
          </div>
        </div>
        <button type="button" className="link-quiet" onClick={handleChangeCountry}>
          Ganti negara
        </button>
      </div>

      <div className="progress-block">
        <ProgressRing percent={percent} />
        <p className="progress-caption">{captionFor(percent)}</p>
        <p className="progress-sub">
          {doneCount} dari {taskIds.length} dokumen sudah beres
        </p>
      </div>

      {groups.map(([category, tasks]) => (
        <div className="checklist-group" key={category}>
          <p className="checklist-group-title">{category}</p>
          <div className="card">
            <div style={{ padding: '4px 14px' }}>
              {tasks.map((task) => {
                const done = Boolean(checklist[task.id])
                return (
                  <div
                    key={task.id}
                    className={`checklist-item${done ? ' done' : ''}`}
                    onClick={() => toggle(task.id)}
                    role="checkbox"
                    aria-checked={done}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggle(task.id)
                      }
                    }}
                  >
                    <span className="checklist-check">
                      <Check strokeWidth={3} />
                    </span>
                    <span className="checklist-label">{task.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="card dash-cta" onClick={() => navigate('/kontak-agen')} style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
        <MessageCircleMore color="var(--gold-strong)" />
        <span style={{ textAlign: 'left' }}>
          <strong>Butuh bantuan?</strong>
          <p>Hubungi {country.agent} lewat pesan siap-kirim</p>
        </span>
      </button>
    </div>
  )
}
