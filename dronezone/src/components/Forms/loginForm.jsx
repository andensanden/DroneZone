import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { supabase } from "@/supabase/config.js";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { login } from "@/Redux/auth/authSlice";
import { toast } from "react-toastify";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: user } = await supabase.auth.getUser();

    console.log("user id: ", user);

    console.log("User data fetched from DB: ", user);

    dispatch(login({email: data.user.email, userID: data.user.id}));
    toast.success("You have been logged in");
    navigate("/");
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-15">
        <div className=" flex flex-col  rounded-xl p-10 items-center justify-center ">
          <div className="w-60 h-60 flex items-center justify-center [&>svg]:w-30 [&>svg]:h-30">
            <Logo />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="mb-6 px-4 py-1 border border-gray-300 rounded-md w-72 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="mb-6 px-4 py-1 border border-gray-300 rounded-md w-72 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-xl hover:scale-105 transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className=" bg-primary-yellow text-gray-700 rounded-md w-72 ml-2 font-bold text-sm p-2 hover:bg-[#e6b800] hover:scale-105 transition-all duration-200"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/createaccount"
              className="text-primary-light-blue underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
