import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CheckBadge, StatusPill } from './badge'

/**
 * Poster card: a "verification poster" panel. A vertical stack of blocks, described as data:
 *
 *  - reviewer: gradient circle avatar (short text such as "DDS" or "30y"), bold title, small credential line.
 *  - point:    tinted rounded row with a check badge and one line of text.
 *
 * Followed by an optional dashed divider, a footer label and a status pill.
 *
 * Tones (per block): 'primary' (teal) | 'sun' (orange). Reviewer tone sets the avatar gradient;
 * point tone sets the row tint and the check badge color.
 *
 * Surface: white, rounded-panel-lg, soft shadow. Read-only, not a link.
 * Renders a <section>. Accepts `className` (appended last).
 */

export type PosterTone = 'primary' | 'sun'

export type PosterReviewer = {
  type: 'reviewer'
  id: string
  /** Short text inside the avatar circle, e.g. "DDS". */
  avatar: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  /** Avatar gradient. Default 'primary'. */
  tone?: PosterTone
}

export type PosterPoint = {
  type: 'point'
  id: string
  text: ReactNode
  /** Row tint and check color. Default 'primary'. */
  tone?: PosterTone
}

export type PosterBlock = PosterReviewer | PosterPoint

export type PosterCardProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'title'> & {
  blocks: PosterBlock[]
  /** Footer line under the dashed divider, e.g. "Ready to publish under your practice's name". */
  footerLabel?: ReactNode
  /** Status pill text under the footer label, e.g. "Double-Verified". */
  footerBadge?: ReactNode
  /** Badge tone. Default 'primary'. */
  footerBadgeTone?: PosterTone
}

// Static strings so Tailwind can detect every class.
const avatarTones: Record<PosterTone, string> = {
  primary: 'bg-gradient-to-br from-brand-primary to-brand-primary-light',
  sun: 'bg-gradient-to-br from-accent-coral to-accent-sun',
}

const pointTones: Record<PosterTone, string> = {
  primary: 'bg-surface-tint',
  sun: 'bg-surface-warm',
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

function Reviewer({ avatar, title, subtitle, tone = 'primary' }: Omit<PosterReviewer, 'type' | 'id'>) {
  return (
    <div className="flex items-center gap-md">
      <span
        aria-hidden="true"
        className={cx(
          'flex size-16 shrink-0 items-center justify-center rounded-full font-heading text-[1.15rem] leading-none font-black text-white',
          avatarTones[tone],
        )}
      >
        {avatar}
      </span>
      <div>
        <p className="m-0 font-heading text-[1.05rem] leading-tight font-extrabold text-ink-navy">{title}</p>
        {subtitle && <p className="m-0 mt-1 font-body text-caption text-ink-body">{subtitle}</p>}
      </div>
    </div>
  )
}

function Point({ text, tone = 'primary' }: Omit<PosterPoint, 'type' | 'id'>) {
  return (
    <div className={cx('flex items-center gap-md rounded-chip px-lg py-md', pointTones[tone])}>
      <CheckBadge tone={tone} />
      <p className="m-0 font-body text-[0.95rem] leading-normal text-ink-body">{text}</p>
    </div>
  )
}

export default function PosterCard({
  blocks,
  footerLabel,
  footerBadge,
  footerBadgeTone = 'primary',
  className,
  ...rest
}: PosterCardProps) {
  return (
    <section
      {...rest}
      className={cx(
        'flex w-full flex-col gap-md rounded-panel-lg bg-white p-xl shadow-[0_14px_40px_rgba(23,63,76,0.10)]',
        className,
      )}
    >
      {blocks.map((block) =>
        block.type === 'reviewer' ? (
          <Reviewer key={block.id} {...block} />
        ) : (
          <Point key={block.id} {...block} />
        ),
      )}

      {(footerLabel || footerBadge) && (
        <div className="mt-sm flex flex-col items-start gap-md border-t-2 border-dashed border-surface-tint-deep pt-lg">
          {footerLabel && <p className="m-0 font-heading text-[1rem] leading-tight font-extrabold text-ink-navy">{footerLabel}</p>}
          {footerBadge && (
            <StatusPill tone={footerBadgeTone} trailingIcon={<FontAwesomeIcon icon={faCheckDouble} />}>
              {footerBadge}
            </StatusPill>
          )}
        </div>
      )}
    </section>
  )
}
