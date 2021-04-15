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
