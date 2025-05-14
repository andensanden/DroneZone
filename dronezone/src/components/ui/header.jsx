import { useNavigate } from "react-router";
import { GrLogin } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { LoginDropDown } from "@/components/ui/loginDropDown";
import { LuInbox } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { NavigationMenu } from "../Navigation/navigationMenu";

export function Header() {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="bg-white h-25 flex items-center justify-between ">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-700 ml-8">
          Drone<span className="text-yellow-500">Zone</span>
        </h1>
        <p className="hidden lg:block text-gray-400 ml-8 text-sm">
          Real time map of all registered active drones, provided by DroneZone
        </p>
      </div>

      {/*Navigation bar*/}
      <div className="flex items-center gap-4">
        {/*We dont need this NOTIFICATION button*/}
        {/*x{isAuth ? <div className="relative hover:scale-107 transition-all duration-200">
          <button className="bg-primary-blue p-3 rounded-xl"><LuInbox size={20} className="text-white"/> </button> 
        <span className="text-white text-sm font-bold bg-red-600 rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0">1</span>
        </div> : null}*/}

        {/* mobile compatible menu */}
        <div className="flex items-center p-3 mr-5 bg-primary-yellow  rounded-xl sm:hidden hover:scale-107 transition-all duration-200">
          <NavigationMenu />
        </div>
        <div className="hidden sm:flex items-center mr-5 h-12 bg-gray-200 rounded-2xl">
          <button
            className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2 w-16 hover:scale-107 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2  w-16 hover:scale-107 transition-all duration-200"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2  w-16 hover:scale-107 transition-all duration-200 mr-6"
            onClick={() => navigate("/guidelines")}
          >
            Guidelines
          </button>

          <button className=" p-3 rounded-xl">
            <GoQuestion
              size={25}
              className="text-gray-700  hover:scale-107 transition-all duration-200"
              onClick={() => navigate("/info")}
            />{" "}
          </button>

          <div className="flex items-center justify-center text-gray-700 bg-primary-yellow h-12 font-bold text-sm rounded-2xl ml-2 p-2 w-16 hover:scale-107 transition-all duration-200">
            {isAuth ? (
              <LoginDropDown />
            ) : (
              <GrLogin size={20} onClick={() => navigate("/login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
