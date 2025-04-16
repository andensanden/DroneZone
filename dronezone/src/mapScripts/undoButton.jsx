import { useNodes } from "./nodesContext";

function UndoButton() {
    const { nodes, setNodes } = useNodes();
    
    return (
        <div className="undo-button" style={{
            position: 'absolute',
            top: '68%',
            right: '0%',
            zIndex: 1000,
        }}>
            <button
                onClick={() => Undo(nodes, setNodes) }

                style={{
                    padding: '8px 16px',
                    backgroundColor: 'grey',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px 0 0 4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                }}

            >
                Undo
            </button>
        </div>
    )
}

function Undo(nodes, setNodes) {
    if (nodes.length === 0) return;
    nodes[nodes.length - 1].removeNode(setNodes);
}

export default UndoButton;