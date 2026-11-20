import { PrimaryButton } from '../components/button';
import { ServiceCardGrid } from '../components/service-card'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <div className="w-fit-content mx-auto max-w-160"> 
         <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Our Services</p>
         <h2 className="heading-section mb-3">Everything your practice needs to stay visible and trusted</h2>
         <p className="pb-2">Your name goes on every blog post and every social update your practice publishes. Patients read it. Google judges it. That's a level of trust we take personally.</p>
         <p className="pb-2">That's why we built a content service the way healthcare content deserves to be built: written for your practice, localized to your community, and reviewed by a board-certified dentist with 25–30 years of experience alongside a corporate digital strategist with over 30 years in the field, before a single word goes live.</p>
      </div>
      <section id="services" className="services px-xl py-section-md">
        <div className="services-content">
          <ServiceCardGrid items={services} />
        </div>
      </section>
      <div>
        <PrimaryButton href="#contact" className="mx-auto block">Ask About a Service</PrimaryButton>
      </div>
    </>
  )
}
