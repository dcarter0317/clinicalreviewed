import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Button from './button'
import { StatusPill } from './badge'

/**
 * Plan card: the repeating unit in the pricing grid. Name, frequency, price,
 * a checked feature list, and a CTA pinned to the bottom.
 *
 *  - Card:     p-xl, white, rounded-card, 2px transparent border, column flex so the CTA
 *              sits at the bottom whatever the list length.
 *  - Featured: border turns accent-sun, a floating "Most Popular" pill overlaps the top edge,
 *              and the CTA is the sun button (every other plan uses the outline button).
 *  - Price:    Nunito 900, 2.3rem, ink-navy. The `/mo` suffix is 0.85rem, regular, ink-body, same line.
 *  - Features: dashed border-line divider between rows, brand-primary check prefix.
 *  - Hover:    lifts 5px with a soft shadow, independent of featured state.
 *
 * Renders an <article>; the CTA is the only interactive element. Accepts `className` (appended last).
 */

type PlanCardProps = Omit<ComponentPropsWithoutRef<'article'>, 'children' | 'title'> & {
  /** Plan name, e.g. "Essentials". */
  name: ReactNode
  /** Frequency line under the name, e.g. "1× per month". */
  frequency?: ReactNode
  /** Price, e.g. "$495" or 495 (a "$" is added to numbers). */
  price: string | number
  /** Price suffix. Default "/mo". */
  period?: string
  /** Feature rows. */
  features: ReactNode[]
  /** CTA label. Default "Get Started". */
  ctaLabel?: ReactNode
  /** CTA destination. */
  ctaHref: string
  /** Recommended plan: sun border, floating badge, sun CTA. */
  featured?: boolean
  /** Floating badge text. Default star icon + "Most Popular". */
  badgeLabel?: ReactNode
  /** Heading element, so the card fits the page outline. Default "h3". */
  headingAs?: 'h2' | 'h3' | 'h4'
}

const card =
  'group relative flex h-full flex-col items-center rounded-card border-2 bg-white p-xl text-center ' +
  'transition-[transform,box-shadow] duration-200 ' +
  'hover:-translate-y-[5px] hover:shadow-[0_14px_32px_rgba(23,63,76,0.10)] ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0'

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export default function PlanCard({
  name,
  frequency,
  price,
  period = '/mo',
  features,
  ctaLabel = 'Get Started',
  ctaHref,
  featured = false,
  badgeLabel = (
    <>
      <FontAwesomeIcon icon={faStar} aria-hidden="true" className="mr-1" />
      Most Popular
    </>
  ),
  headingAs: Heading = 'h3',
  className,
  ...rest
}: PlanCardProps) {
  return (
    <article
      {...rest}
      className={cx(card, featured ? 'border-accent-sun' : 'border-transparent', className)}
    >
      {featured && (
        <StatusPill tone="sun" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          {badgeLabel}
        </StatusPill>
      )}

      <Heading className="m-0 font-heading text-[1.1rem] font-black text-ink-navy">{name}</Heading>
      {frequency && (
        <p className="m-0 mt-1 font-heading text-[0.72rem] font-extrabold text-brand-primary-dark">{frequency}</p>
      )}

      <p className="m-0 my-lg font-heading text-[2rem] font-black leading-none text-ink-navy">
        {typeof price === 'number' ? `$${price}` : price}
        <span className="text-[0.85rem] font-normal text-ink-body">{period}</span>
      </p>

      <ul className="m-0 mb-xl flex w-full list-none flex-col p-0">
        {features.map((feature, i) => (
          <li
            key={i}
            className="border-b border-dashed border-border-line py-sm font-body text-[0.8rem] leading-snug text-ink-body last:border-b-0"
          >
            <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="mr-1.5 text-brand-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <Button href={ctaHref} variant={featured ? 'sun' : 'outline'} className="mt-auto w-full">
        {ctaLabel}
      </Button>
    </article>
  )
}

/* ---- Config-driven grid ---- */

/** One plan, fully described as data. */
export type PlanCardItem = Omit<PlanCardProps, 'headingAs'> & {
  /** Stable key. */
  id: string
  headingAs?: PlanCardProps['headingAs']
}

type GridColumns = 1 | 2 | 3 | 4

type PlanCardGridProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  items: PlanCardItem[]
  /** Columns at the widest breakpoint (1 / 2 at sm / n at lg). Default: item count, max 4. */
  columns?: GridColumns
  /** Default heading element for cards that don't set `headingAs`. Default "h3". */
  headingAs?: PlanCardProps['headingAs']
}

// Static strings so Tailwind can detect every class.
const columnClasses: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

/** Responsive grid, one PlanCard per item; cards share the tallest card's height. */
export function PlanCardGrid({ items, columns, headingAs, className, ...rest }: PlanCardGridProps) {
  const cols = columns ?? (Math.min(Math.max(items.length, 1), 4) as GridColumns)
  return (
    // pt-md leaves room for the featured badge that overhangs the top edge.
    <div {...rest} className={cx('grid auto-rows-fr items-stretch gap-lg pt-md', columnClasses[cols], className)}>
      {items.map(({ id, ...item }) => (
        <PlanCard key={id} {...item} headingAs={item.headingAs ?? headingAs} />
      ))}
    </div>
  )
}
