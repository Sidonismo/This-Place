const pridejMistoBtn = document.getElementById("pridej-misto-btn");
const hledejMistoBtn = document.getElementById("hledej-btn");
const reloadMapBtn = document.getElementById("reload-map-btn");
var gpsMista = new Object();

// Funkce, která vytáhne UL-LI seznam míst z pole misto[]
const renderMista = () => {
  const seznamMist = document.getElementById("seznam-mist");

  if (misto.length === 0) {
    seznamMist.classList.remove("visible");
    return;
  } else {
    seznamMist.classList.add("visible");
  }
  seznamMist.innerHTML = "";

  misto.forEach((mista) => {
    const liSeznamMist = document.createElement("li");
    let text = mista.info.Místo + " - ";
    for (const key in mista.info) {
      if (key !== "Místo") {
        text = text + ` ${key}: ${mista.info[key]}`;
      }
    }
    liSeznamMist.textContent = text;
    seznamMist.append(liSeznamMist);
  });
};
// Ovladač na button pridej-misto-btn, který vytváří objekt noveMisto a přidává ho do pole misto[]
const pridejMistoOvladac = (filter='') => {
  const popisMista = document.getElementById("vyber-strucny-popis").value;
  const druhMista = document.getElementById("vyber-typu-mista").value;
  const nazevMista = document.getElementById("misto").value;
  getLocation();

  if (
    nazevMista.trim() === "" ||
    druhMista.trim() === "" ||
    popisMista.trim() === ""
  ) {
    return;
  }

  noveMisto = {
    info: {
      ["Místo"]: nazevMista,
      [druhMista]: popisMista,
    },
    id: Math.random().toString(),
  };

  misto.push(noveMisto);
  console.log(misto);
  // nakonec  ovladač i funkci renderMista pro zobrazení v seznamu UL-LI
  renderMista();
  ziskejMapu(gpsMista[1], gpsMista[0]);
};
//funkce zobrazující mapu
let ziskejMapu = (longitude, latitude) => {
  const mapdiv = document.getElementById("mapdiv");
  mapdiv.innerHTML = "";
  map = new OpenLayers.Map("mapdiv");
  map.addLayer(new OpenLayers.Layer.OSM());

  var lonLat = new OpenLayers.LonLat( longitude ,latitude )
        .transform(
          new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
          map.getProjectionObject() // to Spherical Mercator Projection
        );
        
  var zoom=16;

  var markers = new OpenLayers.Layer.Markers( "Markers" );
  map.addLayer(markers);
  
  markers.addMarker(new OpenLayers.Marker(lonLat));
  
  map.setCenter (lonLat, zoom);

}
// funkce, která získává poslední souřadnice zadaného místa
let getLastGps = () => {
  if (misto[misto.length - 1]) {
    gpsMista = misto[misto.length - 1];
    gpsMista = Object.values(gpsMista);
    if (gpsMista[2]) {
      gpsMista = Object.values(gpsMista[2]);
      gpsMista = Object.values(gpsMista);
      console.log(gpsMista[0], gpsMista[1], gpsMista[2]);
      ziskejMapu(gpsMista[1], gpsMista[0]);
      } else {
      console.log("Žádná gps");
    }
  } else console.log("Nemáte zadané místo.");
};
filterMista = () => {console.log('bla')}
let y = document.getElementById("x");

pridejMistoBtn.addEventListener("click", pridejMistoOvladac);
hledejMistoBtn.addEventListener("click", filterMista);
reloadMapBtn.addEventListener("click", getLastGps);
window.addEventListener('load', () => {
  console.log('page is fully loaded');
  ziskejMapu(14.4174, 50.0888);
});
console.log(misto);
