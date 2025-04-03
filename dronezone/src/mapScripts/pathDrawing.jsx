import { useEffect, useState } from 'react'
import { useMap, Circle } from 'react-leaflet'

const nodeRadius = 20;

/*
    Handles what happens when the user clicks on the map
*/
function MapClick() {
    const map = useMap()
    const [nodes, setNodes] = useState([])

    const onMapClick = (e) => {
        AddNode(e, setNodes)
    }

    useEffect(() => {
        map.on('click', onMapClick) 

        return () => {
            map.off('click', onMapClick)
        }
    }, [map])

    return DrawNodes(nodes)
}

/*
    Add a new node to the array of nodes
*/
function AddNode(e, setNodes) {
    const newNode = {
        position: e.latlng,
        radius: nodeRadius,
    }
    setNodes((prevNodes) => [...prevNodes, newNode])
}

/*
    Draws the existing nodes on the map
*/
function DrawNodes(nodes) {
    return (
        <>
            {nodes.map((node, index) => { return(
                <Circle 
                key={index} center={node.position} radius={node.radius}
                color="blue" fillColor="blue" fillOpacity={0.5}>
                </Circle>)
            })}
        </>
    )
}

function DrawPath(nodes) {
    
}

export default MapClick