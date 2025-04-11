export function InfolineInfo() {
    return (
      <div className="bg-primary-yellow">
        {/* Yellow Header */}
        <div >
          <div className="flex flex-col max-w-2xl p-10">
            <h2 className="text-3xl font-bold my-4">How to Navigate in DroneZone</h2>
            <h5 className="font-bold whitespace-nowrap ">
              Here is a quick overview of the key features and how to navigate around the website
            </h5>
          </div>
        </div>
  
        <div >
          <div className="flex flex-row gap-12 mb-10 w-full">
            {/* Register */}
            <div className="flex flex-col ml-10 w-70">
              <h2 className="font-bold text-xl ">Register Your Drone</h2>
              <p className="text-sm ">
                You can register your drone under My Account or in Your Devices on the homepage.
                Additionally, you can upload your Drone License on your Account page.
              </p>
            </div>

            {/* Draw */}
            <div className="flex flex-col w-70 ">
              <h2 className="font-bold text-xl">Draw Your Path</h2>
              <p className="text-sm ">
                Plan your flight path by placing nodes on the map.
                Use the Undo button to remove the last node if needed.
                Once you're finished, confirm the flight path to save it.
              </p>
            </div>

            {/* Choose layers */}
            <div className="flex flex-col w-70">
              <h2 className="font-bold text-xl ">Choose Your Layers</h2>
              <p className="text-sm  mb-2">
                Customize your map view using <span className="font-semibold italic">map layers</span>:
              </p>
              <ul className="list-disc text-sm space-y-1">
                <li className="pl-2">
                  Show nearby <span className="font-semibold">active drones</span>
                </li>
                <li className="pl-2">
                  Highlight <span className="font-semibold">restricted zones</span> where flying isn’t allowed
                </li>
                <li className="pl-2">
                  Display your <span className="font-semibold">current location</span> This is also toggleable in the top left corner.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  