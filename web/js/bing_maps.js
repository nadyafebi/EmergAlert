var map; 
function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(34.021001, -118.283327),
        zoom: 16
    });

    //Load the Spatial Math module.
    Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialMath', 'Microsoft.Maps.Contour'], function () {
        var center = map.getCenter();

        var circle1 = createCircle(center, .06, 'rgba(215, 25, 28, 0.5)');
        var circle2 = createCircle(center, .08, 'rgba(235, 140, 14, 0.5)');
        var circle3 = createCircle(center, .1, 'rgba(255, 255, 0, 0.5)');
        var circle4 = createCircle(center, .12, 'rgba(140, 202, 32, 0.5)');
        var circle5 = createCircle(center, .14, 'rgba(25, 150, 65, 0.5)');
        var layer = new Microsoft.Maps.ContourLayer([circle1, circle2, circle3, circle4, circle5], {
            colorCallback: function (val) {
                return val;
            },
            polygonOptions: {
                strokeThickness: 0
            }
        });
        map.layers.insert(layer);
    });
}


// var color = 'rgba(25, 150, 65, 0.5)';
//     if (value >= 200) {
//         color = 'rgba(215, 25, 28, 0.5)';
//     }
//     else if (value >= 160) {
//         color = 'rgba(235, 140, 14, 0.5)';
//     }
//     else if (value >= 120) {
//         color = 'rgba(255, 255, 0, 0.5)';
//     }
//     else if (value >= 80) {
//         color = 'rgba(140, 202, 32, 0.5)';
//     }

function createCircle(center, radius, color) {
    //Calculate the locations for a regular polygon that has 36 locations which will rssult in an approximate circle.
    var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
    return new Microsoft.Maps.ContourLine(locs, color);
}

// var map;
// //URL to the USGS for Earthquake intensity contours of M7.0 – 1km WSW of Kumamoto-shi, Japan.
// var earthquakeIntensityDataUrl = '/data/heatmap.json';//'http://earthquake.usgs.gov/archive/product/shakemap/us20005iis/us/1467057010522/download/cont_psa03.json';
// function GetMap() {
//     map = new Microsoft.Maps.Map('#myMap', {
//         center: new Microsoft.Maps.Location(34.021001, -118.283327),
//         zoom: 16
//     });
//     //Load the Contour and GeoJson modules.
//     Microsoft.Maps.loadModule(['Microsoft.Maps.Contour', 'Microsoft.Maps.GeoJson'], function () {
//         //Download the contour data from the USGS. Parse the GeoJson earthquake intensity contour data and create contour lines out of them.
//         Microsoft.Maps.GeoJson.readFromUrl(earthquakeIntensityDataUrl, function (data) {
//             var contourLines = [];
//             for (var i = 0; i < data.length; i++) {
//                 contourLines.push(new Microsoft.Maps.ContourLine(data[i].getLocations(), data[i].metadata.value));
//             }
//             //Add the contour lines to a contour layer.
//             var layer = new Microsoft.Maps.ContourLayer(contourLines, {
//                 colorCallback: assignContourColor,
//                 polygonOptions: {
//                     //Make the outlines of the contour area transparent.
//                     strokeColor: 'rgba(0, 0, 0, 0)'
//                 }
//             });
//             //Add the contour layer to the map.
//             map.layers.insert(layer);
//         });
//     });
// }
// //A function that contains business logic that specifies which color to make a contour area based on it's value.
// function assignContourColor(value) {
//     var color = 'rgba(25, 150, 65, 0.5)';
//     if (value >= 200) {
//         color = 'rgba(215, 25, 28, 0.5)';
//     }
//     else if (value >= 160) {
//         color = 'rgba(235, 140, 14, 0.5)';
//     }
//     else if (value >= 120) {
//         color = 'rgba(255, 255, 0, 0.5)';
//     }
//     else if (value >= 80) {
//         color = 'rgba(140, 202, 32, 0.5)';
//     }
//     return color;
// }
