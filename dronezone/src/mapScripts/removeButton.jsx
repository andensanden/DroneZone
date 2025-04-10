function RemoveButton({ drawingMode, setDrawingMode }) {
    return (
        <div className="remove-button" style={{
            position: 'absolute',
            top: '68%',
            right: '0%',
            zIndex: 1000,
        }}>
            <button
                onClick={() => undo(nodes, setNodes, paths, setPaths, bufferZones, setBufferZones, doNotDraw) }

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
                Remove Node
            </button>
        </div>
    )
}

export default RemoveButton;