import axios from "axios";

const api = axios.create({
  //baseURL: "https://localhost:7122/api/",
  baseURL: "https://protrans.azurewebsites.net/api/", // server BE
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;