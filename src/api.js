import axios from "axios";

// Use Vite-specific import.meta.env for dynamic base URL
const envURL = import.meta.env.VITE_API_URL || "";
const BASE_URL = envURL.endsWith("/") ? envURL : envURL + "/";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
