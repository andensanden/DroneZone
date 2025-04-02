var forbiddenZoneDrawing = false;
var removeButtonIsOn = false;
var map;

export function drawMap() {
    /*map = L.map('map').setView([59.3293, 18.0686], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);*/
}
/*
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
                    if (pathSegments[i]) pathSegments[i].remove();
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

function onRemoveClick() {
    if(removeButtonIsOn){
        removeButtonIsOn= false;

        document.getElementById("removeButton").style.backgroundColor ="white";
    }
    else{
    removeButtonIsOn = true;
    document.getElementById("removeButton").style.backgroundColor = "green";
    }
}

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
*/
map.on('click', onMapClick);