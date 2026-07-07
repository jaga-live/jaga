import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from './components/HomePage';
import CustomCursor from './components/CustomCursor';

// Case study (and its lazy Mermaid dependency) is split out of the initial bundle.
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={<div className="min-h-screen bg-paper" />}>
              <ProjectDetail />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
