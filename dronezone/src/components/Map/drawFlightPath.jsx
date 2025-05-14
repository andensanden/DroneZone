import { GiPathDistance } from "react-icons/gi";
import { useNodes } from "@/mapScripts/nodesContext";
import { useEffect } from "react";
import UndoButton from "@/mapScripts/undoButton";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { GoQuestion } from "react-icons/go";

export function DrawFlightPathMenu({
  flightPathMenuOpen,
  onToggleMenu,
  setFlightPathMenuOpen,
  setDevicesMenuOpen,
  confirmFlightPath,
  setConfirmFlightPath,
  setDrawingMode,
  bottom,
  showDashboard
}) {

  const { undoLastNode, nodes, clearNodes } = useNodes();
  const map = useMap();
  const { position, currentDeviceID } = useSelector((state) => state.gpsPos); // Should be [lat, lng]
  const navigate = useNavigate();

  // Hanterar ritläge beroende på meny- och bekräftelsestatus
  useEffect(() => {
    if (showDashboard) {
      setDrawingMode(null); // ✅ Disable drawing completely during flight or dashboard
      return;
    }

    if (!flightPathMenuOpen && !confirmFlightPath) {
      setDrawingMode(null);
    } else if (flightPathMenuOpen && !confirmFlightPath) {
      setDrawingMode("path");
    } else if (flightPathMenuOpen && confirmFlightPath) {
      setDrawingMode(null);
    }
  }, [flightPathMenuOpen, confirmFlightPath, setDrawingMode, showDashboard]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: `${bottom}px`,
        left: "12px",
        zIndex: 1000,
        transition: "bottom 0.5s ease",
      }}
    >
      {/* Huvudknapp för att toggla ritmenyn */}
      <button
        onClick={() => {
          const nextState = !flightPathMenuOpen;

          onToggleMenu(); // Toggle meny
          setFlightPathMenuOpen(nextState);
          setDevicesMenuOpen(false); // Stänger en eventuell annan meny

          // Zoomar in på användarens position om kartan är för utzoomad
          if (
            nextState &&
            map &&
            Array.isArray(position) &&
            typeof position[0] === "number" &&
            typeof position[1] === "number" &&
            map.getZoom() < 14
          ) {
            map.flyTo(position, 14); // Zooma in till nivå 14
          }
        }}
        className="bg-primary-yellow py-[10px] px-[16px] rounded-xl cursor-default font-bold text-sm flex items-center gap-[30px] shadow-sm
                    hover:scale-107 transition-all duration-200"
      >
        <span className="hidden md:block">Draw Flight Path</span>
        <GiPathDistance size={24} />
      </button>

      {/* Undermenyn – visas endast om menyn är öppen */}
      {flightPathMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "0",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            width: "220px",
            overflow: "hidden",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ padding: "12px 16px" }}>
            {/* Bekräfta flygväg */}
            <div
              onClick={() => handleConfirmFlightPath()}
              style={{
                padding: "8px 0px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px", // Space between icon and text
                //borderBottom: "1px solid #ddd",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#FFFFFF", // Always white
                borderRadius: "8px",
                cursor: "pointer",
                color: confirmFlightPath ? "#333333" : "#333333",
                transition: "color 0.2s ease",
              }}
            >
              <span>{confirmFlightPath ? "Edit Flight Path" : "Confirm Flight Path"}</span>
              {confirmFlightPath ? (
                <IoLockClosedOutline size={16} />
              ) : (
                <IoLockOpenOutline size={16} />
              )}
            </div>
            {/* Ångra senaste nod */}
            <div
              onClick={undoLastNode} // Step 3 ✅
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                margin: "12px 0",
                cursor: nodes.length > 0 ? "pointer" : "not-allowed",
              }}
            >
              <UndoButton />
            </div>

            {/* Rensa alla noder */}
            <div
              onClick={clearNodes}
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "14px",
                margin: "12px 0",
                cursor: "pointer",
              }}
            >
              Clear Selection
              {/*Adding info questionmark link */}
              <span>
                <button className=" p-3 rounded-xl">
                  <GoQuestion
                    size={25}
                    className="text-gray-700  hover:scale-107 transition-all duration-200"
                    onClick={() => navigate("/info")}
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  //Logic for handling and confirming flight
  function handleConfirmFlightPath() {
    if (!currentDeviceID) {
      toast.error("Please select a device");
      return;
    }
    setConfirmFlightPath(!confirmFlightPath);
  }
}




 

