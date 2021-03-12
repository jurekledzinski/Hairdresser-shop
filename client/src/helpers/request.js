import axios from "axios";

const request = axios.create({
  validateStatus: false,
});

export default request;
