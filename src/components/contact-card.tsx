import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Button from './button'
import type { ButtonVariant } from './button'

/**
 * Contact card: a titled panel that lists contact details or key/value facts. Content is
 * described as data, so one component covers "Our Studio" and "Response Hours" style cards.
 *
 * Item types (`items`):
 *  - line:   an icon + text row, optionally a link (address, phone, email).
 *  - detail: a label on the left, a value on the right, with a dashed divider
 *            between rows (hours, turnaround times).
 *
 * Tones (`tone`):
 *  - tint   surface-tint fill, no border. Default.
 *  - dark   ink-navy fill, white text. Pairs with a tint card side by side.
 *  - white  white fill, border-line border. Quietest option, e.g. on a tinted section.
 *
 * Alignment (`align`: 'left' | 'center' | 'right', default 'left') sets the title, the lines and the
 * action together. Lines keep their icon next to the text (icon on the right edge when right-aligned).
 * Detail rows are split label/value when left-aligned and stack (label above value) when centered or
 * right-aligned, since a split row has no center or right edge to align to.
 *
 * Optional `action` renders a Button under the list, pinned to the bottom of the card so
 * buttons line up across cards of different heights (`variant` defaults to 'primary';
 * use 'sun' on the dark tone). Same rule as everywhere: one filled button per card.
 *
 * Surface: rounded-panel-lg, p-2xl. Read-only; only the lines with an `href` and the action are interactive.
 * Renders a <section>. Accepts `className` (appended last).
 */

export type ContactTone = 'tint' | 'dark' | 'white'

export type ContactAlign = 'left' | 'center' | 'right'

export type ContactLine = {
  type: 'line'
  id: string
  /** Emoji string, a Font Awesome icon definition (e.g. faPhone), or any element. */
  icon: ReactNode | IconDefinition
  text: ReactNode
  /** Makes the text a link, e.g. "tel:+12125550142" or "mailto:hello@example.com". */
  href?: string
}

export type ContactDetail = {
  type: 'detail'
  id: string
  label: ReactNode
  value: ReactNode
}

export type ContactItem = ContactLine | ContactDetail

export type ContactAction = {
  label: ReactNode
  href: string
  /** Default 'primary'. */
  variant?: ButtonVariant
  /** Optional trailing icon, e.g. <FontAwesomeIcon icon={faArrowRight} />. */
  trailingIcon?: ReactNode
}

export type ContactCardProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'> & {
  title: ReactNode
  items: ContactItem[]
  /** Surface and text colors. Default 'tint'. */
  tone?: ContactTone
  /** Text alignment for the title, items and action. Default 'left'. */
  align?: ContactAlign
  /** Optional call to action under the list. */
  action?: ContactAction
  /** Heading element, so the card fits the page outline. Default "h3". */
  headingAs?: 'h2' | 'h3' | 'h4'
}

// Static strings so Tailwind can detect every class.
const surfaces: Record<ContactTone, string> = {
  tint: 'bg-surface-tint',
  dark: 'bg-ink-navy',
  white: 'border-[1.5px] border-border-line bg-white',
}

const titleTones: Record<ContactTone, string> = {
  tint: 'text-ink-navy',
  dark: 'text-white',
  white: 'text-ink-navy',
}

const textTones: Record<ContactTone, string> = {
  tint: 'text-ink-body',
  dark: 'text-footer-ink',
  white: 'text-ink-body',
}

const labelTones: Record<ContactTone, string> = {
  tint: 'text-ink-navy',
  dark: 'text-white',
  white: 'text-ink-navy',
}

const iconTones: Record<ContactTone, string> = {
  tint: 'text-brand-primary-dark',
  dark: 'text-brand-primary-light',
  white: 'text-brand-primary-dark',
}

const linkTones: Record<ContactTone, string> = {
  tint: 'text-brand-primary-dark',
  dark: 'text-white',
  white: 'text-brand-primary-dark',
}

const dividerTones: Record<ContactTone, string> = {
  tint: 'border-surface-tint-deep',
  dark: 'border-footer-border',
  white: 'border-border-line',
}

const titleAligns: Record<ContactAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const lineAligns: Record<ContactAlign, string> = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'flex-row-reverse justify-start text-right',
}

const detailAligns: Record<ContactAlign, string> = {
  left: 'flex-row flex-wrap items-baseline justify-between gap-y-1 text-left',
  center: 'flex-col items-center gap-1 text-center',
  right: 'flex-col items-end gap-1 text-right',
}

const valueAligns: Record<ContactAlign, string> = {
  left: 'ml-auto text-right',
  center: 'text-center',
  right: 'text-right',
}

const actionAligns: Record<ContactAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const isIconDefinition = (v: unknown): v is IconDefinition =>
  typeof v === 'object' && v !== null && 'iconName' in v && 'prefix' in v

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

const link =
  'font-bold underline underline-offset-2 transition-colors duration-200 hover:text-brand-primary ' +
  'focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun'

function Line({ icon, text, href, tone, align }: Omit<ContactLine, 'type' | 'id'> & { tone: ContactTone; align: ContactAlign }) {
  return (
    <li className={cx('flex items-center gap-sm', lineAligns[align])}>
      <span aria-hidden="true" className={cx('flex w-6 shrink-0 justify-center text-[1.05rem] leading-none', iconTones[tone])}>
        {isIconDefinition(icon) ? <FontAwesomeIcon icon={icon} /> : icon}
      </span>
      {href ? (
        <a href={href} className={cx('font-body text-[1.05rem] leading-normal', link, linkTones[tone])}>
          {text}
        </a>
      ) : (
        <span className={cx('font-body text-[1.05rem] leading-normal', textTones[tone])}>{text}</span>
      )}
    </li>
  )
}

function Detail({ label, value, tone, align }: Omit<ContactDetail, 'type' | 'id'> & { tone: ContactTone; align: ContactAlign }) {
  return (
    <li
      className={cx(
        'flex gap-md border-b border-dashed py-md first:pt-0 last:border-b-0 last:pb-0',
        detailAligns[align],
        dividerTones[tone],
      )}
    >
      <span className={cx('font-heading text-[1.05rem] leading-tight font-extrabold whitespace-nowrap', labelTones[tone])}>{label}</span>
      <span className={cx('font-body text-[1.05rem] leading-normal whitespace-nowrap', valueAligns[align], textTones[tone])}>{value}</span>
    </li>
  )
}

export default function ContactCard({
  title,
  items,
  tone = 'tint',
  align = 'left',
  action,
  headingAs: Heading = 'h3',
  className,
  ...rest
}: ContactCardProps) {
  // Lines sit closer together than divided detail rows; a mixed list keeps both spacings.
  const allDetails = items.every((i) => i.type === 'detail')

  return (
    <section {...rest} className={cx('flex h-full flex-col rounded-panel-lg p-2xl', surfaces[tone], className)}>
      <Heading className={cx('m-0 mb-lg font-heading text-h3 font-black', titleAligns[align], titleTones[tone])}>{title}</Heading>

      <ul className={cx('m-0 flex list-none flex-col p-0', allDetails ? '' : 'gap-md')}>
        {items.map((item) =>
          item.type === 'line' ? (
            <Line key={item.id} {...item} tone={tone} align={align} />
          ) : (
            <Detail key={item.id} {...item} tone={tone} align={align} />
          ),
        )}
      </ul>

      {action && (
        <div className={cx('mt-auto flex pt-xl', actionAligns[align])}>
          <Button href={action.href} variant={action.variant ?? 'primary'} trailingIcon={action.trailingIcon}>
            {action.label}
          </Button>
        </div>
      )}
    </section>
  )
}

/* ---- Named wrappers, one per tone, so call sites read naturally ---- */

type ToneProps = Omit<ContactCardProps, 'tone'>

export const ContactCardTint = (p: ToneProps) => <ContactCard {...p} tone="tint" />
export const ContactCardDark = (p: ToneProps) => <ContactCard {...p} tone="dark" />
export const ContactCardWhite = (p: ToneProps) => <ContactCard {...p} tone="white" />

/* ---- Config-driven group ---- */

/** One card, fully described as data. Anything ContactCard accepts can be set per item. */
export type ContactCardEntry = ContactCardProps & {
  /** Stable key. */
  id: string
}

type GroupColumns = 1 | 2 | 3

type ContactCardGroupProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  cards: ContactCardEntry[]
  /** Columns at the widest breakpoint (1 below md). Default: card count, max 3. */
  columns?: GroupColumns
  /** Default heading element for cards that don't set `headingAs`. Default "h3". */
  headingAs?: ContactCardProps['headingAs']
  /** Default alignment for cards that don't set `align`. Default 'left'. */
  align?: ContactAlign
}

// Static strings so Tailwind can detect every class.
const columnClasses: Record<GroupColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}

/** Responsive grid that renders one ContactCard per entry; cards share the height of the tallest. */
export function ContactCardGroup({ cards, columns, headingAs, align, className, ...rest }: ContactCardGroupProps) {
  const cols = (columns ?? Math.min(Math.max(cards.length, 1), 3)) as GroupColumns
  return (
    <div {...rest} className={cx('grid auto-rows-fr items-stretch gap-xl', columnClasses[cols], className)}>
      {cards.map(({ id, ...card }) => (
        <ContactCard key={id} {...card} headingAs={card.headingAs ?? headingAs} align={card.align ?? align} />
      ))}
    </div>
  )
}
