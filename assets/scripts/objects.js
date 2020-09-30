const pridejMistoBtn = document.getElementById("pridej-misto-btn");
const hledejMistoBtn = document.getElementById("hledej-btn");
var gpsMista = new Object();


// Funkce, která vytáhne UL-LI seznam míst z pole misto[]
const renderMista = () => {
  const seznamMist = document.getElementById('seznam-mist');

  if (misto.length === 0) {
    seznamMist.classList.remove('visible');
    return;
  } else {
    seznamMist.classList.add('visible');
  }
  seznamMist.innerHTML = '';

  misto.forEach((mista) => {
    const liSeznamMist = document.createElement('li');
    let text = mista.info.Místo + ' - ';
    for (const key in mista.info) {
      if (key !== 'Místo') {
        text = text + ` ${key}: ${mista.info[key]}`;
      }
    }
    liSeznamMist.textContent = text;
    seznamMist.append(liSeznamMist);
  });
};
// Ovladač na button pridej-misto-btn, který vytváří objekt noveMisto a přidává ho do pole misto[]
const pridejMistoOvladac = () => {
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
};
// funkce, která získává poslední souřadnice zadaného místa
let getLastGps = () => {
  if (misto[misto.length -1]){
  gpsMista = misto[misto.length -1];
  gpsMista = Object.values(gpsMista);
  gpsMista = Object.values(gpsMista[2]);
  gpsMista = Object.values(gpsMista);
  console.log(gpsMista[0], gpsMista[1], gpsMista[2]);
}else console.log('nic');
}
let y = document.getElementById("x");

pridejMistoBtn.addEventListener("click", pridejMistoOvladac);
hledejMistoBtn.addEventListener('click', getLastGps);
console.log(misto);