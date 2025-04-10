import { BsPaperclip } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { TbDrone } from "react-icons/tb";
import { supabase } from "@/supabase/config.js";

const backendURL = import.meta.env.VITE_BACKEND_URL;



export function AccountInfo() {
  //TODO: Fetch user data from supabase
  const mockUser = {
    name: "John",
    lastName: "Doe",
    email: "JohnDoe.gmail.com",
    phoneNumber: "0701234566",
    devices: ["drone 1", "drone 2"],
    droneLicense: "droneLicense.pdf",
  };

  const [phone, setPhone] = useState(mockUser.phoneNumber);
  

  //Function to handle the change of phone number
  function handleChangePhone() {
    const phoneInput = document.getElementById("phoneInput");
    phoneInput.disabled = false;
  }

  //Function to get user ID and its data
  async function getUserData(){
    const { data: { user } } = await supabase.auth.getUser();
      
    
    try {
    const response = await fetch(`${backendURL}/api/auth/user/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
      console.log( await response.json())
      
      //Todo: fixa if !repsons.ok statement  
      const data = await response.json()
      console.log("data from backend", data)
   } catch (error) {

   }
  }

  getUserData();

  function handleSavePhone() {
    const phoneInput = document.getElementById("phoneInput");
    phoneInput.disabled = true;

    //TODO: Save the new phone number to the database
  }

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
                value={mockUser.name + " " + mockUser.lastName}
                disabled
              ></input>

              {/*Email presentation*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                value={mockUser.email}
                disabled
              ></input>

              {/*Phone number presentation, is changable*/}
              <input
                className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                disabled
                id="phoneInput"
              ></input>
            </div>
            <div className="flex flex-row items-end my-2 px-4 py-1 gap-3">
              <button>
                {" "}
                <FaPen
                  size={20}
                  className="hover:scale-105 transition-all duration-200 cursor-pointer"
                  onClick={handleChangePhone}
                />
              </button>
              <button>
                {" "}
                <FaSave
                  size={20}
                  className="hover:scale-105 transition-all duration-200 cursor-pointer"
                  onClick={handleSavePhone}
                />
              </button>
            </div>
          </div>
        </div>

        {/*Devices column starts here. använd map funktion för att diplaya all drones */}
        <div className="ml-50 flex flex-col">
          <h2 className="text-3xl font-bold my-4 ">Devices</h2>
          {/*Drone one */}
          <input
            className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
            disabled

            // value={}
          ></input>
          {/*Drone two*/}
          <input
            className="bg-primary-white my-2 px-4 py-1 rounded-md shadow-lg hover:scale-105 transition-all duration-200"
            disabled
            // value={}
          ></input>
          <button className="bg-gray-200 flex flex-row justify-center gap-3 items-center my-2 px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-all duration-200  text-gray-700 font-bold text-sm">
            <p>Add new drone </p>
            <TbDrone size={18} />
          </button>
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
