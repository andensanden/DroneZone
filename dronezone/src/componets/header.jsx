import { useNavigate } from "react-router";
import { GrLogin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/Redux/dummy/dummySlice";


export function Header() {
  const navigate = useNavigate();

  const dummyCount = useSelector((state) => state.dummy.value);
  const dispatch = useDispatch();


  return (
    <div className="bg-white h-25 flex items-center justify-between " >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-700 ml-8">Drone<span className="text-yellow-500">Zone</span></h1>
        <p className="text-gray-400 ml-8 text-sm">Real time map of all registered active drones, provided by DroneZone</p>
      </div>

      <div className="flex items-center mr-10 h-12 bg-gray-200 rounded-2xl">
        <button className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2 hover:underline w-16" onClick={() => navigate('/')}>Home</button>
        <button className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2 hover:underline w-16" onClick={() => navigate('/about')}>About</button>
        <button className="text-gray-700 bg-transparent ml-2 font-bold text-sm p-2 hover:underline w-16 mr-6" onClick={() => navigate('/guidelines')}>Guidelines</button>
        <button className="flex items-center justify-center text-gray-700 bg-primary-yellow h-12 font-bold text-sm rounded-2xl ml-2 p-2 hover:underline w-16" onClick={() => navigate('/login')}><GrLogin size={20}/></button>
      </div>
    </div>
  )         
}