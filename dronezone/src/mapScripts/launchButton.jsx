import path from "path";
import { Dronepath } from "./dronepath";
import { useNodes } from "./nodesContext";
import { Node } from "./node";

function LaunchButton({ setDrawingMode }) {
  const { nodes } = useNodes();

  return (
      <div className="launch-button" style={{
          position: 'absolute',
          top: '85%',
          right: '50%',
          zIndex: 1000,
        }}>
          <button 
            onClick={() => Launch(nodes, setDrawingMode)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            }}
          >
            Launch
          </button>
      </div>
  )
}

function Launch(nodes, setDrawingMode) {
    const dronepath = new Dronepath(1);
    for (var i = 0; i < nodes.length; i++) {
      dronepath.addNode(nodes[i]);
    }
    setDrawingMode('launched');
    const pathJSON = createPathJSON(dronepath);
}

function createPathJSON(dronepath) {
  return JSON.stringify(dronepath);
}

function createDronepathFromJSON(pathJSON) {
  const data = JSON.parse(pathJSON);

  const dronepath = new Dronepath(1);

  data.nodes.forEach(nodeData => {
    const position = L.latLng(nodeData.position.lat, nodeData.position.lng);
    const node = new Node(position);
    node.visible = nodeData.visible;
    dronepath.addNode(node);
  });

  return dronepath;
}

export default LaunchButton;