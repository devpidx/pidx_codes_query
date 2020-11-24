// Create the map object with options
var map = L.map("mapid", {
    center: [48.73, 16.0059],
    zoom: 5
  });
// function createMap(countryTerminals) {
var markerLayer
  // Create the tile layer that will be the background of our map
 L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: MY_KEY
  }).addTo(map);
var apiURL = "http://api.pidx.org:8080/api/geo/terminals"
d3.json(apiURL).then(function(response) {
  var markers = [];
  for (var i = 0; i < response.result.length; i++) {
    // Set the data location property to a variable
    var apiData = response.result[i];
    // Check for location property
    if (apiData) {
      var PP = L.circleMarker([apiData.Latitude, apiData.Longitude], options={radius:5, fillColor: "rgb(202, 101, 40)", color: "rgb(202, 101, 40)"})
           .bindPopup("<h4><h4>Submitter:" + apiData.Submitter + "<h4><h4>Terminal Owner: " + apiData.Terminal_Owner + "</h4>" ) ;
      // Add a new marker to the cluster group and bind a pop-up
      markers.push(PP);
    }
  }
  L.layerGroup(markers).addTo(map);
});