import axios from "axios";

// axios 객체 생성
export const axi = axios.create({
  baseURL: "http://localhost:9999",
  headers: {
    "Content-Type": "application/json",
  },
});

axi.interceptors.request.use((config) => {
  config.headers["access-token"] = sessionStorage.getItem("access-token");
  return config;
});
