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
  console.log("get emails");
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
