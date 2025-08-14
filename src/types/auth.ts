export type Partija = {
  id: string;          // npr. uuid ili "1"
  mode: "Lako" | "Srednje" | "Teško";
  timeMs: number;      // koliko je brzo odigrao (u ms)
  playedAt: string;    // ISO datum string
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;    // plain text radi jednostavnosti
  games: Partija[];    // 5 partija
};

export type AuthPayload = {
  userId: string;
  username: string;
  fullName: string;
  loggedIn: boolean;
  loginAt: number;     // Date.now()
};
