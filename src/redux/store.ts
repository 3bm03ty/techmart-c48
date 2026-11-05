
// redux toolkit

import { configureStore } from "@reduxjs/toolkit"
import { CounterReducer } from "./slices/counterSlice"
import { productsReducer } from "./slices/productsSlice";



// Store does not have a valid reducer.
export const store = configureStore({
    reducer: {
        counter: CounterReducer,
        products: productsReducer
    }
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
