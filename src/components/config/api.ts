import axios from "axios";

const api = axios.create({
    baseURL: 'https://some-domain.com/api/', // server BE
  });

  export default api;