import { ServiceCardGrid } from '../components/service-card'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="services px-xl py-section-md">
      <div className="services-content">
        <ServiceCardGrid items={services} />
      </div>
    </section>
  )
}
