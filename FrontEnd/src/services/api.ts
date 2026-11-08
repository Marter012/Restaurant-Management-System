import axios from "axios";

import { getAccessToken } from "./authStorage.ts";

const CLIENT_ID_STORAGE_KEY = "boutique-sabores-client-id";

export const getClientId = (): string => {
  const storedClientId = localStorage.getItem(CLIENT_ID_STORAGE_KEY);

  if (storedClientId) {
    return storedClientId;
  }

  const clientId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId);

  return clientId;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.set("X-Client-ID", getClientId());

  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  return config;
});