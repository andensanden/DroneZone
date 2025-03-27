import { FaUser } from "react-icons/fa";

export function Header() {
  return (
    <div className="bg-white h-25 flex items-center justify-between " >
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-gray-700 ml-8">Drone<span className="text-yellow-500">Zone</span></h1>
      <p className="text-gray-400 ml-8 text-sm">Real time map of all registered active drones, provided by DroneZone</p>
      </div>
      <div className="flex items-center mr-8 h-12 bg-gray-200 rounded-2xl">
        <button className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2">Login</button>
        <button className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2">About Us</button>
        <button className="text-gray-700 bg-amber-400 h-12 rounded-2xl ml-2 font-bold p-2 text-sm">Contact</button>
      </div>
    </div>
  )         
}