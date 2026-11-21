import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { alignClasses } from './table-styles'
import type { TableAlign } from './table-styles'

export type { TableAlign }

/**
 * Data-driven table. Describe the columns once, pass the rows, done.
 *
 *  - Header row: surface-tint fill, Nunito 800 ink-navy.
 *  - Body rows: border-line dividers, surface-muted on hover (and optional zebra striping).
 *  - Wrapped in a rounded-card, border-line frame that scrolls horizontally on small screens.
 *  - Columns with `sortable` get a header button (click cycles asc → desc → none).
 *  - Cells render `row[key]` by default; pass `render` for anything richer (badges, links, buttons).
 *
 * Accepts `className` for one-off overrides on the frame (appended last).
 */

export type SortDirection = 'asc' | 'desc'

export type TableColumn<Row> = {
  /** Unique column id. Also the default field read from the row. */
  key: string
  /** Header content. */
  header: ReactNode
  /** Custom cell renderer. Default: String(row[key]). */
  render?: (row: Row, rowIndex: number) => ReactNode
  /** Text alignment for header and cells. Default "left". */
  align?: TableAlign
  /** Show a sort control in the header. */
  sortable?: boolean
  /** Value used for sorting. Default: row[key]. */
  sortValue?: (row: Row) => string | number | null | undefined
  /** Any CSS width, e.g. "30%" or "8rem". */
  width?: string
  /** Extra classes for this column's cells (header and body). */
  className?: string
}

export type TableProps<Row> = {
  columns: TableColumn<Row>[]
  rows: Row[]
  /** Stable React key per row. Default: the row index. */
  getRowId?: (row: Row, index: number) => string | number
  /** Visible caption above the table. Also names the table for screen readers. */
  caption?: ReactNode
  /** Initial sort, e.g. { key: 'name', direction: 'asc' }. */
  defaultSort?: { key: string; direction: SortDirection }
  /** Zebra-stripe body rows with surface-muted. */
  striped?: boolean
  /** Tighter cell padding. */
  dense?: boolean
  /** Shown when `rows` is empty. */
  emptyMessage?: ReactNode
  /** Makes rows clickable (and keyboard-focusable). */
  onRowClick?: (row: Row, index: number) => void
  className?: string
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

// Static strings so Tailwind can detect every class.
const justifyClasses: Record<TableAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const compare = (a: unknown, b: unknown) => {
  const aNil = a === null || a === undefined || a === ''
  const bNil = b === null || b === undefined || b === ''
  if (aNil || bNil) return aNil === bNil ? 0 : aNil ? 1 : -1 // empties always last
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export default function Table<Row>({
  columns,
  rows,
  getRowId,
  caption,
  defaultSort,
  striped,
  dense,
  emptyMessage = 'Nothing to show yet.',
  onRowClick,
  className,
}: TableProps<Row>) {
  const [sort, setSort] = useState<{ key: string; direction: SortDirection } | undefined>(defaultSort)

  const sorted = useMemo(() => {
    const col = sort && columns.find((c) => c.key === sort.key)
    if (!sort || !col) return rows
    const read = col.sortValue ?? ((r: Row) => (r as Record<string, unknown>)[col.key] as string | number | null | undefined)
    const dir = sort.direction === 'asc' ? 1 : -1
    // Array.prototype.sort is stable, so equal rows keep their original order.
    return [...rows].sort((a, b) => {
      const ra = read(a)
      const rb = read(b)
      const aNil = ra === null || ra === undefined || ra === ''
      const bNil = rb === null || rb === undefined || rb === ''
      // Keep empties last regardless of direction.
      return aNil || bNil ? compare(ra, rb) : compare(ra, rb) * dir
    })
  }, [rows, columns, sort])

  const toggleSort = (key: string) =>
    setSort((cur) => {
      if (!cur || cur.key !== key) return { key, direction: 'asc' }
      if (cur.direction === 'asc') return { key, direction: 'desc' }
      return undefined
    })

  const cell = dense ? 'px-sm py-xs' : 'px-md py-sm'

  return (
    <div className={cx('overflow-x-auto rounded-card border border-border-line bg-white', className)}>
      <table className="w-full border-collapse font-body text-body-base text-ink-body">
        {caption && (
          <caption className="border-b border-border-line bg-white p-md text-left font-heading text-h4 text-ink-navy">
            {caption}
          </caption>
        )}
        <thead className="bg-surface-tint">
          <tr>
            {columns.map((col) => {
              const align = col.align ?? 'left'
              const active = sort?.key === col.key ? sort.direction : undefined
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  aria-sort={col.sortable ? (active === 'asc' ? 'ascending' : active === 'desc' ? 'descending' : 'none') : undefined}
                  className={cx(cell, alignClasses[align], 'font-heading text-label-strong font-extrabold whitespace-nowrap text-ink-navy', col.className)}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={cx(
                        'inline-flex w-full cursor-pointer items-center gap-1.5 rounded-pill font-[inherit] text-[length:inherit] text-inherit hover:text-brand-primary-dark',
                        'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-sun',
                        justifyClasses[align],
                      )}
                    >
                      {col.header}
                      <FontAwesomeIcon
                        icon={active === 'asc' ? faSortUp : active === 'desc' ? faSortDown : faSort}
                        className={active ? 'text-brand-primary-dark' : 'text-brand-primary-light'}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-xl text-center text-caption">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={getRowId ? getRowId(row, i) : i}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onRowClick(row, i)
                        }
                      }
                    : undefined
                }
                tabIndex={onRowClick ? 0 : undefined}
                className={cx(
                  'border-t border-border-line transition-colors duration-200 motion-reduce:transition-none hover:bg-surface-tint/60',
                  striped && 'even:bg-surface-muted',
                  onRowClick && 'cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-accent-sun',
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cx(cell, alignClasses[col.align ?? 'left'], 'align-middle', col.className)}>
                    {col.render ? col.render(row, i) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
