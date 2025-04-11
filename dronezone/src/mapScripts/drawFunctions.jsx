import { Circle, Polyline, Polygon } from 'react-leaflet'

/*
    Draws the existing nodes on the map
*/
function DrawNodes({nodes, color}) {
    return (
        <>
            {nodes.map((node, index) => { if (node.visible) return(
                <Circle className = "map-clickable"
                key={index} center={node.position} radius={node.radius}
                color={color} fillColor={color} fillOpacity={0.5}/>
                )
            })}
        </>
    )
}

/*{nodes.map((node, index) => { if (node.visible) return(
    <Circle className = "map-clickable"
    key={node.id} center={node.position} radius={node.radius}
    color={color} fillColor={color} fillOpacity={0.5}/>
    )
})}*/

/*
    Draws the existing paths on the map
*/
function DrawPaths({paths}) {
    return (
        <>
            {paths.map((path, index) => { return(
                <Polyline className = "map-clickable"
                key={index} positions={path}
                color="blue" weight={1}/>
                )
            })}
        </>
    )
}

/*
    Draws the existing buffer zones on the map
*/
function DrawBufferZones({bufferZones}) {
    return (
        <>
            {bufferZones.map((zone, index) => { return(
                <Polygon className = "map-clickable"
                key={index} positions={zone}
                color="blue" fillOpacity={0.3} weight={1}/>
                )
            })}
        </>
    )
}

export { DrawNodes, DrawPaths, DrawBufferZones }