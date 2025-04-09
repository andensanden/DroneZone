import { MapClick } from './pathDrawing'

function UndoButton() {
    return (
        <div className="undo-button" style={{
            position: 'absolute',
            top: '78%',
            right: '0%',
            zIndex: 1000,
        }}>
            <button
                onClick={() => {() => undo(MapClick.nodes) } }

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
    );
}

function undo(nodes) {
    if (nodes.length === 0) alert("Working");

    nodes[nodes.length - 1].removeNode(nodes.length - 1, setNodes);
}

export default UndoButton