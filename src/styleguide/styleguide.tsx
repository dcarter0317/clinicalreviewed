import { faArrowLeft, faArrowRight, faCalendarCheck, faLocationDot, faPhone, faCheckDouble, faEnvelope, faExclamation, faLeaf, faMobileScreen, faNewspaper, faPenToSquare, faStar, faTooth } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button, { OutlineButton, PrimaryButton, SunButton } from '../components/button'
import Badge, { CheckBadge, Kicker, StatusPill, Tag } from '../components/badge'
import ServiceCard, { ServiceCardGrid } from '../components/service-card'
import PlanCard, { PlanCardGrid } from '../components/plan-card'
import TestimonialCard, { TestimonialCardGrid } from '../components/testimonial-card'
import PosterCard from '../components/poster-card'
import ContactCard, { ContactCardGroup } from '../components/contact-card'
import type { ContactItem } from '../components/contact-card'
import { testimonials } from '../data/testimonials'
import { poster } from '../data/poster'
import { contactCards } from '../data/contact'
import { services } from '../data/services'
import { plans } from '../data/plans'
import Accordion from '../components/accordion'
import type { AccordionItem } from '../components/accordion'
import Table from '../components/table'
import type { TableColumn } from '../components/table'
import { TableBody, TableCell, TableFoot, TableFrame, TableHead, TableHeaderCell, TableRow } from '../components/table-parts'
import { PropsTable, Section, Specimen } from './specimen'

/*
 * Styleguide: a living reference for every reusable piece of the site.
 * Visit /styleguide (or /#/styleguide).
 *
 * To document a new component: add an entry to `nav`, then a <Section> below
 * with one <Specimen> per variation. Keep each `code` string identical to
 * what it renders so people can copy it.
 */

const nav = [
  ['colors', 'Colors'],
  ['type', 'Typography'],
  ['buttons', 'Buttons'],
  ['badges', 'Badges'],
  ['service-cards', 'Service cards'],
  ['plan-cards', 'Plan cards'],
  ['testimonial-cards', 'Testimonial cards'],
  ['poster-cards', 'Poster card'],
  ['contact-cards', 'Contact cards'],
  ['tables', 'Tables'],
  ['table-parts', 'Table elements'],
  ['accordions', 'Accordions'],
] as const

const demoFaqs: AccordionItem[] = [
  { id: 'verified', title: 'What does Double-Verified mean?', content: 'Every piece of content is written by a clinical writer and then reviewed by a licensed professional before it is delivered.' },
  { id: 'turnaround', title: 'How long does a review take?', content: 'Most blog posts and service pages are delivered within three to five business days.' },
  { id: 'revisions', title: 'Can I request revisions?', content: 'Yes. Every plan includes revisions until the content matches your practice voice.' },
  { id: 'legacy', title: 'Legacy plan (disabled)', content: 'This plan is no longer offered.', disabled: true },
]

type DemoRow = { id: string; practice: string; service: string; turnaround: number; status: 'Verified' | 'In review' }
const demoRows: DemoRow[] = [
  { id: 'a', practice: 'Bright Smiles Dental', service: 'Peer-reviewed blog', turnaround: 3, status: 'Verified' },
  { id: 'b', practice: 'Lakeside Orthodontics', service: 'Service page', turnaround: 5, status: 'In review' },
  { id: 'c', practice: 'Maple Family Dentistry', service: 'Local SEO content', turnaround: 2, status: 'Verified' },
]
const demoColumns: TableColumn<DemoRow>[] = [
  { key: 'practice', header: 'Practice', sortable: true },
  { key: 'service', header: 'Service', sortable: true },
  { key: 'turnaround', header: 'Days', align: 'right', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill tone={r.status === 'Verified' ? 'primary' : 'sun'}>{r.status}</StatusPill>,
  },
]

const demoLines: ContactItem[] = [
  { type: 'line', id: 'location', icon: faLocationDot, text: 'New York, NY — working with practices in all 50 states' },
  { type: 'line', id: 'phone', icon: faPhone, text: '(212) 555-0142', href: 'tel:+12125550142' },
  { type: 'line', id: 'email', icon: faEnvelope, text: 'hello@clinicianreviewed.com', href: 'mailto:hello@clinicianreviewed.com' },
]
const demoHours: ContactItem[] = [
  { type: 'detail', id: 'mon-thu', label: 'Monday – Thursday', value: '9:00AM – 6:00PM ET' },
  { type: 'detail', id: 'fri', label: 'Friday', value: '9:00AM – 5:00PM ET' },
  { type: 'detail', id: 'sat', label: 'Saturday', value: 'By appointment' },
  { type: 'detail', id: 'sun', label: 'Sunday', value: 'Closed' },
]

const colors: Array<[group: string, swatches: Array<[token: string, hex: string]>]> = [
  ['Surface', [
    ['surface-page', '#ffffff'], ['surface-muted', '#f7fbfd'], ['surface-tint', '#eaf6f9'],
    ['surface-tint-deep', '#dff2f7'], ['surface-warm', '#fff4e3'],
  ]],
  ['Brand', [
    ['brand-primary', '#2d9cb4'], ['brand-primary-dark', '#1b6e82'], ['brand-primary-light', '#55bbd1'],
  ]],
  ['Ink', [['ink-navy', '#173f4c'], ['ink-body', '#3a5560']]],
  ['Accent', [['accent-sun', '#ffb84d'], ['accent-sun-hover', '#f5a93a'], ['accent-coral', '#f58a6f']]],
  ['Border', [['border-line', '#d9eaf0']]],
  ['Icon tints', [
    ['icon-tint-1', '#e3f4f8'], ['icon-tint-2', '#fff0dc'], ['icon-tint-3', '#fde9e3'], ['icon-tint-4', '#e8f5e9'],
  ]],
  ['Footer', [['footer-ink', '#b9d6df'], ['footer-border', '#2e5765'], ['footer-muted', '#8fb4bf']]],
]

