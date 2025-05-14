import { DrawDronepath } from "@/mapScripts/drawFunctions";
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
}