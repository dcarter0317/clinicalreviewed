import type { NavItem } from '../components/nav'

/**
 * Content for the site navigation. Edit, add, remove or reorder entries here;
 * the nav renders whatever is in the array.
 * Per item: `id` (matches the section id), `label`, optional `href` override,
 * plus any <a> attribute.
 */
export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'plans', label: 'Plans' },
  { id: 'contact', label: 'Contact' },
]
