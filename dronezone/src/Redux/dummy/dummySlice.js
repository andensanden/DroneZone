import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0
}


const dummySlice = createSlice({
    name: 'dummy',
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})


export default dummySlice.reducer
export const { increment, decrement } = dummySlice.actions
