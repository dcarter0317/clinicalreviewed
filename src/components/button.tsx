import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Pill-shaped call-to-action button, three variants:
 *
 *  - primary  solid brand-primary, white text. Default action everywhere.
 *  - sun      solid accent-sun, navy text. The single most-wanted action per section.
 *  - outline  white fill, 2px brand-primary border, brand-primary-dark text, no shadow.
 *             Always the secondary option next to a filled button.
 *
 * Rule: never pair two filled (primary/sun) buttons side by side.
 *
 * Renders an <a> when `href` is passed, otherwise a <button>.
 * Accepts `className` for one-off overrides (appended last).
 */

export type ButtonVariant = 'primary' | 'sun' | 'outline'

type BaseProps = {
  /** Default "primary". */
  variant?: ButtonVariant
  /** Optional leading icon, e.g. <FontAwesomeIcon icon={faCalendar} />. */
  icon?: ReactNode
  /** Optional trailing icon, e.g. <FontAwesomeIcon icon={faArrowRight} />. */
  trailingIcon?: ReactNode
  children?: ReactNode
  className?: string
}

type AnchorProps = BaseProps & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & { href: string }
type NativeButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & { href?: undefined }

export type ButtonProps = AnchorProps | NativeButtonProps

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill px-7 py-3.5 ' +
  'font-heading text-body-base font-extrabold leading-tight whitespace-nowrap no-underline normal-case ' +
  'transition-[transform,background-color,box-shadow] duration-200 ' +
  'hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ' +
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun ' +
  'disabled:pointer-events-none disabled:opacity-50'

// Static strings so Tailwind can detect every class.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white shadow-[0_8px_22px_rgba(45,156,180,0.30)] ' +
    'hover:bg-brand-primary-dark hover:shadow-[0_12px_26px_rgba(45,156,180,0.38)]',
  sun:
    'bg-accent-sun text-ink-navy shadow-[0_8px_22px_rgba(255,184,77,0.40)] ' +
    'hover:bg-accent-sun-hover hover:shadow-[0_12px_26px_rgba(255,184,77,0.50)]',
  outline:
    'border-2 border-brand-primary bg-white text-brand-primary-dark shadow-none ' +
    'hover:bg-surface-tint',
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export default function Button(props: ButtonProps) {
  const { variant = 'primary', icon, trailingIcon, children, className, ...rest } = props
  const classes = cx(base, variantClasses[variant], className)
  const content = (
    <>
      {icon}
      {children}
      {trailingIcon}
    </>
  )

  if (props.href !== undefined) {
    return (
      <a {...(rest as ComponentPropsWithoutRef<'a'>)} className={classes}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>
  return (
    <button {...buttonRest} type={type} className={classes}>
      {content}
    </button>
  )
}

/* ---- Named wrappers, so call sites read naturally ---- */

export const PrimaryButton = (p: ButtonProps) => <Button {...p} variant="primary" />

export const SunButton = (p: ButtonProps) => <Button {...p} variant="sun" />

export const OutlineButton = (p: ButtonProps) => <Button {...p} variant="outline" />
