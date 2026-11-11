# Naslag deel 1 — Tech It Easy

Dit bestand hoort bij les 1. Het beschrijft wat er gebouwd is, hoe de React-app start, en wat de code doet.

## Wat er af is

Opdracht 1, de voorraadcijfers:

- 1a. Alle `sold`-waarden opgeteld. Uitkomst: 33. Zichtbaar in de console.
- 1b. Dat getal staat groen op de pagina.
- 1c. Alle `originalStock`-waarden opgeteld. Uitkomst: 73. Zichtbaar in de console.
- 1d. Dat getal staat blauw op de pagina.
- 1e. Nog te verkopen is ingekocht min verkocht: 40. Dat getal staat rood op de pagina.

Opdracht 2, één tv:

- 2a. Naam als `Samsung UHD 55AU7040 - Crystal`.
- 2b. Prijs als `€549,-`.
- 2c. Schermgroottes, omgerekend naar hele centimeters. Meerdere maten met ` | `. Eén maat zonder streep, bijvoorbeeld `32 inch (81 cm)`.
- 2d. Bestverkochte tv op de pagina: foto, naam, prijs en maten.
- 2e. Opties met de hand uitgetypt. Vinkje bij wifi, hdr en bluetooth. Minnetje bij speech en ambilight.
- 2f. Drie knoppen. Een klik logt de tekst van die knop.

De data komt uit `src/constants/inventory.js`. `inventory` is de lijst van alle tv's. `bestSellingTv` is één tv-object. De cijfers 33, 73 en 40 komen alleen uit `inventory`, niet uit `bestSellingTv`.

## De app starten

De terminal moet in de map `frontend-react-tech-it-easy` staan. Daar ligt `package.json`. Eén map hoger bestaat dat bestand niet, en dan faalt `npm`.

Eerste keer:

```powershell
npm install
npm run dev
```

Daarna alleen `npm run dev`. Vite print `http://localhost:5173/`. Die link is de pagina. Laat de terminal open. `Ctrl + C` stopt de server. In die terminal typ je geen code. Toetsen daar zijn sneltoetsen van Vite, zoals `q` om te stoppen.

Code typ je in bestanden in de zijbalk. Opslaan doe je met `Ctrl + S`. Vite ververst de pagina daarna vanzelf.

De browserconsole open je met `F12`, tab Console. `console.log(...)` schrijft daarheen, niet op de pagina.

Grijze, doorzichtige code in de editor is een voorstel van Cursor. Tab neemt het over. Escape gooit het weg.

## Hoe React de pagina opbouwt

De keten is: `index.html` laadt `main.jsx`, en `main.jsx` toont `App`.

`index.html` is bijna leeg. Het enige belangrijke element is `<div id="root"></div>`. Het script onderaan laadt `src/main.jsx`.

`main.jsx` zoekt die `root` en zet de component `App` erin:

