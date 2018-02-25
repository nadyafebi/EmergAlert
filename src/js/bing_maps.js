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


function createCircle(center, radius, color) {
    //Calculate the locations for a regular polygon that has 36 locations which will rssult in an approximate circle.
    var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
    return new Microsoft.Maps.ContourLine(locs, color);
}