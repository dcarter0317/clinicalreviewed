import { PrimaryButton, OutlineButton } from "../components/button";

export default function About() {
  return (
    <section id="about" className="about w-full px-4 py-12 md:px-8">
      <div className="about-content mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="relative flex min-h-96 items-center justify-center overflow-hidden rounded-panel-xl bg-linear-to-br from-brand-primary-light/35 via-surface-tint-deep to-surface-tint p-8">
          {/* Decorative dots */}
          <span aria-hidden="true" className="absolute top-8 left-8 size-6 rounded-full bg-accent-sun" />
          <span aria-hidden="true" className="absolute top-12 right-16 size-3 rounded-full bg-brand-primary" />
          <span aria-hidden="true" className="absolute right-10 bottom-8 size-4 rounded-full bg-accent-coral" />

          <div className="relative w-full rounded-panel-lg bg-white px-8 py-8 text-center shadow-[0_14px_40px_rgba(23,63,76,0.12)]">
            <div className="mb-2 text-5xl leading-none" aria-hidden="true">🦷 ✍️</div>
            <h2 className="m-0 mb-2 font-heading text-xl! font-extrabold text-ink-navy">Two experts. Every piece.</h2>
            <p className="m-0 text-base! leading-relaxed text-ink-body">
              A dentist checks the medicine. A strategist checks the marketing. Nothing publishes without both.
            </p>
          </div>
        </div>
        <div className="text-left">
           <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Welcome to Clinician Reviewed</p>
           <h2 className="mb-3">Your practice's voice matters to you, and it matters to us too.</h2>
           <p className="pb-2">Your name goes on every blog post and every social update your practice publishes. Patients read it. Google judges it. That's a level of trust we take personally.</p>
           <p className="pb-2">That's why we built a content service the way healthcare content deserves to be built: written for your practice, localized to your community, and reviewed by a board-certified dentist with 25–30 years of experience alongside a corporate digital strategist with over 30 years in the field, before a single word goes live.</p>
           <div className="flex gap-4 my-6">
             <PrimaryButton href="#services">Our Services</PrimaryButton>
             <OutlineButton href="">New Practices</OutlineButton>
           </div>  
        </div>
      </div>
    </section>
  )
}
