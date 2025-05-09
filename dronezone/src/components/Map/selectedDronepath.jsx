import { DrawNodes, DrawPaths, DrawBufferZones } from "@/mapScripts/drawFunctions";
import { GiConsoleController } from "react-icons/gi";

export function SelectedDronepath({ selectedDrone, hoveredDrone }) {
    let drone;
    if (selectedDrone) {
        drone = selectedDrone;
    }
    else if (hoveredDrone) {
        drone = hoveredDrone;
    }
    else {
        return;
    }

    return (
        <>
            <DrawDronepath dronepath={drone.activePath} color={"green"}/>
        </>
    );

    /**
     * Draws a dronepath on the map.
     */
    function DrawDronepath({ dronepath, color }) {
        return (
            <>
                <DrawNodes nodes={dronepath.nodes} color={color}/>
                <DrawPaths paths={dronepath.paths} color={color}/>
                <DrawBufferZones bufferZones={dronepath.bufferZones} color={color}/>
            </>
        )
    }
}