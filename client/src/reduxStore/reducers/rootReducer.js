import { combineReducers } from "redux";
import { adminDataReducer } from "./adminDataReducer";
import { alertMessagesReducer } from "./alertMessagesReducer";
import { bookedOrdersReducer } from "./bookedOrdersReducer";
import { canceledOrdersReducer } from "./canceledOrdersReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { usersReducer } from "./actionFetchAdminReducer";
import { fetchAllAdminsReducer } from "./fetchAllAdminsReducer";
import { fetchAllBookedOrdersReducer } from "./fetchBookedOrdersReducer";
import { fetchAllCancledOrdersReducer } from "./fetchCanceledOrdersReducer";
import { fetchAllExcludedTimesReducer } from "./fetchAllExcludedTimesReducer";
import { fetchAllServicesReducer } from "./fetchAllservicesReducer";
import { fetchBookingUserReducer } from "./fetchOrderDetailsReducer";
import { fetchEmailsReducer } from "./fetchEmailsReducer";
import { fetchImagesGalleryReducer } from "./fetchGalleryImagesReducer";
import { fetchOpinionsReducer } from "./fetchOpinionsReducer";
import { fetchPermissionToRegisterReducer } from "./fetchPermissionRegisterReducer";
import { fetchServicesReducer } from "./fetchServicesReducer";
import { fileReducer } from "./fileReducer";
import { excludedTimesReducer } from "./excludedTimesReducer";
import { headerReducer } from "./headerReducer";
import { opinionsReducer } from "./opinionsReducer";
import { fetchOpenShopReducer } from "./fetchOpenShopReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";
import { scrollReducer } from "./scrollReducer";
import { serverErrorReducer } from "./serverErrorReducer";
import { singleExcludedTimeReducer } from "./singleExcludedTimeReducer.";

export const rootReducer = combineReducers({
  adminsData: fetchAllAdminsReducer,
  allBookedOrdersData: fetchAllBookedOrdersReducer,
  allCanceledOrdersData: fetchAllCancledOrdersReducer,
  alertData: alertMessagesReducer,
  allServicesData: fetchAllServicesReducer,
  bookedOrdersData: bookedOrdersReducer,
  bookingUserData: fetchBookingUserReducer,
  canceledOrderData: canceledOrdersReducer,
  orderDetailsData: orderDetailsReducer,
  emailsData: fetchEmailsReducer,
  galleryImgData: fetchImagesGalleryReducer,
  allFetchExTimesData: fetchAllExcludedTimesReducer,
  fileDate: fileReducer,
  headerData: headerReducer,
  excludedTimesData: excludedTimesReducer,
  opinionsData: fetchOpinionsReducer,
  openShopData: fetchOpenShopReducer,
  permissionData: fetchPermissionToRegisterReducer,
  resizeData: resizeWindowReducer,
  scrollData: scrollReducer,
  serviceData: fetchServicesReducer,
  serverErrorData: serverErrorReducer,
  singleExcludedTimeData: singleExcludedTimeReducer,
  testimonialData: opinionsReducer,
  userData: usersReducer,
  useAdminData: adminDataReducer,
});
