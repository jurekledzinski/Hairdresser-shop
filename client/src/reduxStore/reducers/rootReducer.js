import { combineReducers } from "redux";
import { alertMessagesReducer } from "./alertMessagesReducer";
import { usersReducer } from "./actionFetchAdminReducer";
import { fileReducer } from "./fileReducer";
import { headerReducer } from "./headerReducer";
import { opinionsReducer } from "./opinionsReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";
import { scrollReducer } from "./scrollReducer";

export const rootReducer = combineReducers({
  alertData: alertMessagesReducer,
  fileDate: fileReducer,
  headerData: headerReducer,
  resizeData: resizeWindowReducer,
  scrollData: scrollReducer,
  testimonialData: opinionsReducer,
  userData: usersReducer,
});
