const defaultRadius = 20;

export class Node {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius ? radius : defaultRadius;
    }

    /*
        Add a new node to the array of nodes
    */
    addNode(nodes, setNodes) {
        //NodeOverlap(newNode, nodes);
        setNodes((prevNodes) => [...prevNodes, this]);
    }

    /*
        Remove a node based on its index in the nodes array
    */
    removeNode(index, setNodes) {
        setNodes((prevNodes) => prevNodes.filter((_, i) => i !== index));
    }
}

/*
    Add a new node to the array of nodes
*/
/*function AddNode(e, setNodes, nodes) {
    var newNode = {
        position: e.latlng,
        radius: nodeRadius,
    }
    if (nodes.length === 0) alert("Empty");
    //NodeOverlap(newNode, nodes);
    setNodes((prevNodes) => [...prevNodes, newNode]);
}*/

/*
    If two nodes overlap, set their positions to be the same
*/
function NodeOverlap(node, nodes) {
    if (nodes.length === 0) return;
    alert("Yes");
    const nodePos = node.position;
    if (node.position.distanceTo(nodes[nodes.length-1].position)) alert(node.position.distanceTo(nodes[nodes.length-1].position));
    else alert("smthing");
    //if (node.position.distanceTo(nodes[nodes.length-1].position)) alert("Bye!");
    for (var i = 0; i < nodes.length; i++) {
        /*if (node == nodes[i])
            continue;*/
        if (nodePos.distanceTo(nodes[i].position) <= nodeRadius * 2)
            //node.position = nodes[i].position;
            alert("Hello!");
    }
}