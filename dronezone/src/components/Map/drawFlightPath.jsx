import { GiPathDistance } from "react-icons/gi";
import { useNodes } from "@/mapScripts/nodesContext";
import { useEffect } from "react";
import UndoButton from "@/mapScripts/undoButton";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

//Adding info question mark to the devices menu
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
}) {
  const { undoLastNode, nodes, clearNodes } = useNodes();
  const map = useMap();
  const { position } = useSelector((state) => state.gpsPos); // Should be [lat, lng]
  const navigate = useNavigate();


  // Hanterar ritläge beroende på meny- och bekräftelsestatus
  useEffect(() => {
    if (!flightPathMenuOpen && !confirmFlightPath) {
      setDrawingMode(null); // B3 = 0, Rensar ritläge
    } else if (flightPathMenuOpen && !confirmFlightPath) {
      setDrawingMode("path"); // B3 = 1, Aktiverar ritläge
    } else if (flightPathMenuOpen && confirmFlightPath) {
      setDrawingMode(null); // B3 = 0, Slår av ritläge när flygväg är bekräftad
    }
  }, [flightPathMenuOpen, confirmFlightPath, setDrawingMode]);

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
              style={{
                padding: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <span>Confirm Flight Path</span>
              <input
                type="checkbox"
                checked={confirmFlightPath}
                onChange={() => {
                  setConfirmFlightPath(!confirmFlightPath);
                }}
                style={{
                  width: "16px",
                  height: "16px",
                  accentColor: "#FFD700",
                }}
              />
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
              {" "}
              </button>
            </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
