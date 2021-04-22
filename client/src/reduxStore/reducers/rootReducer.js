import { combineReducers } from "redux";
import { alertMessagesReducer } from "./alertMessagesReducer";
import { usersReducer } from "./actionFetchAdminReducer";
import { fetchEmailsReducer } from "./fetchEmailsReducer";
import { fetchImagesGalleryReducer } from "./fetchGalleryImagesReducer";
import { fetchOpinionsReducer } from "./fetchOpinionsReducer";
import { fileReducer } from "./fileReducer";
import { firebaseUrlReducer } from "./firebaseUrlReducer";
import { headerReducer } from "./headerReducer";
import { opinionsReducer } from "./opinionsReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";
import { scrollReducer } from "./scrollReducer";
import { serverErrorReducer } from "./serverErrorReducer";

export const rootReducer = combineReducers({
  alertData: alertMessagesReducer,
  emailsData: fetchEmailsReducer,
  galleryImgData: fetchImagesGalleryReducer,
  fileDate: fileReducer,
  headerData: headerReducer,
  opinionsData: fetchOpinionsReducer,
  firebaseUrlData: firebaseUrlReducer,
  resizeData: resizeWindowReducer,
  scrollData: scrollReducer,
  serverErrorData: serverErrorReducer,
  testimonialData: opinionsReducer,
  userData: usersReducer,
});
