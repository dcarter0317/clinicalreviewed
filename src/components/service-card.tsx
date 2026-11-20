import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Service card: the repeating unit in the services grid. A tinted circular
 * icon tile sits above a heading and a short description; the whole card is a link.
 *
 * Variants (`tint`): 1 | 2 | 3 | 4 map to icon-tint-1..4 behind the icon.
 *
 *  - Tile:    64px circle, emoji (or Font Awesome icon) centered.
 *  - Card:    p-xl, rounded-card, 1.5px border-line border, no resting chrome.
 *  - Hover:   lifts 6px, border turns brand-primary, soft shadow. The border change
 *             is the main "this is clickable" signal.
 *  - Focus:   same border change plus the sun outline used by Button.
 *
 * Renders an <a> (`href` required). Accepts `className` for one-off overrides (appended last).
 */

export type ServiceCardTint = 1 | 2 | 3 | 4

type ServiceCardProps = Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'title'> & {
  href: string
  /** Heading text. */
  title: ReactNode
  /** Short description. */
  description: ReactNode
  /** Icon tile background, icon-tint-1..4. Default 1. */
  tint?: ServiceCardTint
  /**
   * Emoji string, a Font Awesome icon definition (e.g. faTooth), or any element.
   * Passing the definition keeps config as plain data.
   */
  icon: ReactNode | IconDefinition
  /** Heading element, so the card fits the page outline. Default "h3". */
  headingAs?: 'h2' | 'h3' | 'h4'
}

// Static strings so Tailwind can detect every class.
const tintClasses: Record<ServiceCardTint, string> = {
  1: 'bg-icon-tint-1',
  2: 'bg-icon-tint-2',
  3: 'bg-icon-tint-3',
  4: 'bg-icon-tint-4',
}

const card =
  'group flex h-full flex-col items-center gap-md rounded-card border-[1.5px] border-border-line bg-white p-xl text-center no-underline ' +
  'transition-[transform,border-color,box-shadow] duration-200 ' +
  'hover:-translate-y-1.5 hover:border-brand-primary hover:shadow-[0_14px_32px_rgba(23,63,76,0.10)] ' +
  'focus-visible:-translate-y-1.5 focus-visible:border-brand-primary focus-visible:shadow-[0_14px_32px_rgba(23,63,76,0.10)] ' +
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0'

const isIconDefinition = (v: unknown): v is IconDefinition =>
  typeof v === 'object' && v !== null && 'iconName' in v && 'prefix' in v

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export default function ServiceCard({
  href,
  title,
  description,
  tint = 1,
  icon,
  headingAs: Heading = 'h3',
  className,
  ...rest
}: ServiceCardProps) {
  return (
    <a {...rest} href={href} className={cx(card, className)}>
      <span
        aria-hidden="true"
        className={cx(
          'flex size-16 shrink-0 items-center justify-center rounded-full text-[1.9rem] leading-none text-brand-primary-dark',
          tintClasses[tint],
        )}
      >
        {isIconDefinition(icon) ? <FontAwesomeIcon icon={icon} /> : icon}
      </span>
      <Heading className="m-0 font-heading text-h4 font-extrabold text-ink-navy">{title}</Heading>
      <p className="m-0 font-body text-[0.86rem] leading-normal text-ink-body">{description}</p>
    </a>
  )
}

/* ---- Named wrappers, one per tint, so call sites read naturally ---- */

type TintProps = Omit<ServiceCardProps, 'tint'>

export const ServiceCardTint1 = (p: TintProps) => <ServiceCard {...p} tint={1} />
export const ServiceCardTint2 = (p: TintProps) => <ServiceCard {...p} tint={2} />
export const ServiceCardTint3 = (p: TintProps) => <ServiceCard {...p} tint={3} />
export const ServiceCardTint4 = (p: TintProps) => <ServiceCard {...p} tint={4} />

/* ---- Config-driven grid ---- */

/**
 * One card, fully described as data: content plus every variant option.
 * Anything ServiceCard accepts can be set per item.
 */
export type ServiceCardItem = Omit<ServiceCardProps, 'tint'> & {
  /** Stable key. */
  id: string
  /** Icon tile tint. Omit to use the grid's `tint` (or cycle 1-4 by position). */
  tint?: ServiceCardTint
}

type GridColumns = 1 | 2 | 3 | 4

type ServiceCardGridProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  items: ServiceCardItem[]
  /** Columns at the widest breakpoint (1 / 2 at sm / n at lg). Default 4. */
  columns?: GridColumns
  /** One tint for every card without its own. Default: cycle 1-4 by position. */
  tint?: ServiceCardTint
  /** Default heading element for cards that don't set `headingAs`. Default "h3". */
  headingAs?: ServiceCardProps['headingAs']
}

// Static strings so Tailwind can detect every class.
const columnClasses: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const tints: ServiceCardTint[] = [1, 2, 3, 4]

/**
 * Responsive grid that renders one ServiceCard per item. All cards share the height
 * of the tallest one (auto-rows-fr equalises rows, h-full stretches each card).
 */
export function ServiceCardGrid({ items, columns = 4, tint, headingAs, className, ...rest }: ServiceCardGridProps) {
  return (
    <div {...rest} className={cx('grid auto-rows-fr items-stretch gap-lg', columnClasses[columns], className)}>
      {items.map(({ id, ...item }, i) => (
        <ServiceCard
          key={id}
          {...item}
          tint={item.tint ?? tint ?? tints[i % tints.length]}
          headingAs={item.headingAs ?? headingAs}
        />
      ))}
    </div>
  )
}
