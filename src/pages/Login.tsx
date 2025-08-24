import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";
import Input from "../components/form/Input";

import users from "../data/users.json"; // <— radi uz resolveJsonModule
import type { User } from "../types/auth";
import { saveAuth } from "../lib/authStorage";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allUsers = users as unknown as User[];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    console.log(username+" "+password);
    const user = allUsers.find(u => u.username.trim().toLowerCase() === username.trim().toLowerCase());

    if (!user || user.password !== password) {
      setError("Pogrešno korisničko ime ili lozinka.");
      setSubmitting(false);
      return;
    }

    saveAuth(user);
    navigate("/");
    setSubmitting(false);
  };

  return (
    <main className="relative p-8 lg:p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="justify-center z-10 bg-primary md:border border-tertiary rounded-2xl md:p-8 lg:p-10 flex flex-col w-full gap-4 max-w-lg">
        <h1 className="mb-8 font-bold text-3xl text-center">Prijavite se</h1>

        <form className="items-center flex flex-col gap-8 w-full" onSubmit={onSubmit}>
          <Input
            label="Korisničko ime"
            type="text"
            placeholder="Unesite korisničko ime"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />

          <Input
            label="Lozinka"
            type="password"
            placeholder="Unesite lozinku"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm -mt-4 -mb-2 w-full text-center">{error}</p>
          )}

          <button
            disabled={submitting}
            className="py-3 rounded-xl text-xl w-full bg-light-blue disabled:opacity-50"
            type="submit"
          >
            {submitting ? "Prijavljivanje..." : "Prijavite se"}
          </button>

          <Link className="text-white/25 text-xl font-light" to="/register">
            Registracija
          </Link>
        </form>
      </div>

      <img
        src={background}
        className="absolute md:flex hidden inset-0 opacity-5 object-cover w-full h-full"
      />
    </main>
  );
};

export default Login;
