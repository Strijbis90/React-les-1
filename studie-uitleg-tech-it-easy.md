# Studie-uitleg Tech It Easy

Dit bestand is bedoeld om de code te begrijpen, niet om hem over te typen op een toets. De code in het project heb je zelf in de bestanden gezet. Hier staat waarom elke keuze zo is gemaakt, wat een regel doet, en welke vraag een beoordelaar daarover kan stellen.

Als de opleiding vraagt om AI op een bronnenlijst te zetten: dit bestand is gemaakt met Cursor, als uitleg. De opdrachtcode is niet door een agent in het project geschreven.

## Wat je moet kunnen navertellen

- Waar de pagina vandaan komt: `index.html`, `main.jsx`, `App.jsx`.
- Wat een helper is en waarom die los van `App.jsx` staat.
- Het verschil tussen `reduce`, `map`, `filter`, `find`, `some` en `sort`.
- Waarom een klikfunctie in `App` staat en een rekenfunctie in `helpers`.
- Waarom `sort` op een kopie gebeurt.
- Waarom een lijst in React een `key` nodig heeft.
- Wat `className` met CSS doet.

## Hoe de app start

Je typt `npm run dev` in de map waar `package.json` staat: `frontend-react-tech-it-easy`. Eén map hoger faalt het commando, want daar is geen `package.json`. Het commando is `npm run dev`, niet `npm dev run`.

Vite is de ontwikkelserver. Hij leest `vite.config.js`, zet JSX om naar JavaScript die de browser snapt, en print een adres. Bij dit project is dat `http://localhost:5173/`. `localhost` is je eigen computer. `5173` is de poort. Dat adres staat in de terminal én in de adresbalk van de browser. De opdracht noemt het niet, omdat Vite het zelf kiest en toont.

`index.html` is bijna leeg. Er staat een `<div id="root">` en een script dat `src/main.jsx` laadt.

`main.jsx` zoekt die `root` en zet de component `<App />` erin. Ook laadt `main.jsx` het bestand `index.css`. Dat CSS-bestand geldt voor de hele pagina. In dit project zet het het lettertype op `body`.

`App.jsx` is het scherm. De functie `App` draait, de `console.log`s gebeuren, en wat de functie `return`t wordt de zichtbare pagina. Die HTML-achtige code heet JSX.

`App.css` geldt voor dit scherm. Het wordt geladen door de regel `import './App.css'` bovenaan `App.jsx`. Zonder die import gebruikt de pagina die stijlen niet.

De browserconsole is niet de terminal in Cursor. In de browser: klik op de pagina, dan `Ctrl + Shift + J`, of rechtermuisknop, Inspecteren, tab Console. `console.log` schrijft daarheen. Tekst in de `return` komt op de pagina.

## Data

Alles komt uit `src/constants/inventory.js`.

`inventory` is de lijst van 8 tv's. Elke tv is een object met velden als `brand`, `type`, `name`, `price`, `sold`, `originalStock`, `availableSizes`, `refreshRate`, `options` en `sourceImg`.

`bestSellingTv` is één los tv-object, niet een item uit die lijst. De cijfers 33, 73 en 40 komen alleen uit `inventory`. `bestSellingTv` tel je daar niet bij op.

`options` is zelf weer een lijst. Elk item heeft `name` (wifi, speech, hdr, bluetooth, ambiLight) en `applicable` (`true` of `false`).

## import en export

Een bestand draait niet vanzelf. `export default` maakt één functie beschikbaar. `import` haalt hem binnen.

Zonder accolades is het een default-import. De lokale naam kies je zelf, maar daarna moet je die naam gebruiken:

```javascript
import calculateSoldTvs from './helpers/calculateSoldTvs.js';
```

Met accolades moet de naam exact kloppen met de export:

```javascript
import { bestSellingTv, inventory } from './constants/inventory.js';
```

Gebruik je een naam die je niet hebt geïmporteerd, dan zegt de browser `is not defined`. Dat gebeurde met `inventory` toen de log er wel stond en de import nog niet.

