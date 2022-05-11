import { createStore, combineReducers } from "redux";
import props from "./props";
import userInfo from "./userInfo";
import edit from "./edit";

const rootReducer = combineReducers({ props, userInfo, edit });
export const store = createStore(rootReducer);
