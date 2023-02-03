import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  baseURL: "http://localhost:9999",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["Access-Token"] = sessionStorage.getItem("access-token");
  return config;
});
