import { Circle, Polyline, Polygon } from 'react-leaflet'

/*
    Draws the existing nodes on the map.
*/

/**
 * Renders nodes on the map using blue circles.
 * @param {{ nodes: Node[], color: string }} props - Props for the component.
 * @param {Node[]} props.nodes - An array of Node class instances to be drawn.
 * @param {string} props.color - The color to use for the circles' outline and fill.
 * @returns {JSX.Element} A fragment containing all visible node circles.
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

/*
    Draws the existing paths on the map
*/

/**
 * Renders path lines on the map using blue polyline.
 * @param {{ paths: Dronepath[] }} props - Component props
 * @param {Dronepath[]} props.paths - An array where each element is a path made of [lat, lng] coordinate pairs
 * @returns {JSX.Element} A fragment containing all the path polylines
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

/**
 * Renders buffer zone on the map using blue polygons.
 * @param {{ bufferZones: Array<Array<[number, number]>> }} props - Component props
 * @param {Array<Array<[number, number]>>} props.bufferZones - An array of coordinate arrays representing buffer zones
 * @returns {JSX.Element} A fragment containing all buffer zone polygons
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