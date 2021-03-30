import { combineReducers } from "redux";
import { scrollReducer } from "./scrollReducer";

export const rootReducer = combineReducers({
  scrollData: scrollReducer,
});
