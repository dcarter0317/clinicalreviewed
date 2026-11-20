import type { PlanCardItem } from '../components/plan-card'

/**
 * Content for the pricing grid. Edit, add, remove or reorder entries here;
 * the grid renders whatever is in the array. Set `featured: true` on one plan.
 */
export const plans: PlanCardItem[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    frequency: '1× per month',
    price: '$495',
    features: ['1 peer-reviewed local blog', '4 matching social posts','1 Google profile post','Reviewer credentials shown'],
    ctaHref: '#contact',
  },
  {
    id: 'growth',
    name: 'Growth',
    frequency: '2× per month',
    price: '$845',
    features: ['2 peer-reviewed local blogs', '8 matching social posts','2 Google profile posts','Quarterly strategy call'],
    ctaHref: '#contact',
    featured: true,
  },
  {
    id: 'authority',
    name: 'Authority',
    frequency: '3× per month',
    price: '$1,195',
    features: ['3 peer-reviewed local blogs', '12 matching social posts','3 Google profile posts','Monthly performance snapshot'],
    ctaHref: '#contact',
  },
  {
    id: 'dominance',
    name: 'Dominance',
    frequency: '4× per month',
    price: '$1,495',
    features: ['4 peer-reviewed local blogs', '16 matching social posts','Monthly strategy call','1 website page refresh'],
    ctaHref: '#contact',
  },
]