// Static class names so Tailwind can see them.
const swatchBg: Record<string, string> = {
  'surface-page': 'bg-surface-page', 'surface-muted': 'bg-surface-muted', 'surface-tint': 'bg-surface-tint',
  'surface-tint-deep': 'bg-surface-tint-deep', 'surface-warm': 'bg-surface-warm',
  'brand-primary': 'bg-brand-primary', 'brand-primary-dark': 'bg-brand-primary-dark',
  'brand-primary-light': 'bg-brand-primary-light', 'ink-navy': 'bg-ink-navy', 'ink-body': 'bg-ink-body',
  'accent-sun': 'bg-accent-sun', 'accent-sun-hover': 'bg-accent-sun-hover', 'accent-coral': 'bg-accent-coral',
  'border-line': 'bg-border-line', 'icon-tint-1': 'bg-icon-tint-1', 'icon-tint-2': 'bg-icon-tint-2',
  'icon-tint-3': 'bg-icon-tint-3', 'icon-tint-4': 'bg-icon-tint-4', 'footer-ink': 'bg-footer-ink',
  'footer-border': 'bg-footer-border', 'footer-muted': 'bg-footer-muted',
}

export default function Styleguide() {
  return (
    <div className="min-h-screen bg-white text-left">
      <header className="sticky top-0 z-10 border-b border-border-line bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-lg px-xl py-sm">
          <strong className="font-heading text-logo-wordmark text-ink-navy">Styleguide</strong>
          <nav className="flex gap-md text-label-strong">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-brand-primary-dark hover:underline">{label}</a>
            ))}
          </nav>
          <a href={import.meta.env.BASE_URL} className="ml-auto text-label-strong text-brand-primary-dark hover:underline"><FontAwesomeIcon icon={faArrowLeft} className="mr-1.5" />Back to site</a>
        </div>
      </header>

      <main className="px-xl pb-section-lg pt-2xl">
        <Section id="colors" title="Colors" intro="Theme tokens from theme.css. Use the token name with any Tailwind color utility, e.g. bg-brand-primary, text-ink-navy, border-border-line.">
          {colors.map(([group, swatches]) => (
            <div key={group}>
              <h3 className="mb-sm text-h4">{group}</h3>
              <div className="flex flex-wrap gap-md">
                {swatches.map(([token, hex]) => (
                  <div key={token} className="w-40">
                    <div className={`h-16 rounded-chip border border-border-line ${swatchBg[token]}`} />
                    <div className="mt-xs text-caption font-bold text-ink-navy">{token}</div>
                    <div className="text-caption">{hex}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section id="type" title="Typography" intro="Headings use Nunito (font-heading); body copy uses Nunito Sans (font-body). h1–h4 are styled globally; the rest are utilities.">
          <Specimen
            title="Headings"
            note="Heading classes match the global h1–h4 styles and work on any element, so semantics and visual size can differ."
            code={`<h2 className="heading-hero">Hero heading</h2>\n<h2 className="heading-section">Section heading</h2>\n<h3 className="heading-card">Card heading</h3>\n<h3 className="heading-small">Small heading</h3>`}
          >
            <div className="flex flex-col gap-sm">
              <p className="heading-hero">Hero heading</p>
              <p className="heading-section">Section heading</p>
              <p className="heading-card">Card heading</p>
              <p className="heading-small">Small heading</p>
            </div>
          </Specimen>
          <Specimen title="Body text" code={`<p className="text-body-lead">Lead paragraph</p>\n<p>Base paragraph</p>\n<p className="text-label-strong">Strong label</p>\n<p className="text-caption">Caption</p>`}>
            <div className="flex flex-col gap-xs">
              <p className="text-body-lead">Lead paragraph</p>
              <p>Base paragraph</p>
              <p className="text-label-strong font-bold">Strong label</p>
              <p className="text-caption">Caption</p>
            </div>
          </Specimen>
        </Section>

        <Section id="buttons" title="Buttons" intro="Pill-shaped calls to action in three variants. Renders an <a> when href is passed, otherwise a <button>. Never pair two filled buttons side by side: one filled + one outline, or one filled alone. Source: components/button.tsx.">
          <Specimen
            title="Primary"
            note="Solid brand-primary, white text. The default action (nav CTA, most pricing CTAs)."
            code={`<PrimaryButton href="#contact">Book a Free Consult</PrimaryButton>`}
          >
            <PrimaryButton href="#contact">Book a Free Consult</PrimaryButton>
          </Specimen>

          <Specimen
            title="Sun"
            note="Solid accent-sun, navy text. The single most-wanted action per section (hero CTA, featured plan)."
            code={`<SunButton href="#plans">View Our Plans</SunButton>`}
          >
            <SunButton href="#plans">View Our Plans</SunButton>
          </Specimen>

          <Specimen
            title="Outline"
            note="White fill, 2px brand-primary border, no shadow. Always the secondary option beside a filled button."
            code={`<OutlineButton href="#how">How It Works</OutlineButton>`}
          >
            <OutlineButton href="#how">How It Works</OutlineButton>
          </Specimen>

          <Specimen
            title="Correct pairing"
            note="One filled + one outline."
            code={`<SunButton href="#plans">View Our Plans</SunButton>\n<OutlineButton href="#how">How It Works</OutlineButton>`}
          >
            <SunButton href="#plans">View Our Plans</SunButton>
            <OutlineButton href="#how">How It Works</OutlineButton>
          </Specimen>

          <Specimen
            title="With icons"
            note="Font Awesome via icon / trailingIcon."
            code={`<PrimaryButton icon={<FontAwesomeIcon icon={faCalendarCheck} />}>Book a Free Consult</PrimaryButton>\n<OutlineButton trailingIcon={<FontAwesomeIcon icon={faArrowRight} />}>How It Works</OutlineButton>`}
          >
            <PrimaryButton icon={<FontAwesomeIcon icon={faCalendarCheck} />}>Book a Free Consult</PrimaryButton>
            <OutlineButton trailingIcon={<FontAwesomeIcon icon={faArrowRight} />}>How It Works</OutlineButton>
          </Specimen>

          <Specimen
            title="Native button + disabled"
            note="Without href it is a <button type=button>; pass type=submit for forms."
            code={`<Button variant="primary" type="submit">Send</Button>\n<Button variant="outline" disabled>Unavailable</Button>`}
          >
            <Button variant="primary" type="submit">Send</Button>
            <Button variant="outline" disabled>Unavailable</Button>
          </Specimen>

          <PropsTable
            rows={[
              ['variant', "'primary' | 'sun' | 'outline'", 'Default primary. Wrappers: PrimaryButton, SunButton, OutlineButton.'],
              ['href', 'string', 'If set, renders an <a>; otherwise a <button> (type defaults to "button").'],
              ['icon', 'ReactNode', 'Leading icon, e.g. <FontAwesomeIcon icon={faCalendarCheck} />.'],
              ['trailingIcon', 'ReactNode', 'Trailing icon.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="badges" title="Badges" intro="Small pill labels in four variants. One Badge component, plus named wrappers (Tag, Kicker, StatusPill, CheckBadge) so call sites read naturally. Source: components/badge.tsx.">
          <Specimen
            title="Tag"
            note="White fill, thin border. Feature chips under the hero."
            code={`<Tag>No Long Contracts</Tag>\n<Tag>1–4 Posts Monthly</Tag>`}
          >
            <Tag>No Long Contracts</Tag>
            <Tag>1–4 Posts Monthly</Tag>
          </Specimen>

          <Specimen
            title="Kicker"
            note="White fill, soft shadow, uppercase. One eyebrow label above the hero H1."
            code={`<Kicker>Now welcoming founding practices</Kicker>`}
          >
            <Kicker>Now welcoming founding practices</Kicker>
          </Specimen>

          <Specimen
            title="Status pill"
            note='Solid fill. tone="primary" (default) or "sun". Optional icon / trailingIcon (Font Awesome).'
            code={`<StatusPill trailingIcon={<FontAwesomeIcon icon={faCheckDouble} />}>Double-Verified</StatusPill>\n<StatusPill tone="sun" icon={<FontAwesomeIcon icon={faStar} />}>Most Popular</StatusPill>`}
          >
            <StatusPill trailingIcon={<FontAwesomeIcon icon={faCheckDouble} />}>Double-Verified</StatusPill>
            <StatusPill tone="sun" icon={<FontAwesomeIcon icon={faStar} />}>Most Popular</StatusPill>
          </Specimen>

          <Specimen
            title="Check badge"
            note="Filled circle, 26px by default. Sits left of a callout line."
            code={`<CheckBadge />\n<CheckBadge size={40} />\n<CheckBadge tone="sun" glyph={<FontAwesomeIcon icon={faExclamation} />} />`}
          >
            <CheckBadge />
            <CheckBadge size={40} />
            <CheckBadge tone="sun" glyph={<FontAwesomeIcon icon={faExclamation} />} />
          </Specimen>

          <Specimen
            title="Generic Badge + overrides"
            note="Badge variant={...} is what the wrappers use. Every variant accepts className, appended last."
            code={`<Badge variant="tag" className="px-3 py-1">Compact tag</Badge>`}
          >
            <Badge variant="tag" className="px-3 py-1">Compact tag</Badge>
          </Specimen>

          <PropsTable
            rows={[
              ['children', 'ReactNode', 'Label text (not used by CheckBadge).'],
              ['icon', 'ReactNode', 'Leading icon, e.g. <FontAwesomeIcon icon={faStar} />.'],
              ['trailingIcon', 'ReactNode', 'Trailing icon.'],
              ['tone', "'primary' | 'sun'", 'StatusPill and CheckBadge only. Default primary.'],
              ['size', 'number', 'CheckBadge diameter in px. Default 26.'],
              ['glyph', 'ReactNode', 'CheckBadge icon. Default: Font Awesome check.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="service-cards" title="Service cards" intro="The repeating unit in the services grid: a tinted icon tile above a heading and short description. The whole card is a link; the border turning brand-primary on hover is the main clickable signal. Four variants via tint (icon-tint-1..4). Source: components/service-card.tsx.">
          <Specimen
            title="Tint 1"
            note="icon-tint-1 (light teal). The default."
            code={`<ServiceCard href="#blogs" tint={1} icon={faNewspaper} title="Peer-Reviewed Blogs" description="Patient-friendly articles verified by a board-certified dentist." />`}
          >
            <div className="w-64"><ServiceCard href="#blogs" tint={1} icon={faNewspaper} title="Peer-Reviewed Blogs" description="Patient-friendly articles verified by a board-certified dentist." /></div>
          </Specimen>

          <Specimen
            title="Tint 2"
            note="icon-tint-2 (warm sand)."
            code={`<ServiceCard href="#social" tint={2} icon={faMobileScreen} title="Social Media Posts" description="On-brand posts reviewed for clinical accuracy before they go live." />`}
          >
            <div className="w-64"><ServiceCard href="#social" tint={2} icon={faMobileScreen} title="Social Media Posts" description="On-brand posts reviewed for clinical accuracy before they go live." /></div>
          </Specimen>

          <Specimen
            title="Tint 3"
            note="icon-tint-3 (soft coral)."
            code={`<ServiceCard href="#email" tint={3} icon={faEnvelope} title="Patient Emails" description="Newsletters and reminders written in a warm, trustworthy voice." />`}
          >
            <div className="w-64"><ServiceCard href="#email" tint={3} icon={faEnvelope} title="Patient Emails" description="Newsletters and reminders written in a warm, trustworthy voice." /></div>
          </Specimen>

          <Specimen
            title="Tint 4"
            note="icon-tint-4 (soft green)."
            code={`<ServiceCard href="#pages" tint={4} icon={faLeaf} title="Service Pages" description="Clear treatment pages that answer what patients actually ask." />`}
          >
            <div className="w-64"><ServiceCard href="#pages" tint={4} icon={faLeaf} title="Service Pages" description="Clear treatment pages that answer what patients actually ask." /></div>
          </Specimen>

          <Specimen
            title="Font Awesome icon"
            note="For icons with no emoji equivalent, pass a FontAwesomeIcon element as icon. It inherits brand-primary-dark."
            code={`<ServiceCard href="#blogs" tint={1} icon={<FontAwesomeIcon icon={faPenToSquare} />} title="Peer-Reviewed Blogs" description="..." />\n<ServiceCard href="#pages" tint={2} icon={<FontAwesomeIcon icon={faTooth} />} title="Service Pages" description="..." />`}
          >
            <div className="w-64"><ServiceCard href="#blogs" tint={1} icon={<FontAwesomeIcon icon={faPenToSquare} />} title="Peer-Reviewed Blogs" description="Patient-friendly articles verified by a board-certified dentist." /></div>
            <div className="w-64"><ServiceCard href="#pages" tint={2} icon={<FontAwesomeIcon icon={faTooth} />} title="Service Pages" description="Clear treatment pages that answer what patients ask." /></div>
          </Specimen>

          <Specimen
            title="Config-driven grid"
            note="ServiceCardGrid renders one card per item. Content lives in data/services.tsx; tint is optional and cycles 1-4."
            code={`const items: ServiceCardItem[] = [\n  { id: 'blogs', icon: faNewspaper, title: 'Peer-Reviewed Blogs', description: '...', href: '#plans' },\n  { id: 'seo', icon: faMagnifyingGlass, title: 'Local SEO Content', description: '...', href: '#plans', tint: 3 },\n]\n\n<ServiceCardGrid items={items} />`}
          >
            <ServiceCardGrid className="w-full" items={services} />
          </Specimen>

          <Specimen
            title="Grid options"
            note="columns (1-4) and a single tint for every card. Per-item tint still wins. Icons can be Font Awesome definitions, so config stays plain data."
            code={`<ServiceCardGrid columns={3} tint={4} items={[\n  { id: 'a', icon: faTooth, title: 'Service Pages', description: '...', href: '#a' },\n  { id: 'b', icon: faNewspaper, title: 'Blogs', description: '...', href: '#b', tint: 2 },\n  { id: 'c', icon: faStar, title: 'Reviews', description: '...', href: '#c', headingAs: 'h4' },\n]} />`}
          >
            <ServiceCardGrid
              className="w-full"
              columns={3}
              tint={4}
              items={[
                { id: 'a', icon: faTooth, title: 'Service Pages', description: 'Clear treatment pages for patients.', href: '#a' },
                { id: 'b', icon: faNewspaper, title: 'Blogs', description: 'Articles verified by a dentist.', href: '#b', tint: 2 },
                { id: 'c', icon: faStar, title: 'Reviews', description: 'Thoughtful review replies.', href: '#c', headingAs: 'h4' },
              ]}
            />
          </Specimen>

          <PropsTable
            rows={[
              ['items', 'ServiceCardItem[]', 'ServiceCardGrid only. Each item: id plus any ServiceCard prop (icon, title, description, href, tint, headingAs, className, <a> attrs).'],
              ['columns', '1 | 2 | 3 | 4', 'ServiceCardGrid only. Columns at lg. Default 4.'],
              ['tint (grid)', '1 | 2 | 3 | 4', 'ServiceCardGrid only. Tint for cards without their own. Default: cycle 1-4.'],
              ['href', 'string', 'Required. The whole card is an <a>.'],
              ['title', 'ReactNode', 'Heading. Nunito 800, 1.05rem.'],
              ['description', 'ReactNode', 'Short body copy. Nunito Sans, 0.86rem, ink-body.'],
              ['icon', 'ReactNode | IconDefinition', 'Emoji, a Font Awesome definition (faTooth), or any element.'],
              ['tint', '1 | 2 | 3 | 4', 'Icon tile background, icon-tint-1..4. Default 1. Wrappers: ServiceCardTint1..4.'],
              ['headingAs', "'h2' | 'h3' | 'h4'", 'Heading element. Default h3.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="plan-cards" title="Plan cards">
          <Specimen
            title="Default"
            note="Transparent border, outline CTA. The CTA is pinned to the bottom, so cards in a row line up whatever the list length."
            code={`<PlanCard name="Essentials" frequency="1× per month" price="$495" features={['1 peer-reviewed local blog', '4 matching social posts']} ctaHref="#contact" />`}
          >
            <div className="w-72"><PlanCard name="Essentials" frequency="1× per month" price="$495" features={['1 peer-reviewed local blog', '4 matching social posts']} ctaHref="#contact" /></div>
          </Specimen>

          <Specimen
            title="Featured"
            note="accent-sun border, floating Most Popular pill, sun CTA. Use on one plan per grid."
            code={`<PlanCard featured name="Growth" frequency="2× per month" price="$845" features={['2 peer-reviewed local blogs', '8 matching social posts']} ctaHref="#contact" />`}
          >
            <div className="w-72 pt-md"><PlanCard featured name="Growth" frequency="2× per month" price="$845" features={['2 peer-reviewed local blogs', '8 matching social posts']} ctaHref="#contact" /></div>
          </Specimen>

          <Specimen
            title="Config-driven grid"
            note="PlanCardGrid renders one card per item. Content lives in data/plans.tsx; columns default to the item count (max 4)."
            code={`<PlanCardGrid items={plans} />`}
          >
            <PlanCardGrid className="w-full" items={plans} />
          </Specimen>

          <PropsTable
            rows={[
              ['items', 'PlanCardItem[]', 'PlanCardGrid only. Each item: id plus any PlanCard prop.'],
              ['columns', '1 | 2 | 3 | 4', 'PlanCardGrid only. Columns at lg. Default: item count, max 4.'],
              ['name', 'ReactNode', 'Plan name. Nunito 900.'],
              ['frequency', 'ReactNode', 'Line under the name, e.g. "1× per month".'],
              ['price', 'string | number', 'Nunito 900, 2.3rem. Numbers get a "$" prefix.'],
              ['period', 'string', 'Price suffix. Default "/mo".'],
              ['features', 'ReactNode[]', 'Rows with a dashed divider and a check prefix.'],
              ['ctaHref / ctaLabel', 'string / ReactNode', 'CTA link and text. Label default "Get Started".'],
              ['featured', 'boolean', 'Sun border, floating badge, sun CTA. Default false.'],
              ['badgeLabel', 'ReactNode', 'Default: star icon + "Most Popular".'],
              ['headingAs', "'h2' | 'h3' | 'h4'", 'Heading element. Default h3.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="testimonial-cards" title="Testimonial cards" intro="Quote card for the testimonials grid. surface-tint fill with no border, an oversized decorative quote mark bleeding off the top-left corner, accent-sun stars, and an attribution block. Read-only: no hover state. Source: components/testimonial-card.tsx.">
          <Specimen
            title="Default"
            code={`<TestimonialCard quote="The local touch is what surprised us. New families keep telling us they found us through an article." name="Practice Manager" role="Pediatric Dentistry · Westchester, NY" />`}
          >
            <div className="w-96 max-w-full"><TestimonialCard quote="The local touch is what surprised us. New families keep telling us they found us through an article." name="Practice Manager" role="Pediatric Dentistry · Westchester, NY" /></div>
          </Specimen>

          <Specimen
            title="Equal heights in a grid"
            note="The attribution is pinned to the bottom and auto-rows-fr + h-full stretch every card to the tallest in its row."
            code={`<TestimonialCardGrid columns={2} items={[\n  { id: 'a', quote: 'Short quote.', name: 'Dr. Lee', role: 'General Dentistry · Austin, TX' },\n  { id: 'b', quote: 'A much longer quote that wraps across several lines...', name: 'Office Manager', role: 'Orthodontics · Denver, CO', rating: 4 },\n]} />`}
          >
            <TestimonialCardGrid
              className="w-full"
              columns={2}
              items={[
                { id: 'a', quote: 'Short quote.', name: 'Dr. Lee', role: 'General Dentistry · Austin, TX' },
                { id: 'b', quote: 'A much longer quote that wraps across several lines so we can see the shorter card stretch to match its neighbour.', name: 'Office Manager', role: 'Orthodontics · Denver, CO', rating: 4 },
              ]}
            />
          </Specimen>

          <Specimen
            title="Config-driven grid"
            note="Content lives in data/testimonials.tsx. Columns default to the item count (max 3)."
            code={`<TestimonialCardGrid items={testimonials} />`}
          >
            <TestimonialCardGrid className="w-full" items={testimonials} />
          </Specimen>

          <PropsTable
            rows={[
              ['quote', 'ReactNode', 'Quote text. The card adds the surrounding quotation marks.'],
              ['name', 'ReactNode', 'Attribution, Nunito 800 ink-navy.'],
              ['role', 'ReactNode', 'Role / location line, brand-primary-dark. Optional.'],
              ['rating', '0 | 1 | 2 | 3 | 4 | 5', 'Number of stars shown. Default 5.'],
              ['items', 'TestimonialCardItem[]', 'TestimonialCardGrid only. Each item: id plus any TestimonialCard prop.'],
              ['columns', '1 | 2 | 3', 'TestimonialCardGrid only. Columns at lg. Default: item count, max 3.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="poster-cards" title="Poster card" intro="Verification poster: a stack of reviewer headers (gradient avatar, title, credential) and tinted check rows, closed by a dashed divider, a footer label and a status pill. Fully data-driven. Source: components/poster-card.tsx.">
          <Specimen
            title="Config-driven"
            note="Content lives in data/poster.tsx. Blocks render in array order."
            code={`<PosterCard {...poster} />`}
          >
            <PosterCard {...poster} className="max-w-[34rem]" />
          </Specimen>

          <Specimen
            title="Custom blocks"
            code={`<PosterCard blocks={[\n  { type: 'reviewer', id: 'r', avatar: 'MD', title: 'Reviewed by a Physician', subtitle: '15+ years' },\n  { type: 'point', id: 'p', tone: 'sun', text: 'Sources cited.' },\n]} footerBadge="Verified" />`}
          >
            <PosterCard
              className="max-w-[34rem]"
              blocks={[
                { type: 'reviewer', id: 'r', avatar: 'MD', title: 'Reviewed by a Physician', subtitle: '15+ years' },
                { type: 'point', id: 'p', tone: 'sun', text: 'Sources cited.' },
              ]}
              footerBadge="Verified"
            />
          </Specimen>

          <PropsTable
            rows={[
              ['blocks', 'PosterBlock[]', "Each block: { type: 'reviewer', id, avatar, title, subtitle?, tone? } or { type: 'point', id, text, tone? }."],
              ['tone', "'primary' | 'sun'", 'Per block. Reviewer: avatar gradient. Point: row tint and check color. Default primary.'],
              ['footerLabel', 'ReactNode', 'Bold line under the dashed divider. Optional.'],
              ['footerBadge', 'ReactNode', 'Status pill with check-double icon. Optional.'],
              ['footerBadgeTone', "'primary' | 'sun'", 'Pill color. Default primary.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="contact-cards" title="Contact cards" intro="A titled panel for contact details or key/value facts, described as data. Two item types: line (icon + text, optionally a link) and detail (label left, value right, dashed dividers). Three tones: tint, dark and white. An optional action renders a Button. Source: components/contact-card.tsx.">
          <Specimen
            title="Tint with action (default)"
            note="Line items with icons; phone and email are links. The action is a primary Button pinned to the bottom of the card."
            code={`const items: ContactItem[] = [\n  { type: 'line', id: 'location', icon: faLocationDot, text: 'New York, NY — working with practices in all 50 states' },\n  { type: 'line', id: 'phone', icon: faPhone, text: '(212) 555-0142', href: 'tel:+12125550142' },\n  { type: 'line', id: 'email', icon: faEnvelope, text: 'hello@clinicianreviewed.com', href: 'mailto:hello@clinicianreviewed.com' },\n]\n\n<ContactCard title="Our Studio" items={items} action={{ label: 'Book a Free Consult', href: '#contact' }} />`}
          >
            <div className="w-full max-w-[36rem]"><ContactCard title="Our Studio" items={demoLines} action={{ label: 'Book a Free Consult', href: '#contact' }} /></div>
          </Specimen>

          <Specimen
            title="Dark with detail rows"
            note="Label/value rows with dashed dividers. Use tone=&quot;dark&quot; next to a tint card for contrast."
            code={`const hours: ContactItem[] = [\n  { type: 'detail', id: 'mon-thu', label: 'Monday – Thursday', value: '9:00AM – 6:00PM ET' },\n  { type: 'detail', id: 'fri', label: 'Friday', value: '9:00AM – 5:00PM ET' },\n  { type: 'detail', id: 'sat', label: 'Saturday', value: 'By appointment' },\n  { type: 'detail', id: 'sun', label: 'Sunday', value: 'Closed' },\n]\n\n<ContactCard tone="dark" title="Response Hours" items={hours} />`}
          >
            <div className="w-full max-w-[36rem]"><ContactCard tone="dark" title="Response Hours" items={demoHours} /></div>
          </Specimen>

          <Specimen
            title="White"
            note="Border-line border instead of a fill. Quietest tone, good on a tinted section background."
            code={`<ContactCard tone="white" title="Our Studio" items={items} action={{ label: 'Book a Free Consult', href: '#contact', variant: 'outline' }} />`}
          >
            <div className="w-full max-w-[36rem]"><ContactCard tone="white" title="Our Studio" items={demoLines} action={{ label: 'Book a Free Consult', href: '#contact', variant: 'outline' }} /></div>
          </Specimen>

          <Specimen
            title="Dark with a sun action"
            note="On dark, use the sun variant for the single most-wanted action."
            code={`<ContactCard tone="dark" title="Our Studio" items={items} action={{ label: 'Book a Free Consult', href: '#contact', variant: 'sun' }} />`}
          >
            <div className="w-full max-w-[36rem]"><ContactCard tone="dark" title="Our Studio" items={demoLines} action={{ label: 'Book a Free Consult', href: '#contact', variant: 'sun' }} /></div>
          </Specimen>

          <Specimen
            title="Alignment"
            note="align sets the title, lines and action together: left (default), center or right. Centered and right-aligned detail rows stack the label above the value."
            code={`<ContactCard align="left" title="Our Studio" items={items} action={{ label: 'Book a Free Consult', href: '#contact' }} />\n<ContactCard align="center" tone="white" title="Our Studio" items={items} action={{ label: 'Book a Free Consult', href: '#contact' }} />\n<ContactCard align="right" tone="dark" title="Response Hours" items={hours} />`}
          >
            <div className="grid w-full gap-xl lg:grid-cols-3">
              <ContactCard align="left" title="Our Studio" items={demoLines} action={{ label: 'Book a Free Consult', href: '#contact' }} />
              <ContactCard align="center" tone="white" title="Our Studio" items={demoLines} action={{ label: 'Book a Free Consult', href: '#contact' }} />
              <ContactCard align="right" tone="dark" title="Response Hours" items={demoHours} />
            </div>
          </Specimen>

          <Specimen
            title="Config-driven group"
            note="ContactCardGroup renders one card per entry, side by side from md up, equal height. Content lives in data/contact.tsx."
            code={`<ContactCardGroup cards={contactCards} />`}
          >
            <ContactCardGroup className="w-full" cards={contactCards} />
          </Specimen>

          <PropsTable
            rows={[
              ['title', 'ReactNode', 'Required. Card heading.'],
              ['items', 'ContactItem[]', "Required. line: id, icon, text, href?. detail: id, label, value."],
              ['tone', "'tint' | 'dark' | 'white'", 'Surface and text colors. Default tint. Wrappers: ContactCardTint, ContactCardDark, ContactCardWhite.'],
              ['action', '{ label, href, variant?, trailingIcon? }', 'Optional Button under the list. variant is a Button variant, default primary.'],
              ['align', "'left' | 'center' | 'right'", 'Text alignment for title, items and action. Default left. Also a default on ContactCardGroup.'],
              ['headingAs', "'h2' | 'h3' | 'h4'", 'Heading element. Default h3.'],
              ['cards', 'ContactCardEntry[]', 'ContactCardGroup only. Each entry: id plus any ContactCard prop.'],
              ['columns', '1 | 2 | 3', 'ContactCardGroup only. Columns at lg. Default: card count, max 3.'],
              ['className', 'string', 'Extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="tables" title="Tables" intro="A data-driven table: describe the columns once, pass the rows. Header row in surface-tint, border-line dividers, scrolls horizontally on small screens. Source: components/table.tsx.">
          <Specimen
            title="Sortable columns"
            note="Mark a column sortable and its header becomes a button (click cycles ascending, descending, none). Use render for badges, links or buttons."
            code={`const columns: TableColumn<Row>[] = [\n  { key: 'practice', header: 'Practice', sortable: true },\n  { key: 'service', header: 'Service', sortable: true },\n  { key: 'turnaround', header: 'Days', align: 'right', sortable: true },\n  { key: 'status', header: 'Status', render: (r) => <StatusPill>{r.status}</StatusPill> },\n]\n\n<Table columns={columns} rows={rows} getRowId={(r) => r.id} defaultSort={{ key: 'practice', direction: 'asc' }} />`}
          >
            <Table className="w-full" columns={demoColumns} rows={demoRows} getRowId={(r) => r.id} defaultSort={{ key: 'practice', direction: 'asc' }} />
          </Specimen>

          <Specimen
            title="Caption, striped, dense"
            note="caption renders a titled header and names the table for screen readers."
            code={`<Table caption="Recent deliveries" striped dense columns={columns} rows={rows} />`}
          >
            <Table className="w-full" caption="Recent deliveries" striped dense columns={demoColumns} rows={demoRows} />
          </Specimen>

          <Specimen
            title="Empty state"
            code={`<Table columns={columns} rows={[]} emptyMessage="No deliveries yet." />`}
          >
            <Table className="w-full" columns={demoColumns} rows={[]} emptyMessage="No deliveries yet." />
          </Specimen>

          <PropsTable
            rows={[
              ['columns', 'TableColumn<Row>[]', 'Required. Each column: key, header, plus optional render, align, sortable, sortValue, width, className.'],
              ['rows', 'Row[]', 'Required. Cells read row[key] unless the column has render.'],
              ['getRowId', '(row, index) => string | number', 'Stable React key per row. Default: index.'],
              ['caption', 'ReactNode', 'Titled caption above the table.'],
              ['defaultSort', "{ key: string; direction: 'asc' | 'desc' }", 'Initial sort. Empty values always sort last.'],
              ['striped', 'boolean', 'Zebra-stripe body rows.'],
              ['dense', 'boolean', 'Tighter cell padding.'],
              ['emptyMessage', 'ReactNode', 'Shown when rows is empty.'],
              ['onRowClick', '(row, index) => void', 'Makes rows clickable and keyboard-focusable.'],
              ['className', 'string', 'Extra classes on the frame, appended last.'],
            ]}
          />
        </Section>

        <Section id="table-parts" title="Table elements" intro="Composable table elements for static tabular data (comparisons, specs, schedules) where you write the rows by hand. Same look as the data-driven Table. Source: components/table-parts.tsx.">
          <Specimen
            title="Basic table"
            note="Use TableHeaderCell scope=&quot;row&quot; for a row's label cell, and align to line up numbers or checkmarks."
            code={`<TableFrame caption="Plan comparison">\n  <TableHead>\n    <TableRow>\n      <TableHeaderCell>Feature</TableHeaderCell>\n      <TableHeaderCell align="center">Essentials</TableHeaderCell>\n      <TableHeaderCell align="center">Growth</TableHeaderCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    <TableRow>\n      <TableHeaderCell scope="row">Peer-reviewed blogs</TableHeaderCell>\n      <TableCell align="center">1 / month</TableCell>\n      <TableCell align="center">4 / month</TableCell>\n    </TableRow>\n    <TableRow>\n      <TableHeaderCell scope="row">Social posts</TableHeaderCell>\n      <TableCell align="center">4</TableCell>\n      <TableCell align="center">16</TableCell>\n    </TableRow>\n  </TableBody>\n</TableFrame>`}
          >
            <TableFrame caption="Plan comparison" frameClassName="w-full">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Feature</TableHeaderCell>
                  <TableHeaderCell align="center">Essentials</TableHeaderCell>
                  <TableHeaderCell align="center">Growth</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableHeaderCell scope="row">Peer-reviewed blogs</TableHeaderCell>
                  <TableCell align="center">1 / month</TableCell>
                  <TableCell align="center">4 / month</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell scope="row">Social posts</TableHeaderCell>
                  <TableCell align="center">4</TableCell>
                  <TableCell align="center">16</TableCell>
                </TableRow>
              </TableBody>
            </TableFrame>
          </Specimen>

          <Specimen
            title="Striped, dense, with footer"
            note="striped and dense are set once on TableFrame. TableFoot is for totals and notes."
            code={`<TableFrame striped dense>\n  <TableHead>...</TableHead>\n  <TableBody>...</TableBody>\n  <TableFoot>\n    <TableRow>\n      <TableCell>Total</TableCell>\n      <TableCell align="right">$990</TableCell>\n    </TableRow>\n  </TableFoot>\n</TableFrame>`}
          >
            <TableFrame striped dense frameClassName="w-full">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Item</TableHeaderCell>
                  <TableHeaderCell align="right">Price</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow><TableCell>Service page</TableCell><TableCell align="right">$250</TableCell></TableRow>
                <TableRow><TableCell>Blog post</TableCell><TableCell align="right">$245</TableCell></TableRow>
                <TableRow><TableCell>Local SEO content</TableCell><TableCell align="right">$495</TableCell></TableRow>
              </TableBody>
              <TableFoot>
                <TableRow><TableCell>Total</TableCell><TableCell align="right">$990</TableCell></TableRow>
              </TableFoot>
            </TableFrame>
          </Specimen>

          <PropsTable
            rows={[
              ['TableFrame', 'caption, dense, striped, frameClassName', 'Outer scrolling frame + <table>. className goes on the <table>.'],
              ['TableHead / TableBody / TableFoot', '<thead> / <tbody> / <tfoot>', 'Sections. Head uses surface-tint; foot is bold on surface-muted.'],
              ['TableRow', '<tr>', 'border-line divider. Body rows get a hover tint.'],
              ['TableHeaderCell', "align, scope ('col' | 'row')", 'Nunito 800 ink-navy. Default scope col.'],
              ['TableCell', "align: 'left' | 'center' | 'right'", 'Body cell. Default left.'],
              ['className', 'string', 'Every element accepts extra classes, appended last.'],
            ]}
          />
        </Section>

        <Section id="accordions" title="Accordions" intro="A data-driven accordion for FAQs and expandable details: describe the items once, pass them in. Same card frame as ServiceCard; the border turns brand-primary when an item is open. Source: components/accordion.tsx.">
          <Specimen
            title="Single (default)"
            note="Opening an item closes the others. defaultOpen sets what starts open."
            code={`const items: AccordionItem[] = [\n  { id: 'verified', title: 'What does Double-Verified mean?', content: '...' },\n  { id: 'turnaround', title: 'How long does a review take?', content: '...' },\n]\n\n<Accordion items={items} defaultOpen={['verified']} />`}
          >
            <Accordion className="w-full" items={demoFaqs} defaultOpen={['verified']} />
          </Specimen>

          <Specimen
            title="Multiple"
            note="type=&quot;multiple&quot; lets any number of items stay open. An item can be disabled."
            code={`<Accordion type="multiple" items={items} defaultOpen={['verified', 'turnaround']} />`}
          >
            <Accordion className="w-full" type="multiple" items={demoFaqs} defaultOpen={['verified', 'turnaround']} />
          </Specimen>

          <PropsTable
            rows={[
              ['items', 'AccordionItem[]', 'Required. Each item: id, title, content, optional disabled.'],
              ['type', "'single' | 'multiple'", 'Single closes others on open. Default single.'],
              ['defaultOpen', 'string[]', 'Item ids open on first render.'],
              ['headingAs', "'h2' | 'h3' | 'h4'", 'Heading element around each header button. Default h3.'],
              ['className', 'string', 'Extra classes on the wrapper, appended last.'],
            ]}
          />
        </Section>
      </main>
    </div>
  )
}
