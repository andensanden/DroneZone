import { useState } from "react";
import { Logo } from "@/componets/logo";

export function LoginInfo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // You can replace this with actual logic (like API call)
    console.log("Logging in with:", email, password);
  };

  return (
    
    <div className="w-screen h-screen flex items-center justify-center">
        
      <div className="flex flex-col items-center mt-24">
        <div className="w-60 h-60 flex items-center justify-center [&>svg]:w-30 [&>svg]:h-30">
          <Logo /></div>
        

        <input
          type="email"
          placeholder="Email"
          className="mb-6 px-4 py-1 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-yellow-400 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 px-4 py-1 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="mb-22 bg-[#FFCC00] text-gray-700 rounded-lg ml-2 font-bold text-sm p-2 hover:bg-[#e6b800] w-42"
        >
          Sign In
        </button>
        
        <button
          className="mb-64 bg-[#FFCC00] text-gray-700 rounded-lg ml-2 font-bold text-sm p-2 hover:bg-[#e6b800] w-72"
          onClick={() => navigate("/")}
        >
          Create Account
        </button>
      
      </div>
    </div>
  );
}