Het pad moet de bestandsnaam exact zijn. `calculateTvToSell.js` is een ander bestand dan `calculateTvsToSell.js`. Een leeg bestand heeft geen `export default`. Vite zegt dan: does not provide an export named 'default'.

Een plaatje importeer je hetzelfde. `import checkIcon from './assets/check.png'` geeft een adres. `src={checkIcon}` zet dat adres op de afbeelding.

## Waarom helpers

Een helper is een gewoon JavaScript-bestand met één functie. Hij rekent of maakt tekst, en geeft dat terug. Hij tekent niets.

`App.jsx` is het scherm. Als tellen, tekst plakken en HTML door elkaar staan, wordt dat bestand onleesbaar. Een helper kun je opnieuw gebruiken: dezelfde `createTvName` werkt voor `bestSellingTv` en voor elke tv uit `inventory`.

Een functie die op een klik reageert staat niet in `helpers`. Die staat in `App`, want hij hoort bij het scherm. Dat zijn `logButtonText`, `sortBySold`, `sortByPrice` en `sortByRefreshRate`.

## Deel 1, de cijfers

### reduce

`reduce` loopt een lijst langs en houdt één uitkomst bij. De `0` is de start.

```javascript
inventory.reduce((total, tv) => total + tv.sold, 0)
```

`total` is het lopende totaal. `tv` is de tv van deze ronde. `tv.sold` wordt erbij opgeteld. Uitkomst: 33.

Hetzelfde met `originalStock` geeft 73.

`calculateTvsToSell` telt de lijst niet opnieuw. Hij roept de andere twee helpers aan en trekt ze van elkaar af: 73 - 33 = 40. Een helper mag een andere helper importeren.

Waarom niet hardcoderen? De opdracht zegt dat de voorraad later dynamisch wordt. De functie moet blijven kloppen als de getallen veranderen.

### Op de pagina

`console.log` is voor jou. De pagina krijgt het getal via JSX:

```javascript
<p className="sold">Aantal verkochte producten: {calculateSoldTvs()}</p>
```

Tekst blijft tekst. Een JavaScript-resultaat staat tussen `{ }`.

`className="sold"` koppelt aan `.sold` in `App.css`. In React heet dat `className`, niet `class`. CSS kleurt alleen een element dat die class ook echt heeft. Stond `.stock` al in CSS maar de paragraaf nog niet in de `return`, dan verscheen het blauwe getal niet.

Groen is verkocht, blauw is ingekocht, rood is nog te verkopen. Dat zijn de kleuren uit de opdracht.

## Deel 1, één tv

De helpers krijgen een tv of een getal binnen. Ze lezen niet stiekem alleen `bestSellingTv`. Daardoor werken ze later voor de hele lijst.

### Naam

```javascript
`${tv.brand} ${tv.type} - ${tv.name}`
```

Backticks zijn een template string. `${tv.brand}` zet de waarde in de tekst. Voor de bestverkochte tv: `Samsung UHD 55AU7040 - Crystal`.

### Prijs

`formatPrice` krijgt alleen het getal, niet de hele tv. In `App` pak je dat met `bestSellingTv.price`. `549` wordt `€549,-`.

### Schermgroottes

`availableSizes` is een lijst getallen, bijvoorbeeld `[43, 50, 55, 65]`.

`map` maakt van elk getal een stukje tekst. De lijst blijft even lang. `reduce` vouwt tot één getal. Dat is het verschil.

Inches naar centimeters is `size * 2.54`. `Math.round` rondt af op hele centimeters. 55 inch is 139,7 cm en wordt 140.

`join(' | ')` plakt de stukjes. Bij één maat is er niets om te plakken, dus er komt geen streep. Dat is getest met `inventory[1]`, de Nikkei, want tellen begint bij 0. Die heeft alleen 32 inch: `32 inch (81 cm)`.

### Foto en opties van de bestverkochte tv

`bestSellingTv.sourceImg` is het webadres van de foto.

