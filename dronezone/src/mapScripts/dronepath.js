export class Dronepath {
    nodes = [];

    constructor(owner) {
        this.owner = owner;
    }

    /*
        Add a node
    */
    addNode(node) {
        this.nodes.push(node);
    }

    /*
        Remove a node at index i
    */
    removeNode(i) {
        this.nodes.splice(i, 1);
    }
}