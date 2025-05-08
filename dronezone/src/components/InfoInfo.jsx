export function InfolineInfo() {
  return (
    <div >
      {/* 🔶 Full-width Yellow Header */}
      <div className="bg-primary-yellow pl-5  md:text-center py-17">
        <h2 className=" text-2xl md:text-3xl font-bold mb-4">How to Navigate in DroneZone</h2>
        <h5 className="font-bold text-sm md:text-xl">
          Here is a quick overview of the key features and how to navigate around the website
        </h5>
      </div>

      {/* 🧭 Info Content (centered) */}
      <div >
        <div className="flex flex-col md:flex-row gap-10 md:gap-25 p-10  justify-center">
          {/* Register */}
          <div className="flex flex-col md:w-72">
            <h2 className="font-bold text-xl">Register Your Drone</h2>
            <p className="text-sm">
              You can register your drone under My Account or in Your Devices on the homepage.
              Additionally, you can upload your Drone License on your Account page.
            </p>
          </div>

          {/* Draw */}
          <div className="flex flex-col w-72">
            <h2 className="font-bold text-xl">Draw Your Path</h2>
            <p className="text-sm">
              Plan your flight path by placing nodes on the map.
              Use the Undo button to remove the last node if needed.
              Once you're finished, confirm the flight path to save it.
            </p>
          </div>

          {/* Layers */}
          <div className="flex flex-col w-72">
            <h2 className="font-bold text-xl">Choose Your Layers</h2>
            <p className="text-sm mb-2">
              Customize your map view using <span className="font-semibold italic">map layers</span>:
            </p>
            <ul className="list-disc text-sm space-y-1 pl-5">
              <li>Show nearby <span className="font-semibold">active drones</span></li>
              <li>Highlight <span className="font-semibold">restricted zones</span> where flying isn’t allowed</li>
              <li>Display your <span className="font-semibold">current location</span>. This is also toggleable in the top left corner.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


  
  