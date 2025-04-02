var fCoords = [];
var fNodes = [];
var fPolys = [];

var lastPolygon;
function drawForbiddenPoly(coords) {
    if (lastPolygon) lastPolygon.remove();
   
    coords = sortCoordinates(coords);
    lastPolygon = L.polygon(coords, {color: 'red', fillColor: '#f03'}).addTo(map);
    
    fPolys.push(lastPolygon);
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
    const centroid = calculateCentroid(coords);

    // Sort the points by angle relative to the centroid
    coords.sort(function(a, b) {
        let angleA = calculateAngle(a, centroid);
        let angleB = calculateAngle(b, centroid);
        return angleA - angleB; // Sort in counterclockwise direction
    });

    return coords;
}

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
    for (var i = 0; i < fPolys.length; i++) {
        if (doesLineIntersectPolygon(lastPoint, newPoint, fPolys[i])) {
            return true;
        }
    }
    
    return false;
}

// Function to check if a point is in any forbidden zone
function isPointInForbiddenZone(point) {
    for (var i = 0; i < fPolys.length; i++) {
        if (isPointInPolygon(point, fPolys[i])) {
            return true;
        }
    }
    return false;
}