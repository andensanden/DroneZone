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
          How to Navigate in DroneZone
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
          <h2 className="font-bold text-xl mb-3">Register your drone</h2>
          <p className="text-sm mb-2 flex justify-between">
            Can be done under My Account <FaRegUser size={20} />
          </p>
          <p className="text-sm mb-2 flex justify-between">
            And also in Your Devices on the homepage{" "}
            <img
              src={icon}
              alt="Drone icon"
              style={{ width: "22px", height: "22px" }}
            />
          </p>
        </div>

        {/* 🔹 Draw Section */}
        <div className="flex flex-col md:w-72">
          <h2 className="font-bold text-xl mb-3">Draw your flight</h2>
          <p className="text-sm mb-2 flex justify-between">
            Draw your planned flight path with nodes{" "}
            <GiPathDistance size={30} />
          </p>
          <p className="text-sm mb-2 flex justify-between">
            Use the Undo button to remove the last node you placed
          </p>
          <p className="text-sm mb-2 flex justify-between">
            Confirm the flight path when you are done
          </p>
        </div>

        {/* 🔹 Layers Section */}
        <div className="flex flex-col md:w-72">
          <h2 className="font-bold text-xl mb-3">Choose your layers</h2>
          <p className="text-sm mb-2 flex justify-between">
            You can choose what you want to be displayed on your map with Layers{" "}
            <IoMenu size={40} className="text-primary-yellow" />
          </p>
          <ul className="list-disc text-sm space-y-1 pl-5">
            <li>Active Drones that are near</li>
            <li>Restricted Zones where you can’t fly</li>
            <li className="relative pr-8">
              Current Location: your own coordinates, toggleable in the upper
              left
              <MdMyLocation size={25} className="absolute right-0 top-0" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
