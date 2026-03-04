import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import content from './data/content.json';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Celebrities from './components/Celebrities';
import ServicesPanels from './components/ServicesPanels';
import HorizontalGallery from './components/HorizontalGallery';
import BookingSection from './components/BookingSection';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="bg-silk">
      <Navbar />
      <Hero content={content} />
      <Celebrities />
      <ServicesPanels />
      <HorizontalGallery posts={content.posts} />
      <BookingSection />
      <ContactFooter />
      <WhatsAppButton />
    </div>
  );
}

export default App;
