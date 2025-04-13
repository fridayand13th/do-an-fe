import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import fees from "@redux/slices/fees";

import { store } from "./store";

const rootReducer = combineReducers({ counter, fees });
export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
