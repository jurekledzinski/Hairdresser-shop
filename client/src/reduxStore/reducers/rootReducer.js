import { combineReducers } from "redux";
import { adminDataReducer } from "./adminDataReducer";
import { alertMessagesReducer } from "./alertMessagesReducer";
import { bookedOrdersReducer } from "./bookedOrdersReducer";
import { bookingsMadeAtShopReducer } from "./bookingsMadeAtShopReducer";
import { bookingsMadeWebsiteReducer } from "./bookingsMadeAtWebsiteReducer";
import { canceledOrdersReducer } from "./canceledOrdersReducer";
import { closeChooseServiceReducer } from "./closeChooseServiceReducer";
import { emailDataReducer } from "./emailsDataReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { usersReducer } from "./actionFetchAdminReducer";
import { fetchAmountBookingsPerMonthInShopReducer } from "./fetchAmountBookingsPerMonthInShopReducer";
import { fetchAmountBookingsPerMonthWebsiteReducer } from "./fetchAmountBookingsPerMonthInWebsiteReducer";
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
import { fetchPaymentsShopReducer } from "./fetchPaymentsMonthShopReducer";
import { fetchPaymentsWebsiteReducer } from "./fetchPaymentsMonthWebsiteReducer";
import { fetchServicesReducer } from "./fetchServicesReducer";
import { fileReducer } from "./fileReducer";
import { firebaseUrlReducer } from "./firebseUrlReducer";
import { galleryImagesReducer } from "./galleryImagesReducer";
import { excludedTimesReducer } from "./excludedTimesReducer";
import { headerReducer } from "./headerReducer";
import { opinionsDataReducer } from "./opinionsDataReducer";
import { paymentsShopReducer } from "./paymentsMonthShopReducer";
import { paymentsWebsiteReducer } from "./paymentsMonthWebsiteReducer";
import { fetchOpenShopReducer } from "./fetchOpenShopReducer";
import { resizeWindowReducer } from "./resizeWindowReducer";
import { scrollReducer } from "./scrollReducer";
import { serverErrorReducer } from "./serverErrorReducer";
import { singleExcludedTimeReducer } from "./singleExcludedTimeReducer.";

// excludedTimesData
export const rootReducer = combineReducers({
  adminsData: fetchAllAdminsReducer,
  amountBookingsDataShop: fetchAmountBookingsPerMonthInShopReducer,
  amountBookingsDataWebsite: fetchAmountBookingsPerMonthWebsiteReducer,
  allBookedOrdersData: fetchAllBookedOrdersReducer,
  allCanceledOrdersData: fetchAllCancledOrdersReducer,
  alertData: alertMessagesReducer,
  allServicesData: fetchAllServicesReducer,
  bookingsMadeAtShopData: bookingsMadeAtShopReducer,
  bookingsMadeAtWebsiteData: bookingsMadeWebsiteReducer,
  bookedOrdersData: bookedOrdersReducer,
  bookingUserData: fetchBookingUserReducer,
  canceledOrderData: canceledOrdersReducer,
  closeChooseServiceData: closeChooseServiceReducer,
  orderDetailsData: orderDetailsReducer,
  emailsData: fetchEmailsReducer,
  emailDataToUse: emailDataReducer,
  galleryImgData: fetchImagesGalleryReducer,
  galleryImagesData: galleryImagesReducer,
  allFetchExTimesData: fetchAllExcludedTimesReducer,
  fileDate: fileReducer,
  firebaseUrlData: firebaseUrlReducer,
  headerData: headerReducer,
  excludedTimesData: excludedTimesReducer,
  opinionsData: fetchOpinionsReducer,
  openShopData: fetchOpenShopReducer,
  permissionData: fetchPermissionToRegisterReducer,
  paymentsDataFetchShop: fetchPaymentsShopReducer,
  paymentsDataFetchWebsite: fetchPaymentsWebsiteReducer,
  paymentsDataShop: paymentsShopReducer,
  paymentsDataWebsite: paymentsWebsiteReducer,
  resizeData: resizeWindowReducer,
  scrollData: scrollReducer,
  serviceData: fetchServicesReducer,
  serverErrorData: serverErrorReducer,
  singleExcludedTimeData: singleExcludedTimeReducer,
  opinionsDataToUse: opinionsDataReducer,
  userData: usersReducer,
  useAdminData: adminDataReducer,
});
