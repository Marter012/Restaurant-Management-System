import { api } from "./api.ts";

import {
  clearAuthTokens,
  saveAuthTokens,
} from "./authStorage.ts";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

export interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  created_at: string;
  status: boolean;
}

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/",
    {
      username,
      password,
    },
  );

  const data = response.data;

  saveAuthTokens(
    data.access_token,
    data.refresh_token,
    data.expires_in,
  );

  return data;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/refresh",
    {
      refresh_token: refreshToken,
    },
  );

  const data = response.data;

  saveAuthTokens(
    data.access_token,
    data.refresh_token,
    data.expires_in,
  );

  return data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");

  return response.data;
};

export const logout = (): void => {
  clearAuthTokens();
};

export const ForgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const ResetPassword = async (email: string, code: string, newPassword: string) => {
  const response = await api.post("/auth/reset-password", {
    email,
    code,
    new_password: newPassword
  });
  return response.data;
};

export const VerifyCode = async (email: string, code: string) => {
  const response = await api.post("/auth/verify-reset-code", {
    email,
    code
  });
  return response.data;
};

export type ResetStatus =
  | "none"
  | "pending"
  | "verified"
  | "completed"
  | "expired";

export const GetResetStatus = async (
  email: string,
): Promise<ResetStatus> => {
  const response = await api.get<{
    status: ResetStatus;
  }>("/auth/reset-status", {
    params: {
      email,
    },
  });

  return response.data.status;
};