De opties van die ene tv zijn in deel 1 met de hand uitgetypt. De opdracht vroeg dat expres, nog zonder `map`. Wifi, hdr en bluetooth hebben een vinkje. Speech en ambilight een minnetje. Dat volgt uit `applicable` van `bestSellingTv`, niet uit een gok.

## Deel 2, methodes in de console

Deze logs staan in `App`, niet omdat dat de enige goede plek is. De opdracht stelde een oefenbestand voor. `showOutcomeInConsole` in `oefenbestand.js` doet opdracht 1a. 1b tot en met 1e staan daarna direct in `App`. Het resultaat is hetzelfde, zolang de functie draait tijdens het renderen van `App`. Opdracht 1f, ambilight, staat niet in het bestand.

### map, opdracht 1a

```javascript
inventory.map((tv) => tv.type)
```

Van 8 tv-objecten worden 8 typenamen. `inventory` zelf verandert niet. `map` geeft een nieuwe array terug.

### filter, opdracht 1b

`filter` houdt alleen items waar de voorwaarde `true` is. Uitverkocht betekent `sold` gelijk aan `originalStock`.

```javascript
tv.sold === tv.originalStock
```

`===` vergelijkt. Eén `=` zou een waarde toekennen. Twee tv's blijven over: `NH3216SMART` (4 en 4) en `43HAK6152` (5 en 5). `filter` geeft een array terug, ook al zitten er twee objecten in. Die objecten zijn nog compleet. In de console klap je ze open om `brand` en `type` te zien. Zo vind je zelf welke tv het is, zonder dat de opdracht de naam geeft.

### find, opdracht 1c

`find` stopt bij de eerste tv die klopt en geeft dat ene object terug, geen array.

```javascript
inventory.find((tv) => tv.type === 'NH3216SMART')
```

De tekst moet exact kloppen. Vind hij niets, dan is de uitkomst `undefined`.

### map naar een object, opdracht 1d

Geschikt voor sport betekent `refreshRate` van 100 of hoger.

```javascript
suitable: tv.refreshRate >= 100
```

`>=` is een vergelijking. De uitkomst is `true` of `false`. De naam is `` `${tv.brand} ${tv.name}` ``, bijvoorbeeld `Toshiba HD TV`. Twee tv's zijn geschikt: Nikkei HD smart TV en Philips 4K LED TV, allebei 100 Hz.

### some, opdracht 1e

Een tv heeft geen één maat, maar een lijst `availableSizes`. `filter` kiest de tv. `some` kijkt in die binnenste lijst en geeft `true` zodra één maat 65 of groter is.

```javascript
tv.availableSizes.some((size) => size >= 65)
```

Drie tv's: Philips `43PUS6504/12`, Samsung `QE55Q60T`, Philips `50PUS7304/12`.

Hetzelfde patroon zou ambilight vinden: `some` op `options`, naam `ambiLight` én `applicable` is `true`. `&&` betekent dat allebei waar moet zijn. Een optie die wel in de lijst staat maar `applicable: false` heeft, telt niet.

## Deel 2, op de pagina

### Merken

```javascript
{inventory.map((tv) => (
  <li key={tv.type}>{tv.brand}</li>
))}
```

De `{ }` voeren JavaScript uit en zetten het resultaat in de pagina. Elke ronde geeft een `<li>` terug.

`key` is voor React, niet voor de bezoeker. React moet lijstitems uit elkaar houden als de lijst later verandert. `tv.brand` is niet uniek, Philips komt drie keer voor. `tv.type` is wel uniek. Dubbele merknamen op de pagina mogen. De opdracht zegt dat expres. In de data staat `Nikkei`, niet `NIKKEI`.

### Alle tv's

Dezelfde helpers als bij de bestverkochte tv. Alleen geef je nu `tv` mee in plaats van `bestSellingTv`. De `key` staat op het buitenste element van de ronde, het `<article>`.

### Opties, twee map's

De buitenste `map` levert een tv. De binnenste levert één optie van die tv.

```javascript
tv.options.map((option) => (
  <li key={option.name}>{option.name}</li>
))
```

`option.name` is binnen één tv uniek, daarom mag dat de `key` van die binnenste lijst zijn.

