import type { PosterCardProps } from '../components/poster-card'

/**
 * Content for the verification poster. Edit, add, remove or reorder blocks here;
 * the card renders whatever is in the array.
 * Block types: `reviewer` (avatar, title, subtitle, tone) and `point` (text, tone).
 * Tone is 'primary' (teal) or 'sun' (orange).
 */
export const poster: PosterCardProps = {
  blocks: [
    { type: 'reviewer', id: 'dentist', avatar: 'DDS', title: 'Checked by a Board-Certified Dentist', subtitle: '25+ years of clinical experience' },
    { type: 'point', id: 'accuracy', text: 'Every treatment fact and recovery timeline verified for clinical accuracy.' },
    { type: 'point', id: 'local', tone: 'sun', text: 'Localized to your neighborhood, landmarks, and community.' },
    { type: 'reviewer', id: 'strategist', tone: 'sun', avatar: '30y', title: 'Approved by a Digital Strategist', subtitle: '30+ years in corporate digital strategy & SEO' },
    { type: 'point', id: 'seo', text: 'Optimized for local search, AI search, and patient conversion.' },
  ],
  footerLabel: "Ready to publish under your practice's name",
  footerBadge: 'Double-Verified',
}
