import request from "../helpers/request";

export const getVistisPageNumber = async () => {
  const { data, status } = await request.get("/");

  return { data, status };
};

export const createVistisPageNumber = async () => {
  const { data, status } = await request.put("/");

  return { data, status };
};

export const addImageGallery = async (dataImg) => {
  const { data, status } = await request.post("/gallery", dataImg);
  return { data, status };
};

export const fetchImagesGallery = async (type) => {
  const { data, status } = await request.get(`/gallery/${type}`);
  return { data, status };
};

export const editImagesGallery = async (edit) => {
  const { data, status } = await request.put(`/gallery/${edit.id}`, edit);
  return { data, status };
};

export const deleteImagesGallery = async (id) => {
  const { data, status } = await request.delete(`/gallery/${id}`);
  return { data, status };
};

export const fetchOpinions = async () => {
  const { data, status } = await request.get("/opinions");
  return { data, status };
};

export const fetchOpinionsAll = async () => {
  const { data, status } = await request.get("/opinions/all");
  return { data, status };
};

export const addOpinion = async (opinion) => {
  const { data, status } = await request.post("/opinions", opinion);
  return { data, status };
};

export const deleteOpinion = async (id) => {
  const { data, status } = await request.delete(`/opinions/${id}`);
  return { data, status };
};

export const fetchAllEmails = async () => {
  const { data, status } = await request.get("/email");
  return { data, status };
};

export const sendEmail = async (message) => {
  const { data, status } = await request.post("/email", message);
  return { data, status };
};

export const deleteEmail = async (id) => {
  const { data, status } = await request.delete(`/email/${id}`);
  return { data, status };
};

export const registerAdmin = async (personalData) => {
  const { data, status } = await request.post("/register-admin", personalData);
  return { data, status };
};

export const fetchRegisterAdmin = async () => {
  const { data, status } = await request.get("/register-admin");
  return { data, status };
};

export const updateAdmin = async (permission) => {
  const { data, status } = await request.put(
    `/register-admin/${permission.id}`,
    permission
  );
  return { data, status };
};

export const updateAdminProfile = async (dataProfile) => {
  const { data, status } = await request.put(
    `/register-admin/profile/${dataProfile.id}`,
    dataProfile
  );
  return { data, status };
};

export const deleteAdmin = async (id) => {
  const { data, status } = await request.delete(`/register-admin/${id}`);
  return { data, status };
};

export const loginAdmin = async (personalData) => {
  const { data, status } = await request.post("/login-admin", personalData);
  return { data, status };
};

export const fetchAdminData = async () => {
  const { data, status } = await request.get("/login-admin");
  return { data, status };
};

export const logoutAdmin = async () => {
  const { data, status } = await request.get("/login-admin/logout");
  return { data, status };
};

export const fetchEnableRegisterPermission = async () => {
  const { data, status } = await request.get("/enable-register");
  return { data, status };
};

export const addEnableRegisterPermission = async (add) => {
  const { data, status } = await request.put("/enable-register", add);
  return { data, status };
};

export const fetchAllServices = async () => {
  const { data, status } = await request.get("/service");
  return { data, status };
};

export const fetchAdminService = async (match) => {
  const { data, status } = await request.get(
    `/service/search?qender=${match.gender}&card=${match.card}`
  );
  return { data, status };
};

export const addAdminService = async (service) => {
  const { data, status } = await request.post("/service", service);
  return { data, status };
};

export const editAdminService = async (edit) => {
  const { data, status } = await request.put(`/service/${edit.id}`, edit);
  return { data, status };
};

export const deleteAdminService = async (id) => {
  const { data, status } = await request.delete(`/service/${id}`);
  return { data, status };
};

export const fetchAdminOpenShop = async () => {
  const { data, status } = await request.get("/open-shop");
  return { data, status };
};

export const addAdminOpenShop = async (open) => {
  const { data, status } = await request.post("/open-shop", open);
  return { data, status };
};

export const editAdminOpenShop = async (edit) => {
  const { data, status } = await request.put(`/open-shop/${edit.id}`, edit);
  return { data, status };
};

export const deleteAdminOpenShop = async (id) => {
  const { data, status } = await request.delete(`/open-shop/${id}`);
  return { data, status };
};

export const getBookingUser = async (id) => {
  const { data, status } = await request.get(`/booking/${id}`);

  return { data, status };
};

export const addBooking = async (book) => {
  const { data, status } = await request.post(`/booking`, book);
  return { data, status };
};

export const getBookingBooked = async () => {
  const { data, status } = await request.get(`/booking/booked`);
  return { data, status };
};

export const getBookingCanceled = async () => {
  const { data, status } = await request.get(`/booking/canceled`);
  return { data, status };
};

export const updateSingleBooking = async (book) => {
  const { data, status } = await request.put(`/booking/${book._id}`, book);
  return { data, status };
};

export const deleteBooking = async (id) => {
  const { data, status } = await request.delete(`/booking/${id}`);
  return { data, status };
};

export const deleteBookedOrder = async (id) => {
  const { data, status } = await request.delete(`/booking/booked/${id}`);
  return { data, status };
};

export const deleteCanceledOrder = async (id) => {
  const { data, status } = await request.delete(`/booking/canceled/${id}`);
  return { data, status };
};

export const getExcludedDates = async () => {
  const { data, status } = await request.get("/booking/excluded");

  return { data, status };
};

export const addExcludedDates = async (date) => {
  const { data, status } = await request.post(`/booking/excluded/`, date);

  return { data, status };
};

export const deleteExcludedDate = async (id) => {
  const { data, status } = await request.delete(`/booking/excluded/${id}`);

  return { data, status };
};

export const deleteExcludedDateCancelCode = async (id) => {
  const { data, status } = await request.delete(`/booking/excluded-code/${id}`);

  return { data, status };
};

export const collectPay = async (dataPay) => {
  const { data, status } = await request.post(
    "/create-checkout-session",
    dataPay
  );

  return { data, status };
};

export const bookingConfirmCancelOrSuccess = async (confirmation) => {
  const { data, status } = await request.post(
    `/email-confirmation/${confirmation.bookingId}`,
    confirmation
  );

  return { data, status };
};

export const cancelBookingSendEmailUser = async (cancelData) => {
  const { data, status } = await request.post(
    "/email-booking-cancel",
    cancelData
  );

  return { data, status };
};

export const deleteExcludedTimesExpired = async () => {
  await request.delete("/booking/excluded/many");
};

export const cancelBookingByUser = async (code) => {
  const { data, status } = await request.put(`/booking/cancel/code/${code}`);

  return { data, status };
};

export const getAmountBookingsEachMonthShop = async () => {
  const { data, status } = await request.get(
    "/booking/amount-month/bookings/shop"
  );

  return { data, status };
};

export const getAmountBookingsEachMonthWebsite = async () => {
  const { data, status } = await request.get(
    "/booking/amount-month/bookings/website"
  );

  return { data, status };
};

export const getPaymentBookingsEachMonthShop = async () => {
  const { data, status } = await request.get("/booking/payment-month/shop");

  return { data, status };
};

export const getPaymentBookingsEachMonthWebsite = async () => {
  const { data, status } = await request.get("/booking/payment-month/website");

  return { data, status };
};
