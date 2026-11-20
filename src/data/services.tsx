import { faComments, faLeaf, faMagnifyingGlass, faMobileScreen, faNewspaper, faEnvelope, faStar, faVideo } from '@fortawesome/free-solid-svg-icons'
import type { ServiceCardItem } from '../components/service-card'

/**
 * Content for the services grid. Edit, add, remove or reorder entries here;
 * the grid renders whatever is in the array.
 * Per item: `icon` (Font Awesome definition), `tint` (1-4, optional, cycles by position),
 * `headingAs`, `className`, plus any <a> attribute (target, rel, aria-label...).
 */
export const services: ServiceCardItem[] = [
  { id: 'blogs', icon: faNewspaper, title: 'Peer-Reviewed Blogs', description: 'Patient-friendly articles verified by a board-certified dentist.', href: '#plans' },
  { id: 'social', icon: faMobileScreen, title: 'Social Media Posts', description: 'On-brand posts reviewed for clinical accuracy before they go live.', href: '#plans' },
  { id: 'email', icon: faEnvelope, title: 'Patient Emails', description: 'Newsletters and reminders written in a warm, trustworthy voice.', href: '#plans' },
  { id: 'pages', icon: faLeaf, title: 'Service Pages', description: 'Clear treatment pages that answer what patients actually ask.', href: '#plans' },
  { id: 'faqs', icon: faComments, title: 'Patient FAQs', description: 'Plain-language answers to the questions patients ask most.', href: '#plans' },
  { id: 'video', icon: faVideo, title: 'Video Scripts', description: 'Short, accurate scripts for chairside and social video.', href: '#plans' },
  { id: 'reviews', icon: faStar, tint: 2, title: 'Review Responses', description: 'Thoughtful replies that protect your reputation and privacy.', href: '#plans' },
  { id: 'seo', icon: faMagnifyingGlass, tint: 1, title: 'Local SEO Content', description: 'Content that helps nearby patients find your practice.', href: '#plans' },
]
