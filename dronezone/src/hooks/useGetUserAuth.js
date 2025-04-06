import { useDispatch } from "react-redux";
import { supabase } from "@/supabase/config.js";
import { useEffect } from "react";
import { login, logout } from "@/Redux/auth/authSlice";


export function useGetUserAuth() {

    const dispatch = useDispatch();


    useEffect(() => {

        async function checkSession() { 
            const {data, error} = await supabase.auth.getSession();

            //TODO: Could potentially call db to get user data and set in application state??
            if (data.session !== null) {
                dispatch(login(data.session.user.email));
            }else{
                dispatch(logout()); //setting state as a logged out user
            }
        }

        checkSession(); 

        //Scenario two, listening for auth changes and always keeping application state in sync
        const listener =  supabase.auth.onAuthStateChange((event, session) => {

            if(session?.user) {
                dispatch(login(session.user.email));
            } else {
                dispatch(logout());
            }
        });

        //Cleanup function to remove listener on unmount
        return () => {
            listener.data.subscription.unsubscribe();
        }

    },[dispatch])
}
    