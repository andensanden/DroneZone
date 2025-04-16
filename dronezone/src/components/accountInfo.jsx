import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Button  } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbDrone } from "react-icons/tb";
import { BsPaperclip } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Redux/auth/authSlice";


const backendURL = import.meta.env.VITE_BACKEND_URL;

export function AccountInfo() {

  const [deviceName, setDeviceName] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [devices, setDevices] = useState([]);


//! Account info fetch from backend
  const dispatch = useDispatch();
  const { firstname, lastname, phone, email } = useSelector((state) => state.auth);

  useEffect(() => { 
    const fetchData = async() => {

    const { data, error } = await supabase.auth.getUser();

    const respone = await fetch(`${backendURL}/api/auth/user/${data.user.id}`); //Fetching user data
    const deviceRespone = await fetch(`${backendURL}/api/device/${data.user.id}`); //Fetching device data

    const parsedData = await respone.json();
    console.log(parsedData);
    const parsedDeviceData = await deviceRespone.json()
    
    setDevices(parsedDeviceData)

    dispatch(setUser(parsedData));
  }

  fetchData();
  }, []);


  //Add a drone device function
  async function addDevice() {

    //Setting device state so UI is updated immediately when adding drone
    setDevices([...devices, { deviceName, deviceID }])

    const { data } = await supabase.auth.getUser();

    await fetch(`${backendURL}/api/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        user_id: data.user.id,
        deviceName,
        deviceID,
      }),
    });

    setDeviceID("")
    setDeviceName("")
  }

  //Remove a drone device function 
  async function removeDevice(deviceID) {

    const response = await fetch(`${backendURL}/api/device/${deviceID}`, {
      method: "DELETE",
    });

    //TODO: Error checking for response
  }
    
  //TODO: User should be able to change their phone number 
 
  return (
    <div className="bg-primary-yellow flex grow ">
      <div className="flex p-10 w-full">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold my-4">My Account</h2>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              {/*Name presentation*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value={`${firstname} ${lastname}`}
              ></input>

              {/*Email presentation*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value={email}
              ></input>

              {/*Phone number presentation, is changable*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                value={phone}
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
        <div className="ml-50 flex flex-col">
          <h2 className="text-3xl font-bold my-4 ">Devices</h2>
          {devices.map((device)=> {
           return( 
            <div className="flex flex-row items-center justify-center gap-2" key={device.deviceTableID}>
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                disabled
                value = {device.deviceName}
              />
              <Button onClick={() => removeDevice(device.deviceTableID)} size="sm" className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-200" >X</Button>
            </div>
          )}
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-gray-200 flex flex-row justify-center gap-3 items-center my-2 px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-all duration-200  text-gray-700 font-bold text-sm">
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

        {/*Licence column ends here */}
        <div className="ml-50 flex flex-col">
          <h2 className="text-3xl font-bold my-4">Drone Licence</h2>
          <div className="flex flex-row gap-3">
            <label className="flex item-center bg-primary-white w-11 h-11 text-gray-700 my-2 px-2 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200">
              <input
                class="hidden"
                type="file"
                id="fileUpload"
                accept=".pdf, .png"
              ></input>
              <BsPaperclip size={40} />
            </label>
            <div className="flex flex-col justify-center items-center">
              <a href="/map.png" download>
                droneLicence.pdf
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
