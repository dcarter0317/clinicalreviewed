import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Small pill-shaped labels, four variants:
 *
 *  - tag     white fill, thin border-line border, brand-primary-dark text (feature chips)
 *  - kicker  white fill, soft shadow, uppercase brand-primary-dark text (eyebrow above H1)
 *  - status  solid fill (tone: primary | sun), e.g. "Double-Verified" + check-double icon, "Most Popular" + star icon
 *  - check   26px filled circle with a check icon (not a pill)
 *
 * Use <Badge variant="..."> or the named wrappers (Tag, Kicker, StatusPill, CheckBadge).
 * Every variant accepts `className` for one-off overrides (appended last).
 */

export type StatusTone = 'primary' | 'sun'

type BaseProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  /** Visible content. */
  children?: ReactNode
  /** Optional leading icon, e.g. <FontAwesomeIcon icon={faStar} />. */
  icon?: ReactNode
  /** Optional trailing icon, e.g. <FontAwesomeIcon icon={faCheckDouble} />. */
  trailingIcon?: ReactNode
}

type TagBadgeProps = BaseProps & { variant: 'tag' }
type KickerBadgeProps = BaseProps & { variant: 'kicker' }
type StatusBadgeProps = BaseProps & { variant: 'status'; tone?: StatusTone }
type CheckBadgeProps = Omit<BaseProps, 'children' | 'icon' | 'trailingIcon'> & {
  variant: 'check'
  /** Diameter in px. Default 26. */
  size?: number
  /** Icon shown inside the circle. Default: Font Awesome check. */
  glyph?: ReactNode
  /** Circle color. Default "primary". */
  tone?: StatusTone
}

export type BadgeProps =
  | TagBadgeProps
  | KickerBadgeProps
  | StatusBadgeProps
  | CheckBadgeProps

const pill = 'inline-flex items-center gap-1.5 rounded-pill font-heading whitespace-nowrap'

const variantClasses = {
  tag: `${pill} border-2 border-border-line bg-white px-5 py-2 text-label-strong font-bold text-brand-primary-dark`,
  kicker: `${pill} bg-white px-5 py-2 text-eyebrow-label font-extrabold uppercase tracking-wider text-brand-primary-dark shadow-[0_6px_20px_rgba(23,63,76,0.10)]`,
  status: `${pill} px-4 py-1.5 text-caption font-extrabold`,
  check:
    'inline-flex shrink-0 items-center justify-center rounded-full font-heading font-extrabold text-white leading-none',
} as const

// Static strings so Tailwind can detect every class.
const statusTones: Record<StatusTone, string> = {
  primary: 'bg-brand-primary text-white',
  sun: 'bg-accent-sun text-ink-navy',
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export default function Badge(props: BadgeProps) {
  if (props.variant === 'check') {
    const { variant: _v, size = 26, glyph = <FontAwesomeIcon icon={faCheck} />, tone = 'primary', className, style, ...rest } = props
    return (
      <span
        aria-hidden={rest['aria-label'] ? undefined : true}
        {...rest}
        className={cx(variantClasses.check, statusTones[tone], className)}
        style={{ width: size, height: size, fontSize: size * 0.55, ...style }}
      >
        {glyph}
      </span>
    )
  }

  const { variant, icon, trailingIcon, children, className, ...rest } = props
  const tone = variant === 'status' ? (props as StatusBadgeProps).tone ?? 'primary' : undefined
  // `tone` belongs to the status variant only; don't leak it to the DOM.
  delete (rest as { tone?: StatusTone }).tone

  return (
    <span
      {...rest}
      className={cx(variantClasses[variant], tone && statusTones[tone], className)}
    >
      {icon}
      {children}
      {trailingIcon}
    </span>
  )
}

/* ---- Named wrappers, so call sites read naturally ---- */

export const Tag = (p: Omit<TagBadgeProps, 'variant'>) => <Badge variant="tag" {...p} />

export const Kicker = (p: Omit<KickerBadgeProps, 'variant'>) => <Badge variant="kicker" {...p} />

export const StatusPill = (p: Omit<StatusBadgeProps, 'variant'>) => <Badge variant="status" {...p} />

export const CheckBadge = (p: Omit<CheckBadgeProps, 'variant'>) => <Badge variant="check" {...p} />
