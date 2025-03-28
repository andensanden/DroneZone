var map = L.map('map').setView([59.3293, 18.0686], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var maxCircles = 5;
let coords = [];
var circleRadius = 20;
function onMapClick(e) {
    for (var i = 0; i < coords.length; i++) {
        if (coords[i].distanceTo(e.latlng) <= circleRadius * 2) {
            drawPolygon(coords);
            coords = [];
            return;
        }
    }

    coords.push(e.latlng);
    var circle = L.circle(e.latlng, {
        color: 'blue',
        fillColor: '#5224',
        fillOpacity: 0.5,
        radius: circleRadius
    }).addTo(map);

    if (coords.length == maxCircles) {
        drawPolygon(coords);
        coords = [];
    }
}

function drawPolygon(coords) {
    sortCoordinates(coords);
    L.polygon(coords).addTo(map);
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

// Temporary for adding markers in future
var marker = L.marker([59.3293, 18.0686]).addTo(map);