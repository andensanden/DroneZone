const defaultRadius = 20;

export class Node {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius ? radius : defaultRadius;
        this.visible = true;
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

    movePosition(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    /*
        If two nodes overlap, set their positions to be the same
    */
    overlapNode(nodes) {
        if (nodes.length === 0) return;
        for (var i = 0; i < nodes.length; i++) {
            let dist = this.position.distanceTo(nodes[i].position);
            if (dist === 0)
                continue;
            else if (dist <= this.radius * 2) {
                return nodes[i];
            }
        }
    }
}