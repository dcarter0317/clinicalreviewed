import { faArrowRight, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ContactCardEntry } from '../components/contact-card'

/**
 * Content for the contact cards. Edit, add, remove or reorder entries here;
 * ContactCardGroup renders whatever is in the array.
 * Item types: `line` (icon, text, optional href) and `detail` (label, value).
 * Tone is 'tint' | 'dark' | 'white'.
 */
export const contactCards: ContactCardEntry[] = [
  {
    id: 'studio',
    title: 'Our Studio',
    tone: 'tint',
    items: [
      { type: 'line', id: 'location', icon: faLocationDot, text: 'New York, NY — working with practices in all 50 states' },
      { type: 'line', id: 'phone', icon: faPhone, text: '(212) 555-0142', href: 'tel:+12125550142' },
      { type: 'line', id: 'email', icon: faEnvelope, text: 'hello@clinicianreviewed.com', href: 'mailto:hello@clinicianreviewed.com' },
    ],
    action: { label: 'Book a Free Consult', href: '#contact', trailingIcon: <FontAwesomeIcon icon={faArrowRight} /> },
  },
  {
    id: 'hours',
    title: 'Response Hours',
    tone: 'dark',
    items: [
      { type: 'detail', id: 'mon-thu', label: 'Mon – Thu', value: '9:00AM – 6:00PM ET' },
      { type: 'detail', id: 'fri', label: 'Fri', value: '9:00AM – 5:00PM ET' },
      { type: 'detail', id: 'sat', label: 'Sat', value: 'By appointment' },
      { type: 'detail', id: 'sun', label: 'Sun', value: 'Closed' },
      { type: 'detail', id: 'draft', label: 'Draft turnaround', value: '5–7 business days' },
      { type: 'detail', id: 'review', label: 'Clinical review', value: '48–72 hours' },
    ],
  },
]
