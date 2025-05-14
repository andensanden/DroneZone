import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";



export function AvatarProfile() {

    //TODO: Use name/lastname instead if it gets included in application state
    const email = useSelector((state) => state.auth.email); 


    return (
        <div>
            <Avatar >
                <AvatarFallback>{email[0]}</AvatarFallback>
            </Avatar>
        </div>
    );
}