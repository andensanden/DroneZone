import { useNodes } from "./nodesContext";

function UndoButton() {
    const { nodes, setNodes } = useNodes();

    const isDisabled = nodes.length === 0;
    
    return (
        
            <button
                onClick={() => Undo(nodes, setNodes) }

                style={{
                    //padding: '8px 0px',
                    backgroundColor: 'white',
                    color: 'red',
                    border: 'none',
                    //borderRadius: '4px 0 0 4px',
                    cursor: 'pointer',
                    //boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                }}

            >
                Undo
            </button>
        
    )
}

function Undo(nodes, setNodes) {
    if (nodes.length === 0) return;
    nodes[nodes.length - 1].removeNode(setNodes);
}

export default UndoButton;