import { combineReducers } from "redux";
import { scrollReducer } from "./scrollReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";

export const rootReducer = combineReducers({
  scrollData: scrollReducer,
  resizeData: resizeWindowReducer,
});
