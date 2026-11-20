import { TestimonialCardGrid } from '../components/testimonial-card'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
      <>
        <div className="w-fit-content mx-auto max-w-140"> 
            <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Testimonials</p>
            <h2 className="heading-section mb-3">What practices say about working with us</h2>
            <p className="pb-2">Concept placeholders: your founding practices' words will live here.</p>
          </div>
        <section id="testimonials" className="testimonials px-xl py-section-md">
          <div className="testimonials-content">
            <TestimonialCardGrid items={testimonials} />
          </div>
        </section>
      </>
  )
}
