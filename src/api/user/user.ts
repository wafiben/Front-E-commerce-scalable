import { BASE_DEV_URL } from "../../config/url";
import { User } from "../../types/user";
import { UserDto } from "../../types/userDto";
import { handleRequest } from "../http";

export type responseSignIn = { token: string };

export const deleteSingleUser = async (id: string) =>
  await handleRequest<void>(`${BASE_DEV_URL}delete_user/${id}`, "DELETE");

export const createFreelancer = async (data: User) =>
  await handleRequest<void>(`${BASE_DEV_URL}user-freelancer`, "POST", data);

export const modifyUser = async (id: string, data: UserDto) =>
  await handleRequest<void>(`${BASE_DEV_URL}modify_user/${id}`, "PUT", data);

export const getSingleUser = async (id: string) =>
  await handleRequest<any>(`${BASE_DEV_URL}user-freelance/single/${id}`, "GET");

export const getUsers = async () =>
  await handleRequest<any>(`${BASE_DEV_URL}user-freelance`, "GET");

export const singnIn = async (data: UserDto) =>
  await handleRequest<responseSignIn>(
    `${BASE_DEV_URL}auth/login`,
    "POST",
    data
  );