import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NoTrack from './components/NoTrack';
import Home from './pages/Home';

const FlanticProject = lazy(() => import('./pages/FlanticProject'));

export default function App() {
  return (
    <>
      <NoTrack />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="projects/flantic"
            element={
              <Suspense fallback={<div className="route-loading">Loading case study…</div>}>
                <FlanticProject />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
