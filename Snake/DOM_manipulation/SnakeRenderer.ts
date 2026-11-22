import type { Direction, Position } from '../types';

/** Draw the game using DOM elements and the existing CSS classes. */
export class SnakeRenderer {
  /** Empty layer provided by React. Store the constructor argument here. */
  private readonly container!: HTMLElement;

  /** Callback used by the restart button to request a fresh game. */
  private readonly onRestart: (() => void) | undefined;
  
  /** Snake elements owned by this renderer. Initialize with an empty array. */
  private segmentElements!: HTMLSpanElement[];
  
  /** Apple element owned by this renderer. Initialize with null. */
  private appleElement!: HTMLSpanElement | null;
  
  /** Score output owned by this renderer. Initialize with null. */
  private scoreElement!: HTMLOutputElement | null;
  
  /** End-of-game message owned by this renderer. Initialize with null. */
  private gameOverElement!: HTMLDivElement | null;
  
  /**
  * Store the drawing layer and initialize the element properties above.
  * Do not draw anything until a render or show method is called.
  * The ! on each property means its initialization must be written here.
  * @param container Empty DOM layer provided by GamePage through a ref.
  * @param onRestart Callback supplied by GamePage to start a fresh game.
  */
  constructor(container: HTMLElement, onRestart?: () => void) {
    this.container = container;
    this.onRestart = onRestart;
    this.segmentElements = [];
    this.appleElement = null;
    this.scoreElement = null;
    this.gameOverElement = null;
  }
  
  /**
  * Remove the previous snake elements, then draw the supplied segments.
  * Keep the apple, score, and end-of-game message when redrawing the snake.
  * Use createSegment for each position and store the new elements.
  * @param segments Positions ordered from tail to head. Do not change the array.
  * @param direction Direction of the last successful move, used for the head.
  * @returns Nothing.
  */
  render(segments: readonly Position[], direction: Direction): void {
    this.container.replaceChildren();
    this.segmentElements = [];
    segments.forEach((_, index) => {
      const segmentElement = this.createSegment(segments, index, direction);
      this.container.appendChild(segmentElement);
      this.segmentElements.push(segmentElement);
    });

    if (this.appleElement) {
      this.container.appendChild(this.appleElement);
    }
  }
  
  /**
  * Create one span and choose its CSS classes using its neighbors.              
  * Index 0 is the tail, the last index is the head, and other indices are body. 
  * Compare neighboring coordinates to choose straight or curved body shapes.    
  * Use the existing classes in snake.css for shapes and orientations.           
  * Convert game coordinates to CSS Grid lines by adding 1 to x and y.           
  * Leave movement animations disabled for now.                                  
  * @param segments Full array of positions. Read it without modifying it.
  * @param index Index of the segment to draw.
  * @param direction Direction used to orient the head.
  * @returns The configured span, ready for render to append to the container.
  */
  private createSegment(
    segments: readonly Position[],
    index: number,
    direction: Direction,
  ): HTMLSpanElement {
    const segment = segments[index];
    const segmentElement = this.container.ownerDocument.createElement('span');
    segmentElement.classList.add('snake-segment', 'cell');
    
    if (index === 0 && segments.length > 1) {
      segmentElement.classList.add('tail');
      const nextSegment = segments[index + 1];
      
      // The tail connects to the next segment toward the head.
      if (nextSegment.x > segment.x) {
        segmentElement.classList.add('direction-right');
      } else if (nextSegment.x < segment.x) {
        segmentElement.classList.add('direction-left');
      } else if (nextSegment.y > segment.y) {
        segmentElement.classList.add('direction-down');
      } else {
        segmentElement.classList.add('direction-up');
      }
      
    } else if (index === segments.length - 1) {
      segmentElement.classList.add('head', `direction-${direction}`);
    } else {
      // body of the snake
      const prevSegment = segments[index - 1];
      const nextSegment = segments[index + 1];
      
      segmentElement.classList.add('body');
      
      if (prevSegment.x === nextSegment.x) {
        segmentElement.classList.add('vertical');
      } else if (prevSegment.y === nextSegment.y) {
        segmentElement.classList.add('horizontal');
      } else {
        // curved body
        
        // Case 1. The neighbors connect the left and top sides. ┘
        if ((prevSegment.x < segment.x && nextSegment.y < segment.y) ||
        (nextSegment.x < segment.x && prevSegment.y < segment.y)) {
          
          segmentElement.classList.add('turn-up-left');
          
          // Case 2. The neighbors connect the right and top sides. └
        } else if ((prevSegment.x > segment.x && nextSegment.y < segment.y) ||
        (nextSegment.x > segment.x && prevSegment.y < segment.y)) {
          
          segmentElement.classList.add('turn-up-right');
          
          // Case 3. The neighbors connect the right and bottom sides. ┌
        } else if ((prevSegment.x > segment.x && nextSegment.y > segment.y) ||
        (nextSegment.x > segment.x && prevSegment.y > segment.y)) {
          
          segmentElement.classList.add('turn-down-right');
          
          // Case 4. The neighbors connect the left and bottom sides. ┐
        } else if ((prevSegment.x < segment.x && nextSegment.y > segment.y) ||
        (nextSegment.x < segment.x && prevSegment.y > segment.y)) {
          
          segmentElement.classList.add('turn-down-left');
        }
      }
    }
    segmentElement.style.gridColumnStart = String(segment.x + 1);
    segmentElement.style.gridRowStart = String(segment.y + 1);
    
    return segmentElement;
  }
  
