function LaunchButton() {
    return (
        <div className="launch-button" style={{
            position: 'absolute',
            top: '85%',
            right: '50%',
            zIndex: 1000,
          }}>
            <button 
              onClick={Launch()}
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

function Launch() {

}

export default LaunchButton;