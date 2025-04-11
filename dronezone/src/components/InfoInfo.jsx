export function InfolineInfo() {
    return (
      <div>
        {/* Yellow Header */}
        <div className="bg-primary-yellow flex items-center justify-center">
          <div className="flex flex-col max-w-2xl text-center p-10">
            <h2 className="text-3xl font-bold my-4">How to Navigate in DroneZone</h2>
            <h5 className="font-bold whitespace-nowrap">
              Here is a quick overview of the key features and how to navigate around the website
            </h5>
          </div>
        </div>
  
        <div className="bg-white flex justify-center">
  <div className="flex flex-row justify-between gap-12 p-16 max-w-screen-xl w-full">
    {/* Register */}
    <div className="flex flex-col max-w-xs">
      <h2 className="font-bold text-xl whitespace-nowrap">Register Your Drone</h2>
      <p className="text-sm text-gray-500">
        You can register your drone under My Account or in Your Devices on the homepage.
        Additionally, you can upload your Drone License on your Account page.
      </p>
    </div>

    {/* Draw */}
    <div className="flex flex-col max-w-xs">
      <h2 className="font-bold text-xl">Draw Your Path</h2>
      <p className="text-sm text-gray-500">
        Plan your flight path by placing nodes on the map.
        Use the Undo button to remove the last node if needed.
        Once you're finished, confirm the flight path to save it.
      </p>
    </div>

    {/* Choose layers */}
    <div className="flex flex-col max-w-xs">
      <h2 className="font-bold text-xl whitespace-nowrap">Choose Your Layers</h2>
      <p className="text-sm text-gray-500 mb-2">
        Customize your map view using the <span className="font-semibold">Layers</span> option:
      </p>
      <ul className="list-disc text-sm text-gray-500 space-y-1">
  <li className="pl-2">
    Show nearby <span className="font-semibold">active drones</span>
  </li>
  <li className="pl-2">
    Highlight <span className="font-semibold">restricted zones</span> where flying isn’t allowed
  </li>
  <li className="pl-2">
    Display your <span className="font-semibold">current location</span> (you can also set this using the button in the upper-left corner)
  </li>
</ul>
    </div>
  </div>
</div>
</div>
    );
  }
  
  