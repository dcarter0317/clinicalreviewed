import { createContext, useContext } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { alignClasses } from './table-styles'
import type { TableAlign } from './table-styles'

/**
 * Composable table elements for static tabular data (pricing comparisons, specs, schedules).
 * For data-driven tables with sorting, use <Table> from table.tsx instead.
 *
 *   <TableFrame caption="Plan comparison" striped>
 *     <TableHead>
 *       <TableRow>
 *         <TableHeaderCell>Feature</TableHeaderCell>
 *         <TableHeaderCell align="center">Essentials</TableHeaderCell>
 *       </TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow>
 *         <TableHeaderCell scope="row">Blogs</TableHeaderCell>
 *         <TableCell align="center">1 / month</TableCell>
 *       </TableRow>
 *     </TableBody>
 *     <TableFoot>...</TableFoot>
 *   </TableFrame>
 *
 * Every element accepts `className` (appended last) plus its native <table> attributes.
 */

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ')

const DenseContext = createContext(false)

/** Scrolling rounded frame + <table>. Owns the caption and the `dense` setting for its cells. */
export function TableFrame({
  caption,
  dense = false,
  striped = false,
  frameClassName,
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<'table'>, 'children'> & {
  /** Titled caption above the table. Also names the table for screen readers. */
  caption?: ReactNode
  /** Tighter cell padding. */
  dense?: boolean
  /** Zebra-stripe body rows with surface-muted. */
  striped?: boolean
  /** Extra classes on the outer frame (the table's own `className` goes on <table>). */
  frameClassName?: string
  children?: ReactNode
}) {
  return (
    <DenseContext.Provider value={dense}>
      <div className={cx('overflow-x-auto rounded-card border border-border-line bg-white', frameClassName)}>
        <table
          {...rest}
          data-striped={striped || undefined}
          className={cx('group/table w-full border-collapse font-body text-body-base text-ink-body', className)}
        >
          {caption && (
            <caption className="border-b border-border-line bg-white p-md text-left font-heading text-h4 text-ink-navy">
              {caption}
            </caption>
          )}
          {children}
        </table>
      </div>
    </DenseContext.Provider>
  )
}

export function TableHead({ className, ...rest }: ComponentPropsWithoutRef<'thead'>) {
  return <thead {...rest} className={cx('bg-surface-tint', className)} />
}

export function TableBody({ className, ...rest }: ComponentPropsWithoutRef<'tbody'>) {
  return (
    <tbody
      {...rest}
      className={cx(
        '[&>tr]:hover:bg-surface-tint/60',
        // zebra stripes, switched on by <TableFrame striped>
        'group-data-[striped]/table:[&>tr:nth-child(even)]:bg-surface-muted',
        className,
      )}
    />
  )
}

/** Summary rows (totals, notes). */
export function TableFoot({ className, ...rest }: ComponentPropsWithoutRef<'tfoot'>) {
  return <tfoot {...rest} className={cx('border-t-2 border-border-line bg-surface-muted font-bold text-ink-navy', className)} />
}

export function TableRow({ className, ...rest }: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      {...rest}
      className={cx(
        'border-t border-border-line transition-colors duration-200 first:border-t-0 motion-reduce:transition-none',
        className,
      )}
    />
  )
}

type CellProps = {
  /** Text alignment. Default "left". */
  align?: TableAlign
}

export function TableHeaderCell({
  align = 'left',
  scope = 'col',
  className,
  ...rest
}: ComponentPropsWithoutRef<'th'> & CellProps) {
  const dense = useContext(DenseContext)
  return (
    <th
      {...rest}
      scope={scope}
      className={cx(
        dense ? 'px-sm py-xs' : 'px-md py-sm',
        alignClasses[align],
        'font-heading text-label-strong font-extrabold text-ink-navy',
        scope === 'col' && 'whitespace-nowrap',
        className,
      )}
    />
  )
}

export function TableCell({ align = 'left', className, ...rest }: ComponentPropsWithoutRef<'td'> & CellProps) {
  const dense = useContext(DenseContext)
  return <td {...rest} className={cx(dense ? 'px-sm py-xs' : 'px-md py-sm', alignClasses[align], 'align-middle', className)} />
}
