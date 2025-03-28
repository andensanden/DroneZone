var map = L.map('map').setView([59.3293, 18.0686], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var maxCircles = 20;
var circleLimit = false;
let circles = [];
let coords = [];
var circleRadius = 20;

var removeButtonIsOn = false;
function onMapClick(e) {

    
    if (circleLimit) {
        return;
    }

    for (var i = 0; i < circles.length; i++) {
        if (circles[i].getLatLng().distanceTo(e.latlng) <= circleRadius * 2) { 
            if(removeButtonIsOn){
                circles[i].remove();
                coords.splice(i, 1);
                circles.splice(i, 1);
                drawPolygon(coords);
                return;
                


            }
            else{
            circleLimit = true;
            circles = [];
            return;
        }
        }

    }
    if(removeButtonIsOn){
        return;
    }

    
    coords.push(e.latlng);
    // Draw circle
     circles.push ( L.circle(e.latlng, {
        color: 'blue',
        fillColor: '#5224',
        fillOpacity: 0.5,
        radius: circleRadius
    }));
    circles[circles.length - 1].addTo(map);
    drawPolygon(coords);

    if (circles.length == maxCircles) {
        circleLimit = true;
        circles = [];
    }
    
    
}

function onButtonClick(){
    
    if(removeButtonIsOn){
        removeButtonIsOn= false;
    }
    else
    removeButtonIsOn = true;
    

}

var lastPolygon;
function drawPolygon(coords) {
    
    if (lastPolygon != null) lastPolygon.remove();
   
    sortCoordinates(coords);
    lastPolygon = L.polygon(coords).addTo(map);
    
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
    circles.sort(function(a, b) {
        let angleA = calculateAngle(a, centroid);
        let angleB = calculateAngle(b, centroid);
        return angleA - angleB; // Sort in counterclockwise direction
    });

    return coords;
}

map.on('click', onMapClick);

// Temporary for adding markers in future
var marker = L.marker([59.3293, 18.0686]).addTo(map);