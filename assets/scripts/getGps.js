let x = document.getElementById("demo");
const misto = [];
let noveMisto = new Object();
const lokace = navigator.geolocation;
var coords = { lat: "", lon: "" };
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 600000,
};
function getLocation() {
  if (lokace) {
    return lokace.getCurrentPosition(showPosition, showError, options);
  } else {
    x.innerHTML =
      "Váš prohlížeč nepodporuje geolokaci.<br>Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  noveMisto.gps = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
  };
  x.innerHTML =
    "Zeměpisná šířka (latitude): " +
    position.coords.latitude +
    "<br>Zeměpisná délka (longitude): " +
    position.coords.longitude +
    `<br>Přesnost na ${position.coords.accuracy} metrů.<br>More or less ${position.coords.accuracy} meters.`;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML =
        "Teprve po povolení GPS lokace, je možné přidat místo.<br>User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML =
        "GPS lokace je nedostupná.<br>Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML =
        "Vypršel časový limit pro získání GPS.<br>The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML =
        "Nastala neznámá chyba, zkuste to znovu.<br>An unknown error occurred.";
      break;
  }
}
