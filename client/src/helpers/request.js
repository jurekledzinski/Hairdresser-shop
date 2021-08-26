import axios from "axios";

const request = axios.create({
  validateStatus: false,
  withCredentials: true,
});

export default request;
