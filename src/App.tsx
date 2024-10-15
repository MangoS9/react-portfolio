import { useState, useEffect } from 'react';
import Navigation from './component/Navigation';
import Home from './component/Home';
import Loading_SCR from './component/Loading_SCR';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading_SCR />
      ) : (
        <>
          <Navigation />
          <Home />
        </>
      )}
    </>
  );
}

export default App;
