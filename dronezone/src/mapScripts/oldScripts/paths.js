const maxNodes = 20;
const circleRadius = 20;
var nodeLimit = false;
let nodes = [];
let coords = [];

var lastPolyline;
function drawPolyline(coords) {
    if (lastPolyline) lastPolyline.remove();
   
    lastPolyline = L.polyline(coords).addTo(map);
    updatePathSegments();
}

var pathSegments = [];
function updatePathSegments() {
    // Clear all existing path segments
    pathSegments.forEach(segment => map.removeLayer(segment));
    pathSegments = [];

    // Create individual segments for each pair of nodes
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