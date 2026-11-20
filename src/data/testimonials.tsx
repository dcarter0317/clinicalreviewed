import type { TestimonialCardItem } from '../components/testimonial-card'

/**
 * Content for the testimonials grid. Edit, add, remove or reorder entries here;
 * the grid renders whatever is in the array.
 * Per item: `quote`, `name`, `role`, `rating` (0-5, default 5), `className`.
 */
export const testimonials: TestimonialCardItem[] = [
  {
    id: "General-Cosmetic-Dentistry",
    quote: "I used to cringe reading the blogs our old agency posted under my name, half of it wasn't even clinically right. Now every article comes back with a dentist's sign-off before it publishes. I finally stopped proofreading my own marketing.",
    name: "Dr. A. Rivera, DDS",
    role: "General & Cosmetic Dentistry · Brooklyn, NY",
  },
  {
    id: "Pediatric-Dentistry ",
    quote: "The local touch is what surprised us. Our posts mention the neighborhoods our patients actually live in, and new families keep telling us they found us through an article. It feels like it was written by someone down the street",
    name: "Practice Manager",
    role: "Pediatric Dentistry · Westchester, NY",
  },
  {
    id: "Periodontics-Implants ",
    quote: "As a specialist, generic content was useless to me. Their reviewer actually understands perio, and the strategist knew exactly which implant questions patients search for. Two experts on every piece isn't a gimmick, you can see it.” ",
    name: "Dr. S. Okafor, DDS, MS",
    role: "Periodontics & Implants · NJ",
  },
  {
    id: "Family-Dentistry ",
    quote: "Set-it-and-forget-it, but with standards. Content shows up on schedule, our Google profile stays fresh, and we've never once had to walk back a claim. Worth every penny for the peace of mind alone.",
    name: "Dr. M. Chen, DMD",
    role: "Family Dentistry · Queens, NY",
  }
]
