import { createSlice } from "@reduxjs/toolkit";
import L from "leaflet";

const initialState = {
    position : [0, 0],
    currentDeviceID : null,
    allDrones : []
}


const gpsPosSlice = createSlice({
    name: 'gpsPos',
    initialState: initialState,
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload
        },
        setCurrentDeviceID: (state, action) => {
            state.currentDeviceID = action.payload
        },
        setAllDrones: (state, action) => {
            state.allDrones = action.payload
        }
    }
})


export default gpsPosSlice.reducer
export const { setPosition, setCurrentDeviceID, setAllDrones } = gpsPosSlice.actions