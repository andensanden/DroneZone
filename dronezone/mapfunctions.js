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

var forbiddenCoords = [];
var forbiddenCircles = [];

var forbiddenZoneDrawing = false;
var removeButtonIsOn = false;

// Array to store all forbidden polygons
var forbiddenPolygons = [];

// Function to check if a line segment intersects with a polygon edge
function doLineSegmentsIntersect(p1, p2, p3, p4) {
    // Calculate the direction of the vectors
    const d1x = p2.lng - p1.lng;
    const d1y = p2.lat - p1.lat;
    const d2x = p4.lng - p3.lng;
    const d2y = p4.lat - p3.lat;

    // Calculate the determinant
    const det = d1x * d2y - d1y * d2x;
    
    // If det is zero, lines are parallel
    if (det === 0) return false;
    
    const dx = p3.lng - p1.lng;
    const dy = p3.lat - p1.lat;
    
    // Calculate parameters for the intersection point
    const t = (dx * d2y - dy * d2x) / det;
    const u = (dx * d1y - dy * d1x) / det;
    
    // Check if the intersection point is within both line segments
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
}

// Function to check if a line segment intersects with a polygon
function doesLineIntersectPolygon(p1, p2, polygon) {
    const polygonCoords = polygon.getLatLngs()[0];
    
    // Check if either endpoint is inside the polygon
    if (isPointInPolygon(p1, polygon) || isPointInPolygon(p2, polygon)) {
        return true;
    }
    
    // Check if the line segment intersects with any polygon edge
    for (let i = 0; i < polygonCoords.length; i++) {
        const j = (i + 1) % polygonCoords.length;
        if (doLineSegmentsIntersect(p1, p2, polygonCoords[i], polygonCoords[j])) {
            return true;
        }
    }
    
    return false;
}

// Function to check if a point is inside a polygon
function isPointInPolygon(point, polygon) {
    // Get the polygon's coordinates
    var polygonCoords = polygon.getLatLngs()[0];
    
    // Ray casting algorithm for point in polygon detection
    var inside = false;
    var x = point.lat, y = point.lng;
    
    for (var i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
        var xi = polygonCoords[i].lat, yi = polygonCoords[i].lng;
        var xj = polygonCoords[j].lat, yj = polygonCoords[j].lng;
        
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}

// Function to check if a new point would create a line that intersects with any forbidden zone
function wouldLineIntersectForbiddenZone(newPoint) {
    // If this is the first point, just check if it's in a forbidden zone
    if (coords.length === 0) {
        return isPointInForbiddenZone(newPoint);
    }
    
    // Get the last point to form a line segment
    const lastPoint = coords[coords.length - 1];
    
    // Check if the line segment intersects with any forbidden polygon
    for (var i = 0; i < forbiddenPolygons.length; i++) {
        if (doesLineIntersectPolygon(lastPoint, newPoint, forbiddenPolygons[i])) {
            return true;
        }
    }
    
    return false;
}

// Function to check if a point is in any forbidden zone
function isPointInForbiddenZone(point) {
    for (var i = 0; i < forbiddenPolygons.length; i++) {
        if (isPointInPolygon(point, forbiddenPolygons[i])) {
            return true;
        }
    }
    return false;
}

function onMapClick(e) {

    
    if (circleLimit) {
        return;
    }

    if (!forbiddenZoneDrawing) {
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getLatLng().distanceTo(e.latlng) <= circleRadius * 2) { 
                if(removeButtonIsOn){
                    circles[i].remove();
                    coords.splice(i, 1);
                    circles.splice(i, 1);
                    if (pathSegments[i] != null) pathSegments[i].remove();
                    pathSegments.splice(i, 1);
                    drawPolyline(coords);
                    return;
                }
                else{
                circleLimit = true;
                circles = [];
                return;
            }
            }
        }
    }
    else {
        for (var i = 0; i < forbiddenCircles.length; i++) {
            if (forbiddenCircles[i].getLatLng().distanceTo(e.latlng) <= circleRadius * 2) { 
                if(removeButtonIsOn){
                    forbiddenCircles[i].remove();
                    forbiddenCoords.splice(i, 1);
                    forbiddenCircles.splice(i, 1);
                    drawForbiddenPoly(forbiddenCoords);
                    return;
                }
                else{
                circleLimit = true;
                forbiddenCircles = [];
                return;
            }
            }
        }
    }
    
    if(removeButtonIsOn){
        return;
    }

    
    if (!forbiddenZoneDrawing) {
        // Check if the point is in a forbidden zone or if the line would intersect a forbidden zone
        if (wouldLineIntersectForbiddenZone(e.latlng)) {
            alert("Cannot place point or draw line through forbidden zone!");
            return;
        }
        
        coords.push(e.latlng);
        // Draw circle
        circles.push(L.circle(e.latlng, {
            color: 'blue',
            fillColor: '#0000ff',
            fillOpacity: 0.5,
            radius: circleRadius
        }));
        circles[circles.length - 1].addTo(map);
        drawPolyline(coords);
    }
    else {
        forbiddenCoords.push(e.latlng);
        // Draw circle
        forbiddenCircles.push(L.circle(e.latlng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: circleRadius
        }));
        forbiddenCircles[forbiddenCircles.length - 1].addTo(map);
        drawForbiddenPoly(forbiddenCoords);
    }

    if (circles.length == maxCircles) {
        circleLimit = true;
        circles = [];
    }
    
    
}

function onButtonClick() {

    if(removeButtonIsOn){
        removeButtonIsOn= false;

        document.getElementById("buttonColor").style.backgroundColor ="white";
    }
    else{
    removeButtonIsOn = true;
    document.getElementById("buttonColor").style.backgroundColor = "green";
    }
}

var lastPolyline;
function drawPolyline(coords) {
    
    if (lastPolyline != null) lastPolyline.remove();
   
    sortCoordinates(coords);
    lastPolyline = L.polyline(coords).addTo(map);
    updatePathSegments();
}

var lastPolygon;
function drawForbiddenPoly(coords) {
    
    if (lastPolygon != null) lastPolygon.remove();
   
    sortCoordinates(coords);
    lastPolygon = L.polygon(coords, {color: 'red', fillColor: '#f03'}).addTo(map);
    
    // Add the polygon to our array of forbidden polygons
    if (coords.length >= 3) {
        // Store the polygon in our array
        forbiddenPolygons.push(lastPolygon);
    }
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

function onForbiddenClick() {
    if(forbiddenZoneDrawing){
        forbiddenZoneDrawing= false;

        document.getElementById("forbiddenButton").style.backgroundColor ="white";
        
        // Reset forbidden coordinates for the next forbidden zone
        //forbiddenCoords = [];
        //forbiddenCircles = [];
    }
    else{
    forbiddenZoneDrawing = true;
    document.getElementById("forbiddenButton").style.backgroundColor = "green";
    }
}

var pathSegments = [];
function updatePathSegments() {
    // Clear all existing path segments
    pathSegments.forEach(segment => map.removeLayer(segment));
    pathSegments = [];

    // Create individual segments for each pair of circles
    for (let i = 0; i < coords.length - 1; i++) {
        const segmentCoords = [coords[i], coords[i+1]];
        const pathWidthMeters = 40;
        const bufferedCoords = createBufferedPath(segmentCoords, pathWidthMeters);
        
        const segment = L.polygon(bufferedCoords, {
            color: 'blue',
            fillOpacity: 0.3,
            weight: 1
        }).addTo(map);
        
        pathSegments.push(segment);
        
        // Optional: Add center line for each segment
        /*pathSegments.push(L.polyline(segmentCoords, {
            color: 'blue',
            weight: 2
        }).addTo(map));*/
    }
}

function createBufferedPath(coords, widthMeters) {
    if (coords.length < 2) return [];
    
    const halfWidth = widthMeters / 2 / 111320; // Approx meters to degrees
    let leftSide = [];
    let rightSide = [];
    
    const p1 = coords[0];
    const p2 = coords[1];
    const angle = Math.atan2(p2.lat - p1.lat, p2.lng - p1.lng);
    const perpAngle = angle + Math.PI/2;
    
    // Calculate offset points
    leftSide.push([
        p1.lat + Math.sin(perpAngle) * halfWidth,
        p1.lng + Math.cos(perpAngle) * halfWidth
    ]);
    rightSide.push([
        p1.lat - Math.sin(perpAngle) * halfWidth,
        p1.lng - Math.cos(perpAngle) * halfWidth
    ]);
    leftSide.push([
        p2.lat + Math.sin(perpAngle) * halfWidth,
        p2.lng + Math.cos(perpAngle) * halfWidth
    ]);
    rightSide.push([
        p2.lat - Math.sin(perpAngle) * halfWidth,
        p2.lng - Math.cos(perpAngle) * halfWidth
    ]);
    
    return leftSide.concat(rightSide.reverse());
}