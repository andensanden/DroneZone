
/**
 * Class representing a drone path made up of nodes.
 */
export class Dronepath {
    nodes = [];

   /**
   * Creates a new Dronepath instance.
   * @param {string} owner - Identifier for who created this path.
   */
    constructor(owner) {
        this.owner = owner;
    }
    
   /**
   * Adds a node to the drone path.
   * @param {Node} node - The node to add.
   */
    addNode(node) {
        this.nodes.push(node);
    }

    /**
    * Removes a node from the path by its index.
    * @param {number} index - The index of the node to remove.
    */
    removeNode(index) {
        this.nodes.splice(index, 1);
    }

   /**
   * Converts the Dronepath into a JSON object.
   * @returns {{ nodes: Object[] }} An object representation of the drone path.
   */
    toJSON() {
        return {
            nodes: this.nodes.map(node => node.toJSON())
        }
    }
}