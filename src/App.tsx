import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ProjectDetail from './components/ProjectDetail';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <AnimatedBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
