function initMap() {
  // The location of Uluru
  var aUluru = {lat: 48.2392831, lng: 16.3773241};
  // The map, centered at Uluru
  var aMap = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: aUluru});
  // The marker, positioned at Uluru
  var aMarker = new google.maps.Marker({position: aUluru, map: aMap});
}