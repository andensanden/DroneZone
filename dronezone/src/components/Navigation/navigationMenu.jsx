import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/auth/authSlice";
import { supabase } from "@/supabase/config.js";
import { toast } from "react-toastify";
import {GoQuestion} from "react-icons/go";
import { GrLogin } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";

export function NavigationMenu(){
	const navigate = useNavigate();
    const dispatch = useDispatch();

	const { isAuth } = useSelector((state) => state.auth);


    async function handleLogout() {

        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error(error.message);
            return;
        }

        dispatch(logout());
        toast.success("You have been logged out");
        navigate("/");
    }



	return(
		<DropdownMenu>
			<DropdownMenuTrigger><IoMenu size={22} /></DropdownMenuTrigger>
			{isAuth ? (
			<DropdownMenuContent className="z-[9999] bg-primary-white translate-y-3">
				<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/")}>
					Home
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/about")}>
					About
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/guidelines")}>
					Guidelines                 
				</DropdownMenuItem>               
                <DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/account")}>
					Account
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/info")}>
					<GoQuestion/>
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<DropdownMenuItem onClick={handleLogout} className="flex items-center justify-start gap-2 cursor-pointer">
					Logout
					<TbLogout size={20}/>
				</DropdownMenuItem>
			</DropdownMenuContent>
			) : (
				<DropdownMenuContent className="z-[9999] bg-primary-white translate-y-3">
					<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/")}>
						Home
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/about")}>
						About
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/guidelines")}>
						Guidelines                 
					</DropdownMenuItem>               
					<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/info")}>
						<GoQuestion/>
					</DropdownMenuItem>
					<DropdownMenuSeparator/>
					<DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/login")}>
					Login <GrLogin size={20}/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	)
}   