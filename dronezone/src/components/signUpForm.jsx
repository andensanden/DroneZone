import { useState } from "react";
import { Logo } from "@/components/logo";
import { supabase } from "@/supabase/config.js";
import { useDispatch} from "react-redux";


export function SignUpForm() {
  const [name, setName] = useState("");
  const [pnummer, setPersonnummer] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  async function handleSignUp() {

      const {error, data} = await supabase.auth.signUp({
        email,
        password,
      }, {
      data: {
        name,
        pnummer,
        adress,
        city,
        zip,
      },
    });

    if (error) {
      console.error(error);
    }

    
    //TODO: Implement redirect to login
    //TODO: Implement error handling and displaying message with help of application state

  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex flex-col items-center">
        <div className="w-50 h-50 flex items-center justify-center [&>svg]:w-30 [&>svg]:h-30">
          <Logo />
        </div>

        <div className="flex items-center w-full my-5">
          <div className="flex-grow border-t border-yellow-300"></div>
          <span className="mx-4 text-yellow-500 font-semibold text-lg whitespace-nowrap">
            CREATE NEW ACCOUNT
          </span>
          <div className="flex-grow border-t border-yellow-300"></div>
        </div>

        <input
          type="name"
          placeholder="Full Name"
          className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex space-x-4 mb-1">
          <input
            type="pnummer"
            placeholder="SSN "
            className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
            value={pnummer}
            onChange={(e) => setPersonnummer(e.target.value)}
          />
          <input
            type="adress"
            placeholder="Address "
            className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="city"
            placeholder="City"
            className="px-4 py-1 border border-gray-300 rounded-md w-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="zip"
            placeholder="Zip Code"
            className="px-4 py-1 border border-gray-300 rounded-md w-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="mb-10 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignUp}
          className="mb-10 bg-primary-yellow text-gray-700 rounded-lg ml-2 font-bold text-sm p-2 hover:bg-[#e6b800] w-77 hover:scale-105 transition-all duration-200"
        >
          Create Account
        </button>

        <button
          className=" bg-[#FFFFFF] text-white rounded-lg ml-2 font-bold text-sm p-2 hover:bg-[#ff0000] w-32 hover:scale-105 transition-all duration-200"
          onClick={() => (window.location.href = "/IMG_1262.jpg")}
        >
          Jump Scare
        </button>
      </div>
    </div>
  );
}
