const searchBtn = document.querySelector('#search-btn');
const currentLoc = document.querySelector('#start');
const destinationLoc = document.querySelector('#end');

const outputDist = document.querySelector('#output .distance');
const outputDur = document.querySelector('#output .duration');
const outputPrice = document.querySelector('#output .price');

let distance;
let duration;
let startAddress, endAddress;

searchBtn.addEventListener('click', getLocation);

function getLocation(e) {
  e.preventDefault();

  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();

  const request = {
    origins: [startAddress],
    destinations: [endAddress],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };
  service.getDistanceMatrix(request).then((response) => {
    outputDist.innerHTML =
      (response.rows[0].elements[0].distance.value / 1000).toFixed(2) + ' km';
    outputDur.innerHTML = response.rows[0].elements[0].duration.text;
    outputPrice.innerHTML =
      'Rs. ' +
      (response.rows[0].elements[0].distance.value / 1000).toFixed(2) * 20;
  });
}

function initAutocomplete() {
  const input1 = document.getElementById('start');
  const input2 = document.getElementById('end');

  const searchBox1 = new google.maps.places.SearchBox(input1);
  const searchBox2 = new google.maps.places.SearchBox(input2);

  searchBox1.addListener('places_changed', () => {
    const places = searchBox1.getPlaces();
    // console.log(places);

    startAddress = places[0].formatted_address;
    // console.log(startAddress);

    if (places.length == 0) {
      return;
    }
  });

  searchBox2.addListener('places_changed', () => {
    const places = searchBox2.getPlaces();
    // console.log(places);

    endAddress = places[0].formatted_address;
    // console.log(endAddress);

    if (places.length == 0) {
      return;
    }
  });
}
