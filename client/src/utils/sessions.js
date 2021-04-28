import request from "../helpers/request";

// TODO: post gallery images

export const addImageGallery = async (dataImg) => {
  const { data, status } = await request.post("/gallery", dataImg);

  return { data, status };
};

// TODO: Get gallery images

export const fetchImagesGallery = async (type) => {
  const { data, status } = await request.get(`/gallery/${type}`);

  return { data, status };
};

// TODO: update Gallery images

export const editImagesGallery = async (edit) => {
  const { data, status } = await request.put(`/gallery/${edit.id}`, edit);

  return { data, status };
};

// TODO: Delete Gallery images

export const deleteImagesGallery = async (id) => {
  const { data, status } = await request.delete(`/gallery/${id}`);

  return { data, status };
};

// inne

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

// TODO: pobierz wszytkich adminow

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

// TODO: Service

export const fetchAdminService = async (match) => {
  console.log(match);
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

// TODO: Shop

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
