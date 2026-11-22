import type { Direction, Position, SnakeGame } from '../types';
import { SnakeRenderer } from './SnakeRenderer';

/** Store the snake state and provide the actions used by algorithm/main.ts. */
export class Snake implements SnakeGame {
  /** Board width and height in cells. Initialize from the constructor argument. */
  readonly gridSize: number;

  /** Last successful movement direction. Initialize with right. */
  direction: Direction = 'right';

  /**
  * Positions ordered from tail at index 0 to head at the last index.
  * Initialize with three adjacent cells, for example (3, 4), (4, 4), (5, 4).
  * Initial positions must fit inside the supplied gridSize.
  */
  segments: Position[] = [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }];

  /** Create a SnakeRenderer instance in the constructor and store it here. */
  private readonly renderer: SnakeRenderer;

  /** Number of extra segments to add on later successful moves. Initialize with 0. */
  private pendingGrowth: number = 0;

  /**
  * Initialize all properties above, then ask the renderer to draw the snake.
  * Timing belongs to main.ts and is not needed by this constructor.
  * @param container Empty DOM layer provided by GamePage for SnakeRenderer.
  * @param gridSize Number of cells on each side of the square board.
  * @param onRestart Callback supplied by GamePage to start a fresh game.
  */
  constructor(container: HTMLElement, gridSize: number, onRestart?: () => void) {
    this.gridSize = gridSize;
    this.renderer = new SnakeRenderer(container, onRestart);
    this.renderer.render(this.segments, this.direction);
  }

  /**
  * Calculate a position one cell away from the head without changing any state.
  * Decrease y for up, increase y for down, decrease x for left, increase x for right.
  * Return the calculated position even if it is outside the board.
  * @param direction Direction to check.
  * @returns A new position object. Never modify the current head object.
  */
  GetNextPosition(direction: Direction): Position {
    const head = this.segments[this.segments.length - 1];
    switch (direction) {
      case 'up':
        return { x: head.x, y: head.y - 1 };
      case 'down':
        return { x: head.x, y: head.y + 1 };
      case 'left':
        return { x: head.x - 1, y: head.y };
      case 'right':
        return { x: head.x + 1, y: head.y };
    }
  }

  /**
  * Compare with the current direction and return true if the snake can turn or keep going.
  * Otherwise returns false because reversing is not allowed.
  */
  CanTurn(direction: Direction): boolean {
    switch (this.direction) {
      case 'up':
        return direction !== 'down';

      case 'down':
        return direction !== 'up';

      case 'left':
        return direction !== 'right';

      case 'right':
        return direction !== 'left';
    }
  }

  /**
  * Delegate one upward move to the private move method.
  * @returns true if the snake moved, false if blocked. No input.
  */
  MoveUp(): boolean {
    return this.move('up');
  }

  /**
  * Delegate one downward move to the private move method.
  * @returns true if the snake moved, false if blocked. No input.
  */
  MoveDown(): boolean {
    return this.move('down');
  }

  /**
  * Delegate one leftward move to the private move method.
  * @returns true if the snake moved, false if blocked. No input.
  */
  MoveLeft(): boolean {
    return this.move('left');
  }

  /**
  * Delegate one rightward move to the private move method.
  * @returns true if the snake moved, false if blocked. No input.
  */
  MoveRight(): boolean {
    return this.move('right');
  }

  /**
  * Add 1 to pendingGrowth. Keep the current positions until the next move.
  * @returns Nothing. No input.
  */
  Grow(): void {
    this.pendingGrowth++;
  }

  /**
  * Check CanTurn, then calculate the next head with GetNextPosition.
  * Return false if the direction is rejected or the next cell is outside the board.
  * A blocked move must preserve direction, segments, and pendingGrowth.
  * Otherwise push the new head onto segments and update direction.
  * When pendingGrowth is positive, decrease it by 1 and keep the tail.
  * Otherwise shift the old tail out of the array to keep the same length.
  * Finally ask renderer.render to draw segments using the updated direction.
  * main.ts handles body collisions, apple detection, score, and game over.
  * @param direction Direction of the requested move.
  * @returns true after a successful move, false when blocked.
  */
  private move(direction: Direction): boolean {
    if (!this.CanTurn(direction)) {
      return false;
    }

    const nextPosition = this.GetNextPosition(direction); // Calculate the next head position

    // Check if the next position is outside the board.
    if (nextPosition.x < 0
      || nextPosition.x >= this.gridSize
      || nextPosition.y < 0
      || nextPosition.y >= this.gridSize) {
      return false; // Move is blocked
    }

    this.direction = direction; // Update the direction
    this.segments.push(nextPosition); // Add the new head position

    if (this.pendingGrowth > 0) {
      this.pendingGrowth--;
    } else {
      this.segments.shift(); // Remove the tail if not growing.
    }

    this.renderer.render(this.segments, this.direction);
    return true;
  }

  /**
  * Pass the apple position to renderer.showApple.
  * @param position Apple coordinates, or null to remove it.
  * @returns Nothing.
  */
  ShowApple(position: Position | null): void {
    this.renderer.showApple(position);
  }

  /**
  * Pass the score to renderer.showScore. The algorithm owns the score value.
  * @param score Number of apples eaten.
  * @returns Nothing.
  */
  ShowScore(score: number): void {
    this.renderer.showScore(score);
  }

  /**
  * Pass the result to renderer.showGameOver. main.ts already stopped its timer.
  * @param won true for a full board, false after a collision.
  * @returns Nothing.
  */
  GameOver(won: boolean): void {
    this.renderer.showGameOver(won);
  }

  /**
  * Ask renderer.clear to remove its elements when GamePage is unmounted.
  * @returns Nothing. Calling clear repeatedly must be safe. No input.
  */
  clear(): void {
    this.renderer.clear();
  }
}