### Het icoon, de beslisboom

```javascript
option.applicable ? checkIcon : minusIcon
```

Dit lees je als: is `applicable` true, gebruik het vinkje, anders het minnetje. Hetzelfde geldt voor de alt-tekst.

Bij de eerste Philips: wifi vinkje, speech min, hdr vinkje, bluetooth min, ambiLight min. Dat volgt uit de data van die tv.

### Waarom className="options"

```css
.tv img { width: 180px; }
.options img { width: 16px; }
```

`.tv img` betekent: elke afbeelding binnen `className="tv"` is 180 pixels breed. De tv-foto moet dat zijn. De vinkjes zijn ook `<img>` en staan in datzelfde article. Zonder extra class worden die dus ook 180 pixels.

`.options img` geldt alleen binnen `className="options"`. De `<ul className="options">` zorgt dat alleen de icoontjes 16 pixels worden. De tv-foto blijft 180, want die staat niet in die lijst.

## Sorteren

De pagina herschikt niet als je klikt. Daar is state voor nodig, en dat zit niet in deze les. Daarom log je de gesorteerde lijst.

`sort` verandert de lijst waar je hem op aanroept. `[...inventory]` maakt eerst een kopie. De pagina blijft de oorspronkelijke volgorde tonen. De console krijgt de gesorteerde kopie.

`sort` vergelijkt steeds twee tv's, `a` en `b`.

- `b.sold - a.sold` zet het hoogste aantal verkocht vooraan. Brandt en Toshiba, allebei 8, staan vooraan. De tv met 0 staat achteraan.
- `a.price - b.price` is omgekeerd: laag naar hoog. Brandt van 109 staat vooraan, Samsung van 709 achteraan.
- `b.refreshRate - a.refreshRate` zet de hoogste verversing vooraan. Nikkei en Philips 4K LED TV, allebei 100 Hz, staan vooraan.

Een positief resultaat zet `b` voor `a`. Een negatief resultaat zet `a` voor `b`. Nul laat ze gelijk.

`onClick={sortBySold}` geeft de functie door. Hij wacht op de klik. `onClick={sortBySold()}` met haakjes zou meteen bij het laden draaien.

In `App` staat `logButtonText` drie keer onder elkaar. Dat is een plakfout. JavaScript gebruikt de laatste functie met die naam. Eén exemplaar is genoeg. De sorteerknoppen roepen die functie niet meer aan.

## Vragen die je zelf moet kunnen beantwoorden

Waarom een helper en niet alles in `App`? Om rekenen en tekenen te scheiden, en om dezelfde functie voor elke tv te gebruiken.

Waarom `map` en niet een for-loop die je uitschrijft? De lijst kan 8 of 800 tv's zijn. `map` loopt de hele lijst af zonder dat jij het aantal kent.

Waarom `filter` en niet `find` voor uitverkocht? Er kunnen meerdere tv's uitverkocht zijn. `find` geeft er één. `filter` geeft ze allemaal.

Waarom een kopie bij `sort`? Omdat `sort` de bestaande array verandert. De pagina leest diezelfde `inventory`.

Waarom `key`? Zodat React elk lijstitem kan herkennen. De waarde moet uniek zijn binnen die lijst.

Waarom `className` en niet `class`? `class` is een gereserveerd woord in JavaScript. JSX gebruikt `className`.

Hoe weet je welke tv een log is? Klap het object in de console open. `brand`, `name` en `type` staan erin. Je hoeft de opdracht niet de naam te laten voorzeggen.

## Wat er misging, en wat de fout betekende

- `npm` in de map `React les 1` vindt geen `package.json`. Eerst de projectmap in.
- CSS aangepast zonder het element in de `return`. Dan verandert de pagina niet.
- Bestandsnaam en import verschilden één letter. Vite: Failed to resolve import.
- Een naam gebruikt zonder import. De browser: is not defined.
- Een leeg helperbestand geïmporteerd. Vite: does not provide an export named 'default'.
- `F12` in Cursor doet niets met de browserconsole. De console hoort bij het browservenster.
