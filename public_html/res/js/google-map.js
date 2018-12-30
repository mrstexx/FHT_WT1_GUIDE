function initMap() {
    var aUluru = {lat: 48.2392831, lng: 16.3773241};
    var aMap = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: aUluru});
    var aMarker = new google.maps.Marker({position: aUluru, map: aMap});
}