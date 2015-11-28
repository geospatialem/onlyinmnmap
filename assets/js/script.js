// Define the map
var map = L.map('map').setView([44.95, -93.09], 10);

//Basemap
L.esri.basemapLayer("Topographic").addTo(map);

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

var popupTemplate = "<h3>{PARK_NAME}</h3>{PARK_CITY}<br />Park ID: {PARKID}";

// This only works in the older Esri and Leaflet versions
parks.bindPopup(function(feature){
  return L.Util.template(popupTemplate, feature.properties);
});
