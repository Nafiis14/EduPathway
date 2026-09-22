import { NavLink } from 'react-router-dom'
import { LayoutGrid, MessageCircleMore, UserRound } from 'lucide-react'

const ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/kontak-agen', label: 'Kontak Agen', icon: MessageCircleMore },
  { to: '/profil', label: 'Profil', icon: UserRound },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
          <Icon strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
