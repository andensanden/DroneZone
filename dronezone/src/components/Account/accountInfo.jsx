import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Button  } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbDrone } from "react-icons/tb";
import { FaPen, FaSave} from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/config";
import { useDispatch, useSelector } from "react-redux";
import { setAllDrones } from "@/Redux/gpsPos/gpsPosSlice";
import { toast } from "react-toastify";


const backendURL = import.meta.env.VITE_BACKEND_URL;

export function AccountInfo() {

  //States used for adding a device
  const [deviceName, setDeviceName] = useState("");
  const [deviceID, setDeviceID] = useState("");


  const dispatch = useDispatch();
  const { firstname, lastname, phone, email, userID } = useSelector((state) => state.auth);
  const { allDrones } = useSelector((state) => state.gpsPos);


  //Add a drone function
  async function addDevice() {

    if (!deviceName || !deviceID) {
      toast.error("Please fill in all fields")
      return;
    }
  
    //Setting device state so UI is updated immediately when adding drone
    dispatch(setAllDrones([...allDrones, { deviceName, deviceID }]))

    await fetch(`${backendURL}/api/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        user_id: userID,
        deviceName,
        deviceID,
      }),
    });

    toast.success("Device added successfully")
    
    setDeviceID("")
    setDeviceName("")
  }

  //Remove a drone device function 
  async function removeDevice(deviceID) {

    const response = await fetch(`${backendURL}/api/device/${deviceID}`, {
      method: "DELETE",
    });

    //TODO: Error checking for response
    if (!response.ok) {
      toast.error("Failed to remove device")
      return;
    }

    toast.success("Device removed successfully")
    dispatch(setAllDrones(allDrones.filter((device) => device.deviceID !== deviceID))) //deviceID is the id of the drone we want to remove
  }
    
  //TODO: User most be able to change their phone 
 
  return (
    <div className="bg-primary-yellow flex grow ">
      <div className="flex flex-col md:flex-row p-10 w-full">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold my-4">My Account</h2>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              {/*Name presentation*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value={`${firstname || ""} ${lastname || ""}`}
              ></input>

              {/*Email presentation*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value={email || ""}
              ></input>

              {/*Phone number presentation, is changable*/}
              <input
                disabled
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                value={phone || ""}
                id="phoneInput"
              ></input>
            </div>
            <div className="flex flex-row items-end my-2 px-4 py-1 gap-3">
              <button>
                {" "}
                <FaPen
                  size={20}
                  className="hover:scale-105 transition-all duration-200 cursor-pointer"
                />
              </button>
              <button>
                {" "}
                <FaSave
                  size={20}
                  className="hover:scale-105 transition-all duration-200 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>

        {/*Devices column starts here. använd map funktion för att diplaya all drones */}
        <div className="md:ml-50 flex flex-col">
          <h2 className="text-3xl font-bold my-4 ">Devices</h2>
          {allDrones.map((device)=> {
           return( 
            <div className="flex flex-row items-center md:justify-center gap-2" key={device.deviceID}>
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value = {device.deviceName}
              />
              <Button onClick={() => removeDevice(device.deviceID)} size="sm" className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-200 text-black" > <FaTrashCan size={15} /></Button>
            </div>
          )}
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-gray-200 flex flex-row justify-center w-3/8 md:w-full gap-3 items-center my-2 px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-all duration-200  text-gray-700 font-bold text-sm">
              <p>Add new drone </p>
              <TbDrone size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Input value={deviceName} placeholder="Name" className="mb-2" onChange={(e) => setDeviceName(e.target.value)} />
              <Input value={deviceID} placeholder="Drone ID" className="mb-2" onChange={(e) => setDeviceID(e.target.value)} />
              <Button onClick={addDevice} className="block w-full">Add</Button>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
