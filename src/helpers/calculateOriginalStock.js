import { inventory } from '../constants/inventory.js';

// Telt originalStock van elke tv op.
// Gebruikt in App voor de console en de blauwe tekst "Aantal ingekochte producten".
function calculateOriginalStock() {
  return inventory.reduce((total, tv) => total + tv.originalStock, 0);
}

export default calculateOriginalStock;
