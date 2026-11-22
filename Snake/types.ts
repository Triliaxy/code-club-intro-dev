export type Direction = 'up' | 'down' | 'left' | 'right';

export type Position = {
  x: number;
  y: number;
};

/** Methods and properties that Snake must provide to the teaching algorithm. */
export interface SnakeGame {
  /** Number of cells on each side of the board. Coordinates go from 0 to gridSize - 1. */
  readonly gridSize: number;

  /** Direction of the last successful move. */
  readonly direction: Direction;

  /** Positions ordered from tail at index 0 to head at the last index. */
  readonly segments: readonly Position[];

  /**
   * Calculate the next head position without moving or changing the snake.
   * @param direction Direction to check, including positions outside the board.
   * @returns A new position object containing the next x and y coordinates.
   */
  GetNextPosition(direction: Direction): Position;

  /**
   * Check whether a requested direction avoids an immediate reversal.
   * @param direction Requested direction.
   * @returns false for the opposite of the last successful move, true otherwise.
   */
  CanTurn(direction: Direction): boolean;

  /** Move one cell up, update the body, and draw the snake. Return false if blocked. */
  MoveUp(): boolean;

  /** Move one cell down, update the body, and draw the snake. Return false if blocked. */
  MoveDown(): boolean;

  /** Move one cell left, update the body, and draw the snake. Return false if blocked. */
  MoveLeft(): boolean;

  /** Move one cell right, update the body, and draw the snake. Return false if blocked. */
  MoveRight(): boolean;

  /**
   * Keep the tail during the next successful move, adding one segment.
   * No input or return value. A blocked move must keep this request pending.
   */
  Grow(): void;

  /**
   * Ask the renderer to display the apple.
   * @param position Apple coordinates, or null to remove the apple.
   * @returns Nothing.
   */
  ShowApple(position: Position | null): void;

  /**
   * Ask the renderer to display the current score.
   * @param score Number of apples eaten.
   * @returns Nothing.
   */
  ShowScore(score: number): void;

  /**
   * Ask the renderer to display the end of the game.
   * @param won true when the board is full, false after a collision.
   * @returns Nothing. The algorithm stops its timer before calling this method.
   */
  GameOver(won: boolean): void;
}
