import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  baseURL: "https://i8a304.p.ssafy.io/api",
  // baseURL: "http://localhost:4433/api",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["Access-Token"] = sessionStorage.getItem("access-token");
  return config;
});
