import { User } from "./user";

export type UserState = {
  id?: string | null;
  users: User[];
  loading: boolean;
  letter: string;
  age: number;
  user: User | null;
  currentUser: User | null;
};
