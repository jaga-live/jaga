import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Visiting any URL with ?no-track=true opts this browser out of Umami by
// setting the flag the tracker checks before sending events. Lets me exclude
// my own visits without touching the dashboard.
export default function NoTrack() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('no-track') === 'true') {
      localStorage.setItem('umami.disabled', '1');
    }
  }, [searchParams]);

  return null;
}
