// Define the map
var map = L.map('map').setView([44.95, -93.09], 10);

/* Basemaps */

//Basemap: Esri Shaded Relief (on zoom)
var esriShadedRelief = L.esri.basemapLayer('ShadedRelief', {
    maxZoom: 20,
    minZoom: 10
}).addTo(map);

var esriShadedReliefLabels = L.esri.basemapLayer('ShadedReliefLabels', {
  maxZoom: 20,
  minZoom: 10
}).addTo(map);

// Basemaps: Esri Gray (on load/zoom out)
var esriGray = L.esri.basemapLayer('Gray', {
    maxZoom: 10,
    minZoom: 0
}).addTo(map);

var esriGrayLabels = L.esri.basemapLayer('GrayLabels', {
  maxZoom: 10,
  minZoom: 0
}).addTo(map);

// Minnesota State Parks
var mnStateParks = L.geoJson(null, {
	highlight: true,
style: function (feature) {
    return {
      color: 'none',
      fillColor: '#31a354',
      fillOpacity: 0.75,
      opacity: 1,
      clickable: true
    };
  },
  onEachFeature: function (feature, layer) {
	  //Popup
	    if (feature.properties.PARKNAME) {
        layer.bindPopup("<h3>" + feature.properties.PARKNAME + " State Park</h3>");
	      } //End Popup
  }
}).addTo(map);
$.getJSON("data/mnStateParks.json", function (data) {
	mnStateParks.addData(data);
});

// Hennepin County Park dataset
// TODO: For additional query work - Park facility service (called 'type'): http://gis.hennepin.us/arcgis/rest/services/HennepinData/PLACES/MapServer/11/query?outFields=*&where=ACTIVITY%20like%20%27%25Ice%20Rink%25%27
// Spatial Queries Resource: https://esri.github.io/esri-leaflet/examples/spatial-queries.html
var parks = L.esri.featureLayer({
  url: "http://gis.hennepin.us/arcgis/rest/services/HennepinData/PLACES/MapServer/3",
  style: function () {
    return {
      color: "#70ca49",
      weight: 2
    };
  }
}).addTo(map);

// Hennepin's Table BS
// var rinkQuery = L.esri.Tasks.query({
//     url: "http://gis.hennepin.us/arcgis/rest/services/HennepinData/PLACES/MapServer/11"
// });
//
// rinkQuery.where("ACTIVITY like '%Ice Rink%'"); //Query out the ice rinks

//TODO: Find out how to link the parks with the ice rink activity
// Once joined, add the 'ACTIVITY' field.
var popupTemplate = "<h3>{PARK_NAME} ({PARK_CITY})</h3>Park ID: {PARKID}";
//var popupTemplate = "<h3>{PARK_NAME} ({PARK_CITY})</h3>Park ID: {PARKID}<br />Activity Type: {ACTIVITY}";

// This only works in the older Esri and Leaflet versions
parks.bindPopup(function(feature){
  return L.Util.template(popupTemplate, feature.properties);
});
