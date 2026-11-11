import './App.css'; // styling voor dit dashboard
import calculateSoldTvs from './helpers/calculateSoldTvs.js'; // telt verkochte tv's, voor de groene regel
import calculateOriginalStock from './helpers/calculateOriginalStock.js'; // telt ingekochte tv's, voor de blauwe regel
import calculateTvsToSell from './helpers/calculateTvsToSell.js'; // ingekocht min verkocht, voor de rode regel
import { bestSellingTv, inventory } from './constants/inventory.js'; // één tv-object en de array met alle tv's
import createTvName from './helpers/createTvName.js'; // maakt "merk type - naam"
import formatPrice from './helpers/formatPrice.js'; // maakt "€549,-"
import formatScreenSizes from './helpers/formatScreenSizes.js'; // maakt "43 inch (109 cm) | ..."
import checkIcon from './assets/check.png'; // vinkje als een optie aanwezig is
import minusIcon from './assets/minus.png'; // minnetje als een optie ontbreekt
import showOutcomeInConsole from './constants/oefenbestand.js'; // oefening: typenamen in de console


function App() {
  // Alles vóór return draait bij elke render. console.log is alleen in de browserconsole zichtbaar, niet op de pagina.

  console.log(calculateSoldTvs()); // opdracht 1a: totaal verkocht
  console.log(calculateOriginalStock()); // opdracht 1c: totaal ingekocht
  console.log(createTvName(bestSellingTv)); // opdracht 2a: naam van de bestverkochte tv
  console.log(formatPrice(bestSellingTv.price)); // opdracht 2b: prijs als €549,-
  console.log(formatScreenSizes(bestSellingTv)); // opdracht 2c: schermgroottes van de bestseller
  console.log(formatScreenSizes(inventory[1])); // zelfde functie, getest op de tweede tv in de array
  showOutcomeInConsole(); // opdracht deel 2, 1a: array met alle tv-typen

  // filter houdt alleen tv's over waarbij verkocht gelijk is aan de voorraad: die zijn uitverkocht
  const soldOut = inventory.filter((tv) => tv.sold === tv.originalStock);
  console.log(soldOut); // opdracht 1b: uitverkochte tv's

  // find stopt bij de eerste tv met dit type en geeft dat ene object terug
  const nikkei = inventory.find((tv) => tv.type === 'NH3216SMART');
  console.log(nikkei); // opdracht 1c: de Nikkei-tv

  // map maakt van elke tv een nieuw object: naam plus of hij geschikt is voor sport (100 Hz of meer)
  const sportList = inventory.map((tv) => {
    return {
      name: `${tv.brand} ${tv.name}`,
      suitable: tv.refreshRate >= 100,
    };
  });
  console.log(sportList); // opdracht 1d

  // filter + some: houd de tv als minstens één beschikbare maat 65 inch of groter is
  const largeScreens = inventory.filter((tv) =>
    tv.availableSizes.some((size) => size >= 65)
  );
  console.log(largeScreens); // opdracht 1e

  // Deze drie functies worden nergens aangeroepen. De knoppen hieronder gebruiken de sort-functies.
  function logButtonText(event) {
    console.log(event.target.textContent); // zou de tekst van de geklikte knop loggen
  }
  function logButtonText(event) {
    console.log(event.target.textContent);
  }
  function logButtonText(event) {
    console.log(event.target.textContent);
  }

  // Klikfuncties horen in het component. Ze sorteren een kopie, zodat inventory zelf niet verandert.
  function sortBySold() {
    const sorted = [...inventory].sort((a, b) => b.sold - a.sold); // hoogste sold eerst
    console.log(sorted); // opdracht 3a, alleen in de console
  }
  function sortByPrice() {
    const sorted = [...inventory].sort((a, b) => a.price - b.price); // laagste prijs eerst
    console.log(sorted); // opdracht 3b
  }
  function sortByRefreshRate() {
    const sorted = [...inventory].sort((a, b) => b.refreshRate - a.refreshRate); // hoogste Hz eerst
    console.log(sorted); // opdracht 3c, meest geschikt voor sport
  }

  // return is wat React in de root-div zet en wat je op de pagina ziet
  return (
    <div>
      <h1>Tech it easy dashboard</h1>
      {/* accolades: JavaScript-resultaat tussen de HTML */}
      <p className="sold">Aantal verkochte producten: {calculateSoldTvs()}</p> {/* groen via class sold */}
      <p className="stock">Aantal ingekochte producten: {calculateOriginalStock()}</p> {/* blauw via class stock */}
      <p className="to-sell">Aantal te verkopen producten: {calculateTvsToSell()}</p> {/* rood via class to-sell */}
      <h2>Best verkochte tv</h2>
      {/* één kaart, vast het bestSellingTv-object, niet de hele inventory */}
      <article className="tv">
        <img src={bestSellingTv.sourceImg} alt={createTvName(bestSellingTv)} /> {/* foto + alt-tekst voor de lezer */}
        <div>
          <h3>{createTvName(bestSellingTv)}</h3> {/* Samsung UHD 55AU7040 - Crystal */}
          <p>{formatPrice(bestSellingTv.price)}</p>
          <p>{formatScreenSizes(bestSellingTv)}</p>
          {/* opdracht 2e: opties nog met de hand uitgeschreven, niet uit tv.options */}
          <p className="options">
            <img src={checkIcon} alt="aanwezig" /> wifi
            <img src={minusIcon} alt="niet aanwezig" /> speech
            <img src={checkIcon} alt="aanwezig" /> hdr
            <img src={checkIcon} alt="aanwezig" /> bluetooth
            <img src={minusIcon} alt="niet aanwezig" /> ambilight
          </p>
        </div>
      </article>
      <div>
        {/* onClick koppelt de knop aan de functie. De pagina zelf sorteert hier nog niet. */}
        <button type="button" onClick={sortBySold}>Meest verkocht eerst</button>
        <button type="button" onClick={sortByPrice}>Goedkoopste eerst</button>
        <button type="button" onClick={sortByRefreshRate}>Meest geschikt voor sport eerst</button>
      </div>
      <h2>Alle merken</h2>
      <ul>
        {/* map maakt voor elke tv een <li>. key helpt React bijhouden welk item welke rij is. */}
        {inventory.map((tv) => (
          <li key={tv.type}>{tv.brand}</li>
        ))}
      </ul>
      <h2>Alle tv's</h2>
      {/* zelfde kaart als de bestseller, maar nu één article per tv in inventory */}
      {inventory.map((tv) => (
        <article className="tv" key={tv.type}>
          <img src={tv.sourceImg} alt={createTvName(tv)} />
          <div>
            <h3>{createTvName(tv)}</h3>
            <p>{formatPrice(tv.price)}</p>
            <p>{formatScreenSizes(tv)}</p>
            <ul className="options">
              {/* per optie: vinkje bij true, minnetje bij false, plus de optienaam */}
              {tv.options.map((option) => (
                <li key={option.name}>
                  <img
                    src={option.applicable ? checkIcon : minusIcon}
                    alt={option.applicable ? 'aanwezig' : 'niet aanwezig'}
                  />
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App; // zodat main.jsx deze component kan importeren en in de root kan zetten
