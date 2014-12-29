L.mapbox.accessToken = 'pk.eyJ1IjoidmlrdG9yZGIiLCJhIjoieDNyLWoyUSJ9.GoQrEycrvamb9ZIn-tv1Rw';
var geolocate = document.getElementById('geolocate');
var map = L.mapbox.map('map', 'viktordb.kk133cjf',{

    zoomControl: false,
    attributionControl: false

});

var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}


map.scrollWheelZoom.disable();

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    //map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'size': 'large',
            'marker-color': '#63b6e5',
            'marker-symbol': 'star'
        }
    });

    // And hide the geolocation button
    geolocate.innerHTML = 'Found you!';
    $('#geolocate').css('background-color', '#b0daf1');
    $('#geolocate').css('cursor', 'default');
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});/**
 * Created by Viktor on 28/12/14.
 */
