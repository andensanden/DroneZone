var map = L.map('map').setView([59.3293, 18.0686], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var numOfCircles = 5;
var indx = 0;
let coords = new Array (numOfCircles);
function onMapClick(e) {
    if (indx < numOfCircles) {
        coords[indx++] = e.latlng;
        var circle = L.circle(e.latlng, {
            color: 'blue',
            fillColor: '#5224',
            fillOpacity: 0.5,
            radius: 20
        }).addTo(map);
    }
    else {
        drawPolygon(coords);
        indx = 0;
    }
}

function drawPolygon(coords) {
    sortCoordinates(coords);
    var latlngs = [coords[0],coords[1],coords[2],coords[3],coords[4]];
    var polygon = L.polygon(latlngs).addTo(map);
}

// Function to calculate the centroid of a set of coordinates
function calculateCentroid(coords) {
    let latSum = 0;
    let lonSum = 0;
    for (let i = 0; i < coords.length; i++) {
        latSum += coords[i].lat;
        lonSum += coords[i].lng;
    }
    return {
        lat: latSum / coords.length,
        lng: lonSum / coords.length
    };
}

// Function to calculate the angle between two points
function calculateAngle(point, center) {
    // Use atan2 to calculate the angle
    return Math.atan2(point.lat - center.lat, point.lng - center.lng);
}

// Function to sort the coordinates in counterclockwise order
function sortCoordinates(coords) {
    // Step 1: Calculate the centroid
    const centroid = calculateCentroid(coords);

    // Step 2: Sort the points by angle relative to the centroid
    coords.sort(function(a, b) {
        let angleA = calculateAngle(a, centroid);
        let angleB = calculateAngle(b, centroid);
        return angleA - angleB; // Sort in counterclockwise direction
    });

    return coords;
}

map.on('click', onMapClick);