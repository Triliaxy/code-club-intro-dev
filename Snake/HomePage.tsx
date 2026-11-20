import type { CSSProperties } from 'react';
import { BoardGrid } from './BoardGrid';

type Position = { x: number; y: number };

const gridSize = 5;

const head: Position = { x: 2, y: 2 };
const apple: Position = { x: 3, y: 2 };
const snakeSegments = [
  { position: { x: 0, y: 2 }, className: 'tail' },
  { position: { x: 1, y: 2 }, className: 'body' },
  { position: head, className: 'head' },
];

function cellStyle({ x, y }: Position): CSSProperties {
  // CSS Grid lines start at 1, while game coordinates start at 0.
  return { gridColumnStart: x + 1, gridRowStart: y + 1 };
}

type HomePageProps = {
  onStart: () => void;
};

export function HomePage({ onStart }: HomePageProps) {
  const boardDescription = `Grille de ${gridSize} cases sur ${gridSize}. La tête du serpent est en (${head.x}, ${head.y}) et la pomme en (${apple.x}, ${apple.y}).`;

  return (
    <main className="game-layout">
      <div className="introduction">
        <h1>Snake<span aria-hidden="true">.</span></h1>
        <p>Attrape la pomme pour grandir. Évite les murs et ton propre corps.</p>
      </div>

      <section className="board-panel" aria-labelledby="board-title">
        <div className="panel-header">
          <h2 id="board-title">Aperçu du plateau</h2>
          <div className="score">
            <span id="score-label">Score</span>
            <output id="score" aria-labelledby="score-label">0</output>
          </div>
        </div>

        <BoardGrid size={gridSize} description={boardDescription}>
          {snakeSegments.map(({ position, className }) => (
            <span
              key={`${position.x},${position.y}`}
              className={`cell snake-segment ${className}`}
              style={cellStyle(position)}
            />
          ))}
          <span className="cell apple" style={cellStyle(apple)} />
        </BoardGrid>

        <ul className="legend">
          <li><span className="snake-swatch" aria-hidden="true" />Serpent</li>
          <li><span className="apple-swatch" aria-hidden="true" />Pomme</li>
        </ul>
      </section>

      <section className="controls" aria-labelledby="controls-title">
        <h2 id="controls-title">Commandes</h2>
        <div className="keyboard-help">
          <div className="arrow-keys" aria-hidden="true">
            <kbd>↑</kbd>
            <kbd>←</kbd>
            <kbd>↓</kbd>
            <kbd>→</kbd>
          </div>
          <p>Utilise les flèches pour choisir une direction.</p>
        </div>
        <button id="Start" type="button" onClick={onStart}>
          Commencer <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}
