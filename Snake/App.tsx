import { useRef, useState } from 'react';
import { GamePage } from './GamePage';
import { HomePage } from './HomePage';

export function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const homeRef = useRef<HTMLDivElement>(null);
  const isStarting = useRef(false);

  async function startGame() {
    if (isStarting.current) return;
    isStarting.current = true;

    const exitAnimation = homeRef.current?.animate?.(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 260, easing: 'ease-in-out', fill: 'forwards' },
    );

    await exitAnimation?.finished.catch(() => undefined);
    setShowHomePage(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true" />
            <span>triliaxy.dev</span>
          </div>
          <span className="workshop">Atelier JavaScript</span>
        </div>
      </header>

      {showHomePage ? (
        <div ref={homeRef}>
          <HomePage onStart={startGame} />
        </div>
      ) : <GamePage />}
    </>
  );
}
