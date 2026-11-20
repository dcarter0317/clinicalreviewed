import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Testimonial card: quote card for the testimonials grid.
 *
 *  - Surface: surface-tint fill, no border. The color is enough to separate it from the white page.
 *  - Quote:   oversized decorative quote mark bleeding off the top-left corner (clipped by the card).
 *  - Stars:   accent-sun, five Font Awesome stars, spaced. Decorative; the rating is exposed via aria-label.
 *  - Attribution: name in Nunito 800 ink-navy, role/location in a smaller brand-primary-dark line beneath.
 *  - Hover:   none. Read-only, not a link.
 *
 * Renders a <figure> with a <blockquote> and <figcaption>. Accepts `className` (appended last).
 */

type TestimonialCardProps = Omit<ComponentPropsWithoutRef<'figure'>, 'children'> & {
  /** The quote text (the card wraps it in quotation marks, don't include them). */
  quote: ReactNode
  /** Attribution name or title, e.g. "Practice Manager". */
  name: ReactNode
  /** Role / location line, e.g. "Pediatric Dentistry · Westchester, NY". */
  role?: ReactNode
  /** Star rating, 0-5. Default 5. */
  rating?: 0 | 1 | 2 | 3 | 4 | 5
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export default function TestimonialCard({ quote, name, role, rating = 5, className, ...rest }: TestimonialCardProps) {
  return (
    <figure
      {...rest}
      className={cx('relative m-0 flex h-full flex-col overflow-hidden rounded-card bg-surface-tint p-xl text-left', className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-3 select-none font-heading text-[7rem] leading-none font-black text-brand-primary-light/40"
      >
        “
      </span>

      <div
        role="img"
        aria-label={`${rating} out of 5 stars`}
        className="relative mt-md text-[1.3rem] leading-none tracking-[0.15em] text-accent-sun"
      >
        <span aria-hidden="true" className="inline-flex gap-1">
          {Array.from({ length: rating }, (_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
        </span>
      </div>

      <blockquote className="m-0 mt-md mb-lg font-body text-[1.05rem] leading-normal text-ink-body">&quot;{quote}&quot;</blockquote>

      {/* mt-auto pins the attribution to the bottom so cards of unequal quote length line up. */}
      <figcaption className="mt-auto">
        <span className="block font-heading text-[1.05rem] leading-tight font-extrabold text-ink-navy">{name}</span>
        {role && <span className="mt-1 block font-body text-[0.86rem] leading-snug font-bold text-brand-primary-dark">{role}</span>}
      </figcaption>
    </figure>
  )
}

/* ---- Config-driven grid ---- */

/** One testimonial, fully described as data. Anything TestimonialCard accepts can be set per item. */
export type TestimonialCardItem = TestimonialCardProps & {
  /** Stable key. */
  id: string
}

type GridColumns = 1 | 2 | 3

type TestimonialCardGridProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  items: TestimonialCardItem[]
  /** Columns at the widest breakpoint (1 / 2 at sm / n at lg). Default: item count, max 3. */
  columns?: GridColumns
}

// Static strings so Tailwind can detect every class.
const columnClasses: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}

/**
 * Responsive grid that renders one TestimonialCard per item. All cards in a row share the height
 * of the tallest one (auto-rows-fr equalises rows, h-full stretches each card).
 */
export function TestimonialCardGrid({ items, columns, className, ...rest }: TestimonialCardGridProps) {
  const cols = columns ?? (Math.min(Math.max(items.length, 1), 3) as GridColumns)
  return (
    <div {...rest} className={cx('grid auto-rows-fr items-stretch gap-lg', columnClasses[cols], className)}>
      {items.map(({ id, ...item }) => (
        <TestimonialCard key={id} {...item} />
      ))}
    </div>
  )
}
