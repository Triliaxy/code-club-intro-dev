import { useEffect, useRef, useState } from 'react';
import { BoardGrid } from './BoardGrid';
import { listenToArrowKeys } from './DOM_manipulation/keyboard';
import { Snake } from './DOM_manipulation/Snake';
import { gameLoop } from './algorithm/main';

export const gridSize = 6;

export function GamePage() {
  const [gameNumber, setGameNumber] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const snakeLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);

    const snakeLayer = snakeLayerRef.current;
    if (!snakeLayer) return;

    const restartGame = () => setGameNumber((number) => number + 1);
    const snake = new Snake(snakeLayer, gridSize, restartGame);
    const { changeDirection, stop } = gameLoop(snake);
    const stopListening = listenToArrowKeys(snakeLayer.ownerDocument, changeDirection);

    return () => {
      stopListening();
      stop();
      snake.clear();
    };
  }, [gameNumber]);

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
        >
          <div className="snake-layer" ref={snakeLayerRef} />
        </BoardGrid>
      </section>
    </main>
  );
}
