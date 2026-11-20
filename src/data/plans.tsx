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
    features: ['1 peer-reviewed local blog', '4 matching social posts'],
    ctaHref: '#contact',
  },
  {
    id: 'growth',
    name: 'Growth',
    frequency: '2× per month',
    price: '$845',
    features: ['2 peer-reviewed local blogs', '8 matching social posts'],
    ctaHref: '#contact',
    featured: true,
  },
]
