// Verwacht een tv-object. Loopt availableSizes af.
// Inches × 2.54, afgerond op hele cm, daarna aan elkaar met " | ".
// Gebruikt op de tv-kaart en in de console (bestseller en inventory[1]).
function formatScreenSizes(tv) {
    return tv.availableSizes
      .map((size) => {
        const cm = Math.round(size * 2.54);
        return `${size} inch (${cm} cm)`;
      })
      .join(' | ');
  }

  export default formatScreenSizes;
