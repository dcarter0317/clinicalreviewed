export type TableAlign = 'left' | 'center' | 'right'

// Static strings so Tailwind can detect every class.
export const alignClasses: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}
