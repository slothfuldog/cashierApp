import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./userReducer";
import { orderCartReducer } from "./orderCartReducer";

export const globalStore = configureStore({
    reducer: {userReducer,
    orderCartReducer
    }
})