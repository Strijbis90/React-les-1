import { inventory } from '../constants/inventory.js'; // de array met alle tv's

// Telt sold van elke tv op. Startgetal 0, daarna total + tv.sold.
// Gebruikt in App voor de console en de groene tekst "Aantal verkochte producten".
function calculateSoldTvs() {
  return inventory.reduce((total, tv) => total + tv.sold, 0);
}

export default calculateSoldTvs;
