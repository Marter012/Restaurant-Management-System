import axios from "axios";

export const printAgent = axios.create({
  baseURL: import.meta.env.VITE_API_PRINT_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});