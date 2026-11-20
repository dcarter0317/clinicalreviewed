import { TestimonialCardGrid } from '../components/testimonial-card'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials px-xl py-section-md">
      <div className="testimonials-content">
        <TestimonialCardGrid items={testimonials} />
      </div>
    </section>
  )
}
