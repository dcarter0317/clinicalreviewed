import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Topbar() {
  return (
    <header className="topbar flex items-center justify-between bg-ink-navy text-brand-primary p-4">
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
    </header>
  )
}
