import { createSlice } from "@reduxjs/toolkit";
import L from "leaflet";

const initialState = {
    position : [0, 0]
}


const gpsPosSlice = createSlice({
    name: 'gpsPos',
    initialState: initialState,
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload
        },
    }
})


export default gpsPosSlice.reducer
export const { setPosition } = gpsPosSlice.actions