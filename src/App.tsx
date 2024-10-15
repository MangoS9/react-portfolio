import { useState, useEffect } from 'react';
import Navigation from './component/Navigation';
import Home from './component/Home';
import Loading_SCR from './component/Loading_SCR';

function App() {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStarted, setLoadingStarted] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleStart = () => setLoadingStarted(true);
  const handleProgress = (progress: number) => setLoadingProgress(progress);

  useEffect(() => {
    if (loadingProgress >= 100) {
      // Add class to body to trigger animation
      document.body.classList.add('play-gradient');

      const timeoutId = setTimeout(() => setShowContent(true), 2000); // 2-second delay
      return () => clearTimeout(timeoutId);
    }
  }, [loadingProgress]);

  return (
    <div>
      {!showContent ? (
        <Loading_SCR 
          onStart={handleStart} 
          onProgress={handleProgress} 
          loadingStarted={loadingStarted} 
        />
      ) : (
        <>
          <Navigation />
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
