import { TestimonialCardGrid } from '../components/testimonial-card'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
      <>
        <div className="w-fit-content pt-16 pb-[46px] mt-6 mx-auto max-w-140"> 
            <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Testimonials</p>
            <h2 className="heading-section mb-3">What practices say about working with us</h2>
            <p className="px-1">Concept placeholders: your founding practices' words will live here.</p>
          </div>
        <section id="testimonials" className="testimonials px-4 md:px-8 pt-0 pb-section-md">
          <div className="testimonials-content mx-auto max-w-5xl">
            <TestimonialCardGrid items={testimonials} />
          </div>
        </section>
      </>
  )
}
