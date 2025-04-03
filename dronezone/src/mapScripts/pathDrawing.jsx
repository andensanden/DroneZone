import { useEffect, useState } from 'react'
import { useMap, Circle, Polyline } from 'react-leaflet'

const nodeRadius = 20;

/*
    Handles what happens when the user clicks on the map
*/
function MapClick() {
    const map = useMap()
    const [nodes, setNodes] = useState([])
    const [paths, setPaths] = useState([])

    const onMapClick = (e) => {
        AddNode(e, setNodes)
    }

    // Update paths whenever nodes is updated
    useEffect(() => {
        if (nodes.length > 1) {
            AddPath(nodes[nodes.length-2], nodes[nodes.length-1], setPaths)
        }
    }, [nodes])

    useEffect(() => {
        map.on('click', onMapClick) 

        return () => {
            map.off('click', onMapClick)
        }
    }, [map])

    return (
        <>
            <DrawNodes nodes={nodes}/>
            <DrawPaths paths={paths}/>
        </>
    )
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
function DrawNodes({nodes}) {
    return (
        <>
            {nodes.map((node, index) => { return(
                <Circle 
                key={index} center={node.position} radius={node.radius}
                color="blue" fillColor="blue" fillOpacity={0.5}/>
                )
            })}
        </>
    )
}

/*
    Add a new path to the array of paths
*/
function AddPath(startNode, endNode, setPaths) {
    const newPath = [startNode.position, endNode.position]
    setPaths((prevPaths) => [...prevPaths, newPath])
}

/*
    Draws the existing paths on the map
*/
function DrawPaths({paths}) {
    return (
        <>
            {paths.map((path, index) => { return(
                <Polyline 
                key={index} positions={path}
                color="blue" weight={1}/>
                )
            })}
        </>
    )
}

export default MapClick