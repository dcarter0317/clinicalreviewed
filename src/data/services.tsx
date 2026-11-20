import { faArrowsRotate, faCalendarDays, faHospital, faLocationDot, faMagnifyingGlass, faMobileScreenButton, faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons'
import type { ServiceCardItem } from '../components/service-card'

/**
 * Content for the services grid. Edit, add, remove or reorder entries here;
 * the grid renders whatever is in the array.
 * Per item: `icon` (Font Awesome definition, emoji string, or element), `tint` (1-4, optional,
 * cycles by position), `headingAs`, `className`, plus any <a> attribute (target, rel, aria-label...).
 */
export const services: ServiceCardItem[] = [
  { id: 'blogs', icon: faPenToSquare, tint: 1, title: 'Peer-Reviewed Blogs', description: 'Patient-friendly articles verified by a board-certified dentist, published with visible reviewer credentials.', href: '#plans' },
  { id: 'social', icon: faMobileScreenButton, tint: 2, title: 'Social Media Content', description: 'Matching posts for Facebook and Instagram that keep your practice friendly, active, and on-brand.', href: '#plans' },
  { id: 'local', icon: faLocationDot, tint: 3, title: 'Local Content', description: "Your streets, your landmarks, your community — woven into every piece so patients know you're truly local.", href: '#plans' },
  { id: 'seo', icon: faMagnifyingGlass, tint: 4, title: 'Search Optimization', description: 'Every piece structured for Google and AI search by a 30-year digital strategy veteran.', href: '#plans' },
  { id: 'specialty', icon: faHospital, tint: 2, title: 'Specialty Content', description: 'Ortho, perio, endo, oral surgery, pediatric — reviewed with the extra care specialty topics require.', href: '#plans' },
  { id: 'google', icon: faStar, tint: 1, title: 'Google Profile Posts', description: 'Fresh updates for your Google Business Profile, the first thing local patients see.', href: '#plans' },
  { id: 'refresh', icon: faArrowsRotate, tint: 4, title: 'Content Refreshes', description: 'We update your existing website pages so older content stays accurate and keeps ranking.', href: '#plans' },
  { id: 'planning', icon: faCalendarDays, tint: 3, title: 'Content Planning', description: 'Strategy calls and a topic calendar built around your services, seasons, and goals.', href: '#plans' },
]
