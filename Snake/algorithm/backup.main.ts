import type { Direction, Position, SnakeGame } from '../types';

export const stepDuration = 400;

/**
 * Start the game and keep its rules in this file.
 * @param snake Snake instance implementing the SnakeGame contract in types.ts.
 * @returns changeDirection for keyboard input and stop for cleanup.
 * Snake handles segment movement and delegates all drawing to its renderer.
 */
export function gameLoop(snake: SnakeGame) {
  let direction = snake.direction;
  let score = 0;
  let isGameOver = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  let applePosition = placeApple();

  /**
   * Keep the last allowed direction for the upcoming tick.
   * @param nextDirection Direction requested by the player.
   * @returns Nothing. Replace the pending choice, rejecting reversals against the last move.
   */
  function changeDirection(nextDirection: Direction): void {
    if (isGameOver) return;

    if (snake.CanTurn(nextDirection)) {
      direction = nextDirection;
    }
  }

  /**
   * Choose an empty cell for the apple by reading the segment array.
   * No input. Read gridSize and segments from snake.
   * @returns A random free position, or null when the snake fills the board.
   */
  function placeApple(): Position | null {
    const freePositions: Position[] = [];

    for (let y = 0; y < snake.gridSize; y++) {
      for (let x = 0; x < snake.gridSize; x++) {
        let isOccupied = false;

        for (let index = 0; index < snake.segments.length; index++) {
          const segment = snake.segments[index];
          if (segment.x === x && segment.y === y) {
            isOccupied = true;
            break;
          }
        }

        if (!isOccupied) freePositions.push({ x, y });
      }
    }

    if (freePositions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * freePositions.length);
    return freePositions[randomIndex];
  }

  /**
   * Detect a position outside the square board.
   * @param position Next head coordinates, without changing the snake.
   * @returns true if x or y is outside 0 through gridSize - 1.
   */
  function hitsWall(position: Position): boolean {
    return position.x < 0 || position.x >= snake.gridSize ||
      position.y < 0 || position.y >= snake.gridSize;
  }

  /**
   * Compare the next head with each segment that will remain occupied.
   * @param position Next head coordinates.
   * @param willGrow Whether the snake will eat the apple this turn.
   * @returns true if the head would reach an occupied cell.
   */
  function hitsBody(position: Position, willGrow: boolean): boolean {
    // Without growth, the tail leaves its cell during the same move.
    let firstIndex = 1;
    if (willGrow) firstIndex = 0;

    for (let index = firstIndex; index < snake.segments.length; index++) {
      const segment = snake.segments[index];
      if (segment.x === position.x && segment.y === position.y) return true;
    }

    return false;
  }

  /**
   * Request exactly one move using the direction selected for this turn.
   * No input. Snake updates and draws its segments inside each Move method.
   * @returns true if the move succeeded, false if it was blocked.
   */
  function moveSnake(): boolean {
    if (direction === 'up') return snake.MoveUp();
    if (direction === 'down') return snake.MoveDown();
    if (direction === 'left') return snake.MoveLeft();
    return snake.MoveRight();
  }

  /**
   * Stop automatic turns when React removes the game page.
   * No input or return value. Calling stop several times is safe.
   */
  function stop(): void {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  /**
   * Finish the game, then ask Snake to display the result.
   * @param won true for a full board, false for a collision.
   * @returns Nothing. Prevent later turns and keyboard changes.
   */
  function gameOver(won: boolean): void {
    isGameOver = true;
    stop();
    snake.GameOver(won);
  }

  /**
   * Play one complete turn. The timer calls this every stepDuration milliseconds.
   * No input or return value. Update the snake, score, and apple as needed.
   */
  function playTurn(): void {
    if (isGameOver) return;

    // 1. Calculate the next cell without moving yet.
    const nextPosition = snake.GetNextPosition(direction);

    // 2. Check the walls before changing any coordinates.
    if (hitsWall(nextPosition)) {
      gameOver(false);
      return;
    }

    // 3. Check whether the next cell contains the apple.
    const willGrow = applePosition !== null &&
      nextPosition.x === applePosition.x && nextPosition.y === applePosition.y;

    // 4. Check the body, accounting for the tail staying in place when growing.
    if (hitsBody(nextPosition, willGrow)) {
      gameOver(false);
      return;
    }

    // 5. Request growth before moving so that this move keeps the tail.
    if (willGrow) snake.Grow();

    if (!moveSnake()) {
      gameOver(false);
      return;
    }

    // 6. After a successful meal, update the score and choose a new apple cell.
    if (willGrow) {
      score += 1;
      snake.ShowScore(score);
      applePosition = placeApple();
      snake.ShowApple(applePosition);

      if (applePosition === null) gameOver(true);
    }
  }

  // Show the initial game state, then start the timer.
  snake.ShowScore(score);
  snake.ShowApple(applePosition);

  if (applePosition === null) {
    gameOver(true);
  } else {
    timer = setInterval(playTurn, stepDuration);
  }

  return { changeDirection, stop };
}
