import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { NavList } from '../components/nav'
import { PrimaryButton } from '../components/button'
import { navItems } from '../data/nav'
import logoMark from '../assets/logo-mark.svg'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="navbar relative bg-surface-tint">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4 md:px-8">
        <div className="flex gap-2">
          <img src={logoMark} alt="Clinician Reviewed" width={40} height={40} className="logo-mark" />
          <div className="logo text-left flex flex-col">
            <span className="text-lg font-black">Clinician Reviewed</span>
            <span className="text-[.5rem] uppercase font-extrabold text-brand-primary">Dental · First of Our Specialties</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center items-center gap-4">
          <nav className="nav" aria-label="Primary">
            <NavList className="flex gap-4" items={navItems} />
          </nav>
          <PrimaryButton href="#contact">Book a Free Consult</PrimaryButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-xl"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative grid size-[1em] place-items-center">
            <FontAwesomeIcon
              icon={faBars}
              aria-hidden="true"
              className={`col-start-1 row-start-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <FontAwesomeIcon
              icon={faXmark}
              aria-hidden="true"
              className={`col-start-1 row-start-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <section
        id="mobile-menu"
        inert={!open}
        data-open={open}
        className={`mobile-menu md:hidden absolute inset-x-0 top-full z-50 origin-top bg-surface-tint p-4 shadow-lg transition-[opacity,transform,visibility] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 opacity-100 duration-300'
            : 'invisible -translate-y-2 opacity-0 duration-200'
        }`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false)
        }}
      >
        <nav aria-label="Mobile">
          <NavList className="flex flex-col gap-4 mb-4" items={navItems} />
        </nav>
        <div className="mobile-menu-cta">
          <PrimaryButton href="#contact">Book a Free Consult</PrimaryButton>
        </div>
      </section>
    </header>
  )
}
