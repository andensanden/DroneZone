import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import  LoggedInMap  from './loggedInMap';
import  Map  from './map';


const MapSelector = () =>{

  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("Authentication State:", isAuth); // Debugging line
  return (
    <div>
        {isAuth ? <LoggedInMap /> : <Map/> }
    </div>
  );
};

export default MapSelector;