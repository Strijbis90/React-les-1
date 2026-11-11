import calculateSoldTvs from './calculateSoldTvs.js';
import calculateOriginalStock from './calculateOriginalStock.js';

// Nog te verkopen = ingekocht minus al verkocht.
// Gebruikt in App voor de rode tekst "Aantal te verkopen producten".
function calculateTvsToSell() {
  return calculateOriginalStock() - calculateSoldTvs();
}

export default calculateTvsToSell;
