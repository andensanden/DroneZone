import { useState } from "react";
import { Logo } from "@/components/logo";
import { supabase } from "@/supabase/config.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [pnummer, setPersonnummer] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUp() {
    //Some basic password validation
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const { error, data } = await supabase.auth.signUp(
      {
        email,
        password,
      },

      //TODO: Send this data to the database instead on profile table
      {
        data: {
          name,
          lastname,
          phone,
          pnummer,
          adress,
          city,
          zip,
        },
      }
    );

    //TODO: Implement error handling and displaying message with help of application state
    if (error) {
      console.error(error);
    }

    //reset the form
    setName("");
    setLastName("");
    setPhone("");
    setPersonnummer("");
    setAdress("");
    setCity("");
    setZip("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    navigate("/home");
    console.log(data);
  }

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
          placeholder="First Name"
          className="mb-4 px-4 py-1 border border-gray-300 w-36 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="name"
          placeholder="Last Name"
          className="mb-4 px-4 py-1 border border-gray-300 w-36 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
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
          type="phone"
          placeholder="Phone Number"
          className="mb-4 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          className="mb-6 px-4 py-1 border border-gray-300 rounded-md w-77 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignUp}
          className=" bg-primary-yellow text-gray-700 rounded-lg ml-2 font-bold text-sm p-2 hover:bg-[#e6b800] w-77 hover:scale-105 transition-all duration-200"
        >
          Create Account
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="underline text-primary-light-blue">
            Sign in here
          </Link>
        </p>

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
