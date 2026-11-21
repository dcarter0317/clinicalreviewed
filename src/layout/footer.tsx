import logoMark from '../assets/logo-mark.svg'
import { footerBrand, footerGroups, footerLegal } from '../data/footer'

const year = new Date().getFullYear()

const link =
  'text-footer-ink no-underline transition-colors duration-200 hover:text-white hover:underline ' +
  'focus-visible:rounded-sm focus-visible:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun'

export default function Footer() {
  return (
    <footer className="bg-ink-navy text-left text-footer-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-section-sm md:px-8">
        <div className="grid gap-2xl md:grid-cols-[1.5fr_0.8fr_1.2fr_1.2fr] md:gap-3xl">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-sm">
              <img src={logoMark} alt="" width={40} height={40} className="logo-mark" />
              <span className="font-heading text-logo-wordmark font-black whitespace-nowrap text-white">{footerBrand.name}</span>
            </div>
            <p className="m-0 mt-md max-w-[24rem] text-caption text-footer-ink">{footerBrand.blurb}</p>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 id={`footer-${group.id}`} className="m-0 mb-md font-heading text-h4 text-white">
                {group.title}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-sm p-0 text-caption">
                {group.links.map(({ id, label, href }) => (
                  <li key={id}>
                    {href ? (
                      <a href={href} className={link}>
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-3xl flex flex-col gap-sm border-t border-footer-border pt-lg text-caption text-footer-muted md:flex-row md:items-center md:justify-between md:gap-xl">
          <p className="m-0">
            © {year} {footerLegal.copyright}
          </p>
          <p className="m-0">{footerLegal.accessibility}</p>
        </div>
      </div>
    </footer>
  )
}
