import { ContactCardGroup } from '../components/contact-card';
import { PrimaryButton } from '../components/button';
import { contactCards } from '../data/contact';

export default function Contact() {
  return (
       <>
      <div className="bg-surface-page px-4 py-16 md:px-8">
        <div id="contact" className="w-fit-content mx-auto max-w-160"> 
           <p className="text-label-strong uppercase text-xs font-extrabold text-accent-coral">Get In Touch</p>
           <h2 className="heading-section mb-3">We'd love to meet your practice</h2>
           <p className="pb-2">Book a free 20-minute consult, and we'll review your current content together. No pressure, no obligation.</p>
        </div>
        <section className="contact mx-auto max-w-4xl py-section-md">
          <div className="contact-content">
            <ContactCardGroup cards={contactCards} />
          </div>
        </section>
        <div>
          <PrimaryButton href="#contact" className="mx-auto block">Ask About a Service</PrimaryButton>
        </div>
      </div>
    </>
  );
}