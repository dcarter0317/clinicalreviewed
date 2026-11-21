import { PlanCardGrid } from "../components/plan-card";
import { plans } from "../data/plans";

export default function Plans() {
  return (
    <>
      <div className="bg-linear-to-b from-surface-tint to-surface-muted px-4 pb-16 md:px-8">
        <div className="w-fit-content mx-auto max-w-140 pt-16 pb-11.5 text-center">
          <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Simple Monthly Plans</p>
          <h2 className="heading-section mb-3">Pick your pace. Every plan is fully peer-reviewed</h2>
          <p className="px-1">Transparent pricing, month-to-month after 90 days, and both expert sign-offs on every single deliverable. No surprises, no lock-ins.</p>
        </div>
        <section id="plans" className="plans">
          <div className="plans-content mx-auto w-full max-w-4xl">
            <PlanCardGrid items={plans} columns={4} className="sm:grid-cols-1! lg:grid-cols-4!" />
          </div>
          <p className="mx-auto! mt-8! max-w-4xl! text-center text-[0.86rem]! font-bold text-brand-primary-dark">
            Specialty practices +15–20% for deeper clinical review · Multi-location &amp; group pricing available · Save 2 months with annual billing
          </p>
        </section>
      </div>
    </>
  )
}
