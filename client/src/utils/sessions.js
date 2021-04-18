import request from "../helpers/request";

export const fetchOpinions = async () => {
  const { data, status } = await request.get("/opinions", {
    withCredentials: true,
  });

  return { data, status };
};

export const addOpinion = async (opinion) => {
  const { data, status } = await request.post("/opinions", opinion, {
    withCredentials: true,
  });

  return { data, status };
};

export const sendEmail = async (message) => {
  const { data, status } = await request.post("/email", message, {
    withCredentials: true,
  });

  return { data, status };
};

export const registerAdmin = async (personalData) => {
  const { data, status } = await request.post("/register-admin", personalData, {
    withCredentials: true,
  });

  return { data, status };
};

export const fetchRegisterAdmin = async () => {
  const { data, status } = await request.get("/register-admin", {
    withCredentials: true,
  });

  return { data, status };
};

export const loginAdmin = async (personalData) => {
  const { data, status } = await request.post("/login-admin", personalData, {
    withCredentials: true,
  });

  return { data, status };
};

export const fetchAdminData = async () => {
  const { data, status } = await request.get("/login-admin", {
    withCredentials: true,
  });

  return { data, status };
};

export const logoutAdmin = async () => {
  const { data, status } = await request.get("/login-admin/logout", {
    withCredentials: true,
  });

  return { data, status };
};
