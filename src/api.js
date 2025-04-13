import axios from "axios";

// Use Vite-specific import.meta.env for dynamic base URL
const BASE_URL = import.meta.env.VITE_API_URL?.endsWith("/")
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_API_URL + "/";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
