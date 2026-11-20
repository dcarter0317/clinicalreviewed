import type { ReactNode } from 'react'

/** A titled section of the styleguide. */
export function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border-line py-section-sm first:border-t-0">
      <h2 className="mb-xs">{title}</h2>
      {intro && <p className="mb-2xl text-body-lead">{intro}</p>}
      <div className="flex flex-col gap-3xl">{children}</div>
    </section>
  )
}

/**
 * One example: rendered preview + the exact code to copy.
 * `code` should match what's rendered in `children`.
 */
export function Specimen({ title, note, code, children }: { title: string; note?: string; code: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-xs text-h4">{title}</h3>
      {note && <p className="mb-sm text-caption">{note}</p>}
      <div className="overflow-hidden rounded-card border border-border-line">
        <div className="flex flex-wrap items-center gap-sm bg-surface-muted p-xl">{children}</div>
        <pre className="m-0 overflow-x-auto bg-ink-navy p-md text-caption text-footer-ink">
          <code className="bg-transparent! p-0! text-footer-ink!">{code}</code>
        </pre>
      </div>
    </div>
  )
}

/** Props table for a component. */
export function PropsTable({ rows }: { rows: Array<[prop: string, type: string, description: string]> }) {
  return (
    <div className="overflow-x-auto rounded-card border border-border-line">
      <table className="w-full border-collapse text-left text-caption">
        <thead className="bg-surface-tint text-ink-navy">
          <tr>
            <th className="p-sm font-extrabold">Prop</th>
            <th className="p-sm font-extrabold">Type</th>
            <th className="p-sm font-extrabold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, description]) => (
            <tr key={prop} className="border-t border-border-line align-top">
              <td className="p-sm font-bold text-brand-primary-dark">{prop}</td>
              <td className="p-sm"><code>{type}</code></td>
              <td className="p-sm">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
