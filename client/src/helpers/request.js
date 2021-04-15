import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5000",
  validateStatus: false,
});

export default request;
