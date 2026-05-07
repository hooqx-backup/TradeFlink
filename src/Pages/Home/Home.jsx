import React from 'react';
import Hero from './Sections/Hero';
import Stats from './Sections/Stats';
import About from './Sections/About';
import Vision from './Sections/Vision';
import Mission from './Sections/Mission';
import Values from './Sections/Values';
import Services from './Sections/Services';
import Solutions from './Sections/Solutions';
import Testimonials from './Sections/Testimonials';
import FAQ from './Sections/FAQ';
import CTA from './Sections/CTA';

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      
        <Stats />
        <About />
        <Vision />
        <Mission />
        <Values />
        <Services />
        <Solutions />
        <Testimonials />
        <FAQ />
        <CTA />
      
    </div>
  );
}