```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

`App.jsx` is het scherm. Het is een functie. Wat de functie `return`t, wordt de zichtbare pagina. Die teruggegeven HTML-achtige code heet JSX.

Een los bestand draait niet vanzelf. Een helper doet niets tot `App.jsx` hem importeert en aanroept.

## Bestanden en hun rol

- `src/constants/inventory.js` bevat de data. Die wordt niet aangepast.
- `src/helpers/` bevat reken- en opmaakfuncties. Elke functie heeft een eigen bestand. Een helper tekent niets.
- `src/App.jsx` importeert de helpers, roept ze aan, en bepaalt wat je ziet.
- `src/App.css` bepaalt alleen de kleur en de plaatsing. De koppeling is `className` in JSX en een naam met een punt in CSS. `.sold` hoort bij `className="sold"`. In React schrijf je `className`, niet `class`.
- `src/assets/check.png` en `minus.png` zijn de icoontjes. Een plaatje uit die map importeer je, net als een functie.

CSS kleurt alleen een element dat de class ook echt heeft. Een regel `.stock` in CSS doet niets zolang er geen `<p className="stock">` in `App.jsx` staat.

## import en export

`export default` maakt één ding uit een bestand beschikbaar. `import` haalt het binnen in een ander bestand.

Default-import, zonder accolades. De naam mag je zelf kiezen, maar die moet wel kloppen met hoe je hem daarna gebruikt:

```javascript
import calculateSoldTvs from './helpers/calculateSoldTvs.js';
```

Named import, mét accolades. De naam moet exact de geëxporteerde naam zijn:

```javascript
import { bestSellingTv, inventory } from './constants/inventory.js';
```

Een naam die je gebruikt maar niet importeert, geeft `is not defined`. Dat gebeurde met `inventory`.

Het pad moet exact de bestandsnaam zijn. `calculateTvToSell.js` is een ander bestand dan `calculateTvsToSell.js`. Een leeg bestand heeft geen `export default`, en dan meldt Vite: does not provide an export named 'default'.

Een helper mag een andere helper importeren. `calculateTvsToSell` roept de andere twee aan en trekt ze van elkaar af. De lijst wordt dan niet nog een keer geteld.

## Wat de code doet

### reduce

`reduce` loopt de lijst langs en houdt één uitkomst bij. `0` is de start. Bij elke tv telt hij `tv.sold` of `tv.originalStock` bij het totaal op.

```javascript
inventory.reduce((total, tv) => total + tv.sold, 0)
```

### Een tv als parameter

`createTvName` en `formatScreenSizes` krijgen een tv-object binnen. Ze lezen velden van dat object: `tv.brand`, `tv.type`, `tv.name`, `tv.availableSizes`. Daardoor werken ze voor `bestSellingTv` en ook voor `inventory[1]`.

`inventory[1]` is het tweede item. Tellen begint bij 0. Die Nikkei heeft maar één schermgrootte.

`formatPrice` krijgt alleen het getal, niet de hele tv. In `App` pak je dat getal met `bestSellingTv.price`.

### Template string

Tekst tussen backticks. `${...}` zet een waarde in die tekst.

```javascript
`${tv.brand} ${tv.type} - ${tv.name}`
`€${price},-`
```

### map en join

`map` maakt van elke schermgrootte een stukje tekst. `Math.round(size * 2.54)` rekent inches om naar hele centimeters. 55 inch is 139,7 cm en wordt 140.

`join(' | ')` plakt de stukjes aan elkaar. Bij één maat is er niets om te plakken, dus er komt geen streep.

### JSX en accolades

Tekst in de `return` blijft tekst. Een JavaScript-resultaat zet je tussen `{ }`.

```javascript
<p className="sold">Aantal verkochte producten: {calculateSoldTvs()}</p>
```

Een attribuut mag ook een waarde zijn:

```javascript
<img src={bestSellingTv.sourceImg} alt={createTvName(bestSellingTv)} />
```

`sourceImg` is het webadres van de foto. Geïmporteerde icoontjes gebruik je hetzelfde: `src={checkIcon}`.

### Een klik

`logButtonText` staat binnen `App`, niet in `helpers`. Hij reageert op een gebeurtenis.

```javascript
function logButtonText(event) {
  console.log(event.target.textContent);
}
```

`event` is de klik. `event.target` is de knop. `textContent` is de tekst op die knop.

```javascript
<button type="button" onClick={logButtonText}>Meest verkocht eerst</button>
```

Zonder haakjes geef je de functie door, en hij wacht op de klik. Mét haakjes, `onClick={logButtonText()}`, draait hij meteen bij het laden.

## Fouten die langskwamen

- `npm` in de map `React les 1` vindt geen `package.json`. Eerst `cd frontend-react-tech-it-easy`.
- CSS aangepast, maar de bijbehorende regel ontbrak in de `return`. Dan verandert de pagina niet.
- Bestandsnaam en import verschilden één letter. Vite zegt dan: Failed to resolve import.
- Een gebruikt woord niet geïmporteerd. De browser zegt dan: is not defined.
- Helperbestand nog leeg terwijl `App` hem al importeert. Vite zegt dan: does not provide an export named 'default'.
