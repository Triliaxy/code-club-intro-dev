import type { Direction } from '../types';

const arrowDirections = new Map<string, Direction>([
  ['ArrowUp', 'up'],
  ['ArrowDown', 'down'],
  ['ArrowLeft', 'left'],
  ['ArrowRight', 'right'],
]);

export function listenToArrowKeys(
  document: Document,
  onDirection: (direction: Direction) => void,
): () => void {
  function handleKeyDown(event: KeyboardEvent): void {
    const direction = arrowDirections.get(event.key);
    if (!direction) return;

    event.preventDefault();
    onDirection(direction);
  }

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}
