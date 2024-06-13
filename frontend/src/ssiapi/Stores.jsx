import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

export const store=configureStore({
    reducer :{
        [apiSlice.reducerPath] : apiSlice.reducer //creating reducer for apislice automatically

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware) //create middleware for apislice then concat to defaultmiddleware
    
})