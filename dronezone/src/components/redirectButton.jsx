import { useState } from 'react';
//Used to redirect user to myAccount page!
import { useNavigate } from 'react-router';

import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';
import FlightPathDrawer from '@/mapScripts/FlightPathDrawer';
import {GiPathDistance} from "react-icons/gi";

const redirectButton = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Account');
    };

    return (
        <Button onClick={handleClick}>
           + Add New Device 
        </Button>
    )
}; export default redirectButton;