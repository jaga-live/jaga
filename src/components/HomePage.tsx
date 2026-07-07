import Nav from './Nav';
import Hero from './Hero';
import SelectedWork from './SelectedWork';
import ExperienceStrip from './ExperienceStrip';
import Contact from './Contact';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <ExperienceStrip />
      </main>
      <Contact />
    </>
  );
}
