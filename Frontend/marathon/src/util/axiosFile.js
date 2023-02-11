import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  // baseURL: "https://i8a304.p.ssafy.io/api",
  baseURL: "http://localhost:9999/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

$.interceptors.request.use((config) => {
  config.headers["Access-Token"] = sessionStorage.getItem("access-token");
  return config;
});
