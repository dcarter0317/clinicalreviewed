import type { TestimonialCardItem } from '../components/testimonial-card'

/**
 * Content for the testimonials grid. Edit, add, remove or reorder entries here;
 * the grid renders whatever is in the array.
 * Per item: `quote`, `name`, `role`, `rating` (0-5, default 5), `className`.
 */
export const testimonials: TestimonialCardItem[] = [
  {
    id: 'pediatric-westchester',
    quote: 'The local touch is what surprised us. New families keep telling us they found us through an article.',
    name: 'Practice Manager',
    role: 'Pediatric Dentistry · Westchester, NY',
  },
]