  /**
  * Create the apple span if needed, then place it on the board using class apple.
  * Use x + 1 and y + 1 as CSS Grid coordinates.
  * @param position Apple coordinates, or null to remove the current apple.
  * @returns Nothing.
  */
  showApple(position: Position | null): void {
    const appleElement = this.appleElement ?? this.container.ownerDocument.createElement('span');
    if (position) {
      appleElement.classList.add('apple', 'cell');
      appleElement.style.gridColumnStart = String(position.x + 1);
      appleElement.style.gridRowStart = String(position.y + 1);
      this.container.appendChild(appleElement);
      this.appleElement = appleElement;
    } else if (this.appleElement) {
      this.appleElement.remove();
      this.appleElement = null;
    }
  }
  
  /**
  * Create a score output if needed, then update its value.
  * Place this output near the board, outside the grid cells.
  * Keep a reference in scoreElement for updates and cleanup.
  * @param score Number of apples eaten, starting at 0.
  * @returns Nothing.
  */
  showScore(score: number): void {
    if (!this.scoreElement) {
      const panel = this.container.closest('.board-panel');
      if (!panel) return;

      this.scoreElement = this.container.ownerDocument.createElement('output');
      this.scoreElement.classList.add('score', 'game-score');
      panel.appendChild(this.scoreElement);
    }

    this.scoreElement.value = `Score ${score}`;
  }
  
  /**
  * Create or update a message near the board and store it in gameOverElement.
  * Display French text, for example Partie terminée or Bravo, plateau rempli.
  * The algorithm already stops the timer before calling this method.
  * @param won true for a full board, false for a collision.
  * @returns Nothing.
  */
  showGameOver(won: boolean): void {
    if (!this.gameOverElement) {
      const panel = this.container.closest('.board-panel');
      if (!panel) return;

      this.gameOverElement = this.container.ownerDocument.createElement('div');
      this.gameOverElement.classList.add('game-over');
      panel.appendChild(this.gameOverElement);
    }

    const message = this.container.ownerDocument.createElement('p');
    message.setAttribute('role', 'status');
    message.textContent = won ? 'Bravo, plateau rempli !' : 'Partie terminée';
    this.gameOverElement.replaceChildren(message);

    if (this.onRestart) {
      const button = this.container.ownerDocument.createElement('button');
      button.type = 'button';
      button.classList.add('restart-button');
      button.textContent = 'Recommencer';
      button.addEventListener('click', this.onRestart, { once: true });
      this.gameOverElement.appendChild(button);
    }
  }
  
  /**
  * Remove all elements created by this renderer, including score and messages.
  * Empty segmentElements and reset the other element references to null.
  * Preserve the container and the surrounding elements created by React.
  * @returns Nothing. Calling clear repeatedly must be safe.
  */
  clear(): void {
    for (const element of this.segmentElements) {
      element.remove();
    }
    this.segmentElements = [];

    this.appleElement?.remove();
    this.appleElement = null;

    this.scoreElement?.remove();
    this.scoreElement = null;

    this.gameOverElement?.remove();
    this.gameOverElement = null;
  }
}
