import { NavList } from '../components/nav'
import { navItems } from '../data/nav'

export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <NavList items={navItems} />
    </nav>
  )
}
