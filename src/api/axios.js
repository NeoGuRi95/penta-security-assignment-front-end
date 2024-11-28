import axios from "axios";

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
});

// 요청 인터셉터: access token 추가
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
