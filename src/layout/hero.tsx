import { OutlineButton, SunButton } from '../components/button';
import { Kicker } from '../components/badge';
import PosterCard from '../components/poster-card';
import { poster } from '../data/poster';
import { Tag } from '../components/badge';


export default function Hero() {
  return (
    <>
      <section className="hero relative bg-linear-to-b from-surface-tint to-surface-tint-deep px-4 pt-8 pb-24 md:px-8">
       <div className="mx-auto w-full max-w-6xl md:flex md:items-center gap-6">
        <div className="hero-copy px-2 text-left md:basis-2/4 md:shrink-0">
          <Kicker className="my-4">Now welcoming founding practices</Kicker>
          <h1>Friendly, trustworthy content for your practice, <span className="text-brand-primary">reviewed by real experts.</span></h1>
          <p>We write your blogs and social posts, localize them to your neighborhood, and have every piece checked by a board-certified dentist and a 30-year digital strategist, so you can focus on your patients.</p>
          <div className="flex gap-4 my-6">
             <SunButton href="#plans">View Our Plans</SunButton>
             <OutlineButton href="#how">How It Works</OutlineButton>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Tag>General & Specialty Practices </Tag>   
            <Tag>1–4 Posts Monthly</Tag>   
            <Tag>No Long Contracts</Tag>
          </div>
        </div>
        <div className="hero-image mt-6 md:mt-0 md:basis-2/5 md:grow">
          <PosterCard {...poster} />
        </div>
       </div>
      </section>
       <svg className="wave fill-surface-page" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
         <path d="M0,40 C240,80 480,0 720,25 C960,50 1200,70 1440,30 L1440,70 L0,70 Z"></path>
       </svg>
    </>
  )
}