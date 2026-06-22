import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import Notes from '@/components/Notes';
import Story from '@/components/Story';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageReveal from '@/components/PageReveal';
import ScrollProgress from '@/components/ScrollProgress';
import SectionDivider from '@/components/SectionDivider';

export default function Page() {
  return (
    <>
      <PageReveal />
      <ScrollProgress />
      <main className="relative">
        <Nav />
        <Hero />
        <Collection />
        <SectionDivider tone="cream" />
        <Notes />
        <SectionDivider tone="sand" glyph="✦" />
        <Story />
        <SectionDivider tone="cream" />
        <Testimonials />
        <Newsletter />
        <CinematicFooter />
      </main>
    </>
  );
}
