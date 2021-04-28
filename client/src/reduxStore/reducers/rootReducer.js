import { combineReducers } from "redux";
import { alertMessagesReducer } from "./alertMessagesReducer";
import { usersReducer } from "./actionFetchAdminReducer";
import { fetchAllAdminsReducer } from "./fetchAllAdminsReducer";
import { fetchEmailsReducer } from "./fetchEmailsReducer";
import { fetchImagesGalleryReducer } from "./fetchGalleryImagesReducer";
import { fetchOpinionsReducer } from "./fetchOpinionsReducer";
import { fetchPermissionToRegisterReducer } from "./fetchPermissionRegisterReducer";
import { fetchServicesReducer } from "./fetchServicesReducer";
import { fileReducer } from "./fileReducer";
import { firebaseUrlReducer } from "./firebaseUrlReducer";
import { headerReducer } from "./headerReducer";
import { opinionsReducer } from "./opinionsReducer";
import { fetchOpenShopReducer } from "./fetchOpenShopReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";
import { scrollReducer } from "./scrollReducer";
import { serverErrorReducer } from "./serverErrorReducer";

export const rootReducer = combineReducers({
  adminsData: fetchAllAdminsReducer,
  alertData: alertMessagesReducer,
  emailsData: fetchEmailsReducer,
  galleryImgData: fetchImagesGalleryReducer,
  fileDate: fileReducer,
  headerData: headerReducer,
  firebaseUrlData: firebaseUrlReducer,
  opinionsData: fetchOpinionsReducer,
  openShopData: fetchOpenShopReducer,
  permissionData: fetchPermissionToRegisterReducer,
  resizeData: resizeWindowReducer,
  scrollData: scrollReducer,
  serviceData: fetchServicesReducer,
  serverErrorData: serverErrorReducer,
  testimonialData: opinionsReducer,
  userData: usersReducer,
});
