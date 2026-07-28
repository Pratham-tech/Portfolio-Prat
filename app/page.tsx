import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';
import CursorGlow from '@/components/CursorGlow';
import ParticleField from '@/components/ParticleField';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <ParticleField />
      </div>
      <ScrollObserver />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
