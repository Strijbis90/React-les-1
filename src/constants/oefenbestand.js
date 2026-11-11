import { inventory } from './inventory.js';

// Oefening array-methodes. Aangeroepen vanuit App, anders zie je de console.log niet.
// map pakt van elke tv alleen het type en maakt daar een nieuwe array van.
function showOutcomeInConsole() {
  const typeNames = inventory.map((tv) => tv.type);
  console.log(typeNames);
}

export default showOutcomeInConsole;
