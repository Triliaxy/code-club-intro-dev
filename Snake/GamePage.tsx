import { useEffect, useRef } from 'react';
import { BoardGrid } from './BoardGrid';

const gridSize = 8;

export function GamePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="game-screen">
      <section className="board-panel" aria-labelledby="game-title">
        <div className="panel-header">
          <h1 id="game-title" ref={titleRef} tabIndex={-1}>Plateau de jeu</h1>
          <span className="board-size">{gridSize} × {gridSize}</span>
        </div>

        <BoardGrid
          size={gridSize}
          description={`Grille de ${gridSize} cases sur ${gridSize}.`}
        />
      </section>
    </main>
  );
}
