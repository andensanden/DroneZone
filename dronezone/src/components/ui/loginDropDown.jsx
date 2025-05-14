import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/auth/authSlice";
import { supabase } from "@/supabase/config.js";
import { toast } from "react-toastify";

export function LoginDropDown(){
	const navigate = useNavigate();
    const dispatch = useDispatch();


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
			<DropdownMenuTrigger><FaRegUser size={20} /></DropdownMenuTrigger>
			<DropdownMenuContent className="z-[9999] bg-primary-white translate-y-3">
                <DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer" onClick={() => navigate("/account")}>
					Account
                    <FaRegUser size={20}/>
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				<DropdownMenuItem onClick={handleLogout} className="flex items-center justify-start gap-2 cursor-pointer">
					Logout
					<TbLogout size={20}/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}   