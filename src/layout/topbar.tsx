import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Topbar() {
  return (
    <header className="topbar bg-ink-navy text-surface-tint-deep text-sm">
     <div className="mx-auto flex w-full max-w-6xl items-center justify-around p-4 md:justify-between md:px-8">
      <div className="hidden md:block">
        <p>
          <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" className="mr-2" />
          New York, NY — serving dental practices nationwide
        </p>
      </div>
      <div className="flex gap-4">
        <p>
          <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="mr-2" />
          (212) 555-0142
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="mr-2" />
          hello@clinicianreviewed.com
        </p>
      </div>
     </div>
    </header>
  )
}
