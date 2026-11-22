import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './style.css';
import './DOM_manipulation/snake.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('The React root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
