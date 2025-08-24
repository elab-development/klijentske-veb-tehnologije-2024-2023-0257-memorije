export type Partija = {
  id: string;
  mode: "Lako" | "Srednje" | "Teško";
  timeMs: number;
  playedAt: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  games: Partija[];
};

export type AuthPayload = {
  userId: string;
  username: string;
  fullName: string;
  loggedIn: boolean;
  loginAt: number;
};

