import { api } from "./api.ts";

export interface SystemUser {
  id: string;
  username: string;
  role: string;
  email: string;
  created_at: string;
  status: boolean;
}

export interface UpdateUserData {
  username?: string;
  password?: string;
  role?: string;
  email?: string;
  status?: boolean;
}
export interface CreateUserData {
  username: string;
  password: string;
  role: string;
  email: string;
  status: boolean;
}

export const getUsersAPI = async (): Promise<SystemUser[]> => {
  const response = await api.get<SystemUser[]>("/users/");

  return response.data;
};


export const createUserAPI = async (
  data: CreateUserData,
): Promise<SystemUser> => {
  const response = await api.post<SystemUser>("/users/", data);

  return response.data;
};
export const updateUserAPI = async (
  userId: string,
  data: UpdateUserData,
): Promise<SystemUser> => {
  const response = await api.put<SystemUser>(
    `/users/${userId}`,
    data,
  );

  return response.data;
};