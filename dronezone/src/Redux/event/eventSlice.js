import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    takeDownDrone: false
}


const eventSlice = createSlice({
    name: 'event',
    initialState: initialState,
    reducers: {
        setTakeDownDroneTrue: (state, action) => {
            state.takeDownDrone = true
        },
        setTakeDownDroneFalse: (state, action) => {
            state.takeDownDrone = false
        },
        toggleTakeDownDrone: (state, action) => {
            state.takeDownDrone = !state.takeDownDrone
        }
    }
})


export default eventSlice.reducer
export const { setTakeDownDroneTrue, setTakeDownDroneFalse, toggleTakeDownDrone } = eventSlice.actions
    