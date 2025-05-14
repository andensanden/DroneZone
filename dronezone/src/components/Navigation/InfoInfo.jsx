import * as React from "react";
import icon from "@/assets/icon.svg";
import { GiPathDistance } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

export function InfolineInfo() {
  return (
    <div className="text-black">
      {/* 🔶 Header */}
      <div className="bg-primary-yellow pl-5 md:text-center py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          How to Navigate the DroneZone
        </h2>
        <h5 className="font-bold text-sm md:text-xl">
          Here is a quick overview of the key features and how to navigate
          around the website
        </h5>
      </div>

      {/* 🧭 Info Sections */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 p-10 justify-center">
        {/* 🔹 Register Section */}
        <div className="flex flex-col md:w-72">
          <h2 className="font-bold text-xl mb-3">Register Your Drone</h2>
          <p className="text-sm mb-2 flex justify-between">
            <> <FaRegUser size={20} /> Click on the button to the top right to register a new user or log in. </>
          </p>
          <p className="text-sm mb-2 flex justify-between">
            <> <FaRegUser size={20} /> Click on "Account" to view your user information and devices. </>
          </p>
          <p className="text-sm mb-2 flex justify-between">
            <> <img
              src={icon}
              alt="Drone icon"
              style={{ width: "22px", height: "22px" }}
            /> Click on the "Add new Drone" button and enter: the device's name and drone ID. </>
          </p>
        </div>

        {/* 🔹 Draw Section */}
        <div className="flex flex-col md:w-72">
          <h2 className="font-bold text-xl mb-3">Draw your flight</h2>
          <p className="text-sm mb-2 flex justify-between">
            <> <GiPathDistance size={30} /> Click the "Your Devices" button in order to select the drone which you will fly. If you have not added it yet, please click " + Add New Device". </>
          </p>
          <p className="text-sm mb-2 flex justify-between">
            Click the "Draw Flight Path" button to begin drawing your flight path. Please "Confirm Flight Path" to lock in your path.
          </p>
          <p className="text-sm mb-2 flex justify-between">
            Finally use the "Launch" at time of takeoff. Enjoy the DroneZone!
          </p>
        </div>

        {/* 🔹 Layers Section */}
        <div className="flex flex-col md:w-72">
          <h2 className="font-bold text-xl mb-3">Map</h2>
          <p className="text-sm mb-2 flex justify-between">
            <> <IoMenu size={40} className="text-primary-yellow" /> You can toggle what you want to display on your map, active drones, restricted zones and your current location. </>
          </p>
          <ul className="list-disc text-sm space-y-1 pl-5">
            <li>Active drones: shows all active drones, click on a drone to select it and display its detailed information and flightpath</li>
            <li>Restricted Zones: shows all of the zones in which you are not allowed to fly</li>
            <li className="relative pr-8">
              Current Location: shows your current location
              <MdMyLocation size={25} className="absolute right-0 top-0" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
