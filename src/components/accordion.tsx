import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useId, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Data-driven accordion (FAQ-style). Describe the items once, pass them in, done.
 *
 *  - Item:    rounded-card, 1.5px border-line border, white fill (same frame as ServiceCard).
 *  - Header:  full-width button, Nunito 800 ink-navy, chevron in a surface-tint circle that flips when open.
 *  - Open:    border turns brand-primary (the same "active" signal ServiceCard uses on hover).
 *  - Panel:   Nunito Sans body copy in ink-body; height animates via grid rows, no layout jump.
 *  - Focus:   sun outline used by Button and ServiceCard.
 *
 * `type="single"` (default) keeps one item open at a time; `type="multiple"` lets any number stay open.
 * Headers are buttons with aria-expanded / aria-controls and panels are regions labelled by their
 * header, so it works with keyboard (Tab, Enter, Space) and screen readers.
 *
 * Accepts `className` for one-off overrides on the wrapper (appended last).
 */

export type AccordionItem = {
  /** Stable key, also used for open state. */
  id: string
  /** Header content (the question). */
  title: ReactNode
  /** Panel content (the answer). */
  content: ReactNode
  /** Disable this item: it stays closed and can't be toggled. */
  disabled?: boolean
}

type AccordionProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  items: AccordionItem[]
  /** "single" closes the others when one opens. Default "single". */
  type?: 'single' | 'multiple'
  /** Ids open on first render. In single mode only the first is used. */
  defaultOpen?: string[]
  /** Heading element wrapping each header button, so the accordion fits the page outline. Default "h3". */
  headingAs?: 'h2' | 'h3' | 'h4'
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

const itemFrame =
  'rounded-card border-[1.5px] bg-white transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none'

const trigger =
  'flex w-full cursor-pointer items-center justify-between gap-md rounded-card border-0 bg-transparent px-xl py-lg text-left ' +
  'font-heading text-h4 font-extrabold text-ink-navy ' +
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export default function Accordion({
  items,
  type = 'single',
  defaultOpen = [],
  headingAs: Heading = 'h3',
  className,
  ...rest
}: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<string[]>(type === 'single' ? defaultOpen.slice(0, 1) : defaultOpen)

  const toggle = (id: string) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id)
      return type === 'single' ? [id] : [...current, id]
    })

  return (
    <div {...rest} className={cx('flex flex-col gap-md', className)}>
      {items.map(({ id, title, content, disabled }) => {
        const isOpen = open.includes(id) && !disabled
        const buttonId = `${baseId}-${id}-button`
        const panelId = `${baseId}-${id}-panel`
        return (
          <div
            key={id}
            className={cx(
              itemFrame,
              isOpen
                ? 'border-brand-primary shadow-[0_14px_32px_rgba(23,63,76,0.10)]'
                : cx('border-border-line', !disabled && 'hover:border-brand-primary'),
            )}
          >
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={disabled}
                onClick={() => toggle(id)}
                className={trigger}
              >
                <span>{title}</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-[0.8rem] text-brand-primary-dark transition-[transform,background-color] duration-200 motion-reduce:transition-none',
                    isOpen ? 'rotate-180 bg-surface-tint-deep' : 'bg-surface-tint',
                  )}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // `inert` keeps collapsed content out of the tab order and accessibility tree.
              inert={!isOpen}
              className={cx(
                'grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-xl pb-lg font-body text-body-base text-ink-body">{content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
