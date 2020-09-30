
var mList = {
    'Stavba': [
      "Synagoga",
      "Kostel",
      "Činžovní dům",
      "Věž",
      "Panelový dům",
      "Mešita",
      "Kaple",
      "Most",
    ],
    'Náměstí': ["Náměstí"],
    ["Sochařský objekt"]: [
      "Architektonická plastika",
      "Urbanistické sochařství",
      "Sochařství přírodní",
      "Volné plastiky",
      "Socha",
      "Zahrada",
      "Pomník",
      "Náhrobek",
      "Busta",
    ],
    ["Přírodní útvar"]: ["Strom", "Skála", "Potok", "Vyhlídka"],
  };

  el_parent = document.getElementById("vyber-typu-mista");
  el_child = document.getElementById("vyber-strucny-popis");

  for (key in mList) {
    el_parent.innerHTML =
      el_parent.innerHTML + "<option>" + key + "</option>";
  }
  // el_input.addEventListener("change", function log(){
  //   console.log('huha');
  // });
  el_parent.addEventListener("change", function populate_child(e) {
    el_child.innerHTML = "";
    
    itm = e.target.value;
    if (itm in mList) {
      for (i = 0; i < mList[itm].length; i++) {
        el_child.innerHTML =
          el_child.innerHTML + "<option>" + mList[itm][i] + "</option>";
      }
    }
  });
