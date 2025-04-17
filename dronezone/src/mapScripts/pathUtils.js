/*
    Builds the path based on the existing nodes
*/
function BuildPath(nodes, setPaths) {
    const path = [];
    for (var i = 0; i < nodes.length-1; i++) {
        path.push([nodes[i].position, nodes[i+1].position]);
    }
    setPaths(path);
}

/*
    Builds the buffer zone based on the existing nodes
*/
function BuildBuffer(nodes, setBufferZones) {
    const buffer = [];
    const bufferWidth = 40;
    for (var i = 0; i < nodes.length-1; i++) {
        buffer.push(CreateBufferCoords([nodes[i].position, nodes[i+1].position], bufferWidth));
    }
    setBufferZones(buffer);
}