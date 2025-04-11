// Drawing Mode Control
const DrawingModeControl = ({ drawingMode, setDrawingMode }) => {
    return (
      <div className="drawing-mode-control" style={{
        position: 'absolute',
        top: '85%',
        right: '0%',
        zIndex: 1000,
      }}>
        <button 
          onClick={() => setDrawingMode('path')}
          style={{
            padding: '8px 16px',
            backgroundColor: drawingMode === 'path' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        >
          Draw Path
        </button>
        <button 
          onClick={() => setDrawingMode('forbidden')}
          style={{
            padding: '8px 16px',
            backgroundColor: drawingMode === 'forbidden' ? '#f44336' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        >
          Draw Forbidden Zone
        </button>
            <button
                onClick={() => setDrawingMode('remove')}
                style={{
                    padding: '8px 16px',
                    backgroundColor: drawingMode === 'remove' ? '#f44336' : '#ccc',
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
    );
};

export default DrawingModeControl;