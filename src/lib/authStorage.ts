import type { AuthPayload, User } from "../types/auth";

const AUTH_KEY = "auth";
const USER_KEY = "currentUser";

export const saveAuth = (user: User) => {
  const payload: AuthPayload = {
    userId: user.id,
    username: user.username,
    fullName: `${user.firstName} ${user.lastName}`,
    loggedIn: true,
    loginAt: Date.now()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  localStorage.setItem(USER_KEY, JSON.stringify(user)); 
};

export const getAuth = (): AuthPayload | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as AuthPayload) : null;
};

export const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
};
