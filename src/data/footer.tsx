/**
 * Content for the site footer. Edit, add, remove or reorder entries here;
 * the footer renders whatever is in the arrays.
 * A footer link is `{ id, label, href? }`: with an `href` it renders as a link,
 * without one it renders as plain text (e.g. "OB/GYN — coming soon").
 */

export type FooterLink = {
  id: string
  label: string
  href?: string
}

export type FooterGroup = {
  id: string
  title: string
  links: FooterLink[]
}

export const footerBrand = {
  name: 'Clinician Reviewed',
  blurb:
    'Peer-reviewed blogs and social content for dental practices. Every piece checked by a board-certified dentist and a 30-year digital strategist.',
}

export const footerGroups: FooterGroup[] = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { id: 'about', label: 'About Us', href: '#about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
      { id: 'plans', label: 'Plans & Pricing', href: '#plans' },
    ],
  },
  {
    id: 'specialties',
    title: 'Specialties',
    links: [
      { id: 'dental', label: 'Dental — available now' },
      { id: 'obgyn', label: 'OB/GYN — coming soon' },
      { id: 'ortho', label: 'Orthopedics — coming soon' },
      { id: 'ophthalmology', label: 'Ophthalmology — coming soon' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    links: [
      { id: 'phone', label: '(212) 555-0142', href: 'tel:+12125550142' },
      { id: 'email', label: 'hello@clinicianreviewed.com', href: 'mailto:hello@clinicianreviewed.com' },
      { id: 'consult', label: 'Book a Free Consult', href: '#contact' },
    ],
  },
]

export const footerLegal = {
  copyright: 'Clinician Reviewed (concept). All rights reserved.',
  accessibility: "If you have difficulty using our website, please email or call us — we're happy to help.",
}
