// Verwacht een tv-object. Geeft "merk type - naam" terug, bijvoorbeeld "Samsung UHD 55AU7040 - Crystal".
// Gebruikt als titel en als alt-tekst van de foto, voor de bestseller en voor elke tv in de lijst.
function createTvName(tv) {
    return `${tv.brand} ${tv.type} - ${tv.name}`;
  }

  export default createTvName;
