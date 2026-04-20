import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TracksBar } from '@/components/sections/TracksBar';
import { Courses } from '@/components/sections/Courses';
import { Benefits } from '@/components/sections/Benefits';
import { Testimonials } from '@/components/sections/Testimonials';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Certification } from '@/components/sections/Certification';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ExitIntent } from '@/components/ExitIntent';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TracksBar />
        <Courses />
        <Benefits />
        <Testimonials />
        <HowItWorks />
        <Certification />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ExitIntent />
    </>
  );
}
