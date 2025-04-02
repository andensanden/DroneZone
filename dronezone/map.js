var forbiddenZoneDrawing = false;
var removeButtonIsOn = false;
var map;

drawMap();  // TEMPORARY, for testing purposes

/*
    Sets a starting point for the map and chooses a tile layer for it
*/
function drawMap() {
    map = L.map('map').setView([59.3293, 18.0686], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

/*
    User presses a point on the map and one of the following occurs:
    1. A node is placed.
    2. A node is removed.
    3. A forbidden node is placed.
    4. A forbidden node is removed.
*/
function onMapClick(e) {
    if (!forbiddenZoneDrawing) {    // Normal nodes
        if (nodeLimit) {
            return;
        }

        for (var i = 0; i < nodes.length; i++) {
            if (inNode(e.latlng, nodes[i])) {
                if (removeButtonIsOn) {
                    removeNode(i, nodes, coords, pathSegments);
                }
                else {
                    coords.push(nodes[i].getLatLng());
                    drawPolyline(coords);
                    nodeLimit = true;
                    nodes = [];
                    return;
                }
            }
        }
    }
    else {  // Forbidden nodes
        for (var i = 0; i < fNodes.length; i++) {
            if (inNode(e.latlng, fNodes[i])) { 
                if(removeButtonIsOn) {
                    removeNode(i, fNodes, fCoords)
                }
                else {
                fNodes = [];
                return;
                }
            }
        }
    }
    
    if(removeButtonIsOn) {
        return;
    }

    if (!forbiddenZoneDrawing) {
        // Check if the point is in a forbidden zone or if the line would intersect a forbidden zone
        if (wouldLineIntersectForbiddenZone(e.latlng)) {
            alert("Cannot place point or draw line through forbidden zone!");
            return;
        }
        
        coords.push(e.latlng);
        drawNode(e.latlng, nodes, 'blue', '#0000ff');
        drawPolyline(coords);
    }
    else {
        fCoords.push(e.latlng);
        drawNode(e.latlng, fNodes, 'red', '#f03');
        drawForbiddenPoly(fCoords);
    }

    if (nodes.length == maxNodes) {
        nodeLimit = true;
        nodes = [];
    }
}

/*
    Check if the current position is inside a node
*/
function inNode(pos, node) {
    return node.getLatLng().distanceTo(pos) <= circleRadius * 2
}

/*
    Push a circle of a specified color and fill color to an array of nodes, draw it on the map at pos
*/
function drawNode(pos, circleArray, color, fillColor) {
    circleArray.push(L.circle(pos, {
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.5,
        radius: circleRadius
    }));
    circleArray[circleArray.length - 1].addTo(map);
}

/*
    Removes a node and its coordinates
*/
function removeNode(index, nodes, coords, pathSegments) {
    nodes[index].remove();
    coords.splice(index, 1);
    nodes.splice(index, 1);
    if (pathSegments) {
        if (pathSegments[index]) pathSegments[index].remove();
        pathSegments.splice(index, 1);
        drawPolyline(coords);
    }
    else drawForbiddenPoly(fCoords);
}

/*
    Function for remove nodes button
*/
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

/*
    Function for draw forbidden zones button
*/
function onForbiddenClick() {
    if(forbiddenZoneDrawing){
        forbiddenZoneDrawing= false;

        document.getElementById("forbiddenButton").style.backgroundColor ="white";
        
        // Reset forbidden coordinates for the next forbidden zone
        //fCoords = [];
        //fNodes = [];
    }
    else{
    forbiddenZoneDrawing = true;
    document.getElementById("forbiddenButton").style.backgroundColor = "green";
    }
}

map.on('click', onMapClick);

var locButton = L.control.locate({
    locateOptions: {
        watch: true  // Native API's watch mode
      },
    position: 'topleft',
    drawCircle: false,
    follow: true,  // Don't auto-follow (more like your original)
    setView: "always",
    keepCurrentZoomLevel: false,
    drawMarker: true,
    markerClass: L.circleMarker,
    circleStyle: {
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 0.15,
        weight: 2
    },
    markerStyle: {
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 1,
        weight: 3,
        radius: 8

    },
    onLocationError: function(err) {
        console.log("Location error:", err.message);
    }
}).addTo(map);

locButton.start();