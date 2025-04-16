import { TbHomeSignal } from "react-icons/tb";

const defaultRadius = 20;

/**
 * Represents a map node used in drone path planning.
 */
export class Node {
  /**
   * Creates a new Node instance.
   * @param {{ lat: number, lng: number }} position - The position of the node on the map.
   * @param {number} [radius=20] - Optional radius of the node.
   */
  constructor(position, radius) {
   
    this.position = position;
    this.radius = radius ? radius : defaultRadius;
    this.visible = true;
  }

  /**
   * Adds this node to a list of nodes.
   * @param {Function} setNodes - A React state setter function for the nodes array.
   */
  addNode(setNodes) {
    setNodes((prevNodes) => [...prevNodes, this]);
  }

  /**
   * Removes this node from a list of nodes.
   * @param {Function} setNodes - A React state setter function for the nodes array.
   */
  removeNode(setNodes) {
    setNodes((prevNodes) => prevNodes.filter((node) => node !== this));
  }

  /**
   * Checks if this node overlaps with any other node in the given list.
   * @param {Node[]} nodes - An array of Node instances to check against.
   * @returns {Node|undefined} The overlapping node if found, otherwise undefined.
   */
  overlapNode(nodes) {
    if (nodes.length === 0) return;
    for (let i = 0; i < nodes.length; i++) {
      const dist = this.position.distanceTo(nodes[i].position);
      if (dist === 0) continue;
      if (dist <= this.radius * 2) {
        return nodes[i];
      }
    }
  }

  /**
   * Converts the Node instance into a plain JSON object.
   * @returns {{ position: { lat: number, lng: number }, visible: boolean }}
   */
  toJSON() {
    return {
      position: {
        lat: this.position.lat,
        lng: this.position.lng
      },
      visible: this.visible
    };
  }
}
