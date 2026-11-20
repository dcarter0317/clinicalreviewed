import type { ComponentPropsWithoutRef } from 'react'

/**
 * Nav list: the repeating unit in the site navigation. Each item links to an
 * in-page section by `id` (rendered as `#id`) unless `href` is given.
 *
 * Per item: `id` (stable key and default anchor), `label`, optional `href`,
 * plus any <a> attribute (target, rel, aria-label...).
 */

export type NavItem = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  /** Stable key. Also the anchor target (`#id`) when `href` is omitted. */
  id: string
  /** Link text. */
  label: string
}

type NavListProps = Omit<ComponentPropsWithoutRef<'ul'>, 'children'> & {
  items: NavItem[]
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

export function NavList({ items, className, ...rest }: NavListProps) {
  return (
    <ul {...rest} className={cx('nav-list', className)}>
      {items.map(({ id, label, href, className: linkClass, ...link }) => (
        <li key={id} className="nav-item">
          <a {...link} href={href ?? `#${id}`} className={cx('nav-link', linkClass)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}
