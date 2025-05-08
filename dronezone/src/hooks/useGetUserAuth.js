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
                dispatch(login({email: data.session.user.email, userID: data.session.user.id}));
            }else{
                dispatch(logout()); //setting state as a logged out user
            }
        }

        checkSession(); 

        //Scenario two, listening for auth changes and always keeping application state in sync
        const listener =  supabase.auth.onAuthStateChange((event, session) => {

            if(session?.user) {
                dispatch(login({email: session.user.email, userID: session.user.id}));
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
    