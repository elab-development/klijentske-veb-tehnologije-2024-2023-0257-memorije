import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";
import Input from "../components/form/Input";
import Modal from "../components/Modal";

const Register: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const takeVal = (v: any) => (typeof v === "string" ? v : v?.target?.value ?? "");

  const canSubmit =
    username.trim().length > 0 &&
    pwd.length > 0 &&
    pwd2.length > 0; 

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return; 
    setShowModal(true);
    timerRef.current = window.setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 md:p-4">
      {showModal && <Modal />}

      <div className="relative z-10 w-full max-w-lg lg:max-w-3xl bg-primary md:border border-tertiary rounded-2xl md:p-8 lg:px-10 lg:py-16 flex flex-col gap-4">
        <h1 className="mb-8 font-bold text-3xl text-center">Registrujte se</h1>

        <form onSubmit={handleRegister} className="flex flex-col items-center gap-8">
          <Input
            label="Korisničko ime"
            type="text"
            placeholder="Unesite korisničko ime"
            value={username}
            onChange={(v: any) => setUsername(takeVal(v))}
          />

          <div className="flex w-full gap-8 flex-col lg:flex-row">
            <Input
              label="Lozinka"
              type="password"
              placeholder="Unesite lozinku"
              value={pwd}
              onChange={(v: any) => setPwd(takeVal(v))}
            />
            <Input
              label="Potvrdite lozinku"
              type="password"
              placeholder="Unesite ponovo"
              value={pwd2}
              onChange={(v: any) => setPwd2(takeVal(v))}
            />
          </div>

          <button
            type="submit"
            disabled={showModal || !canSubmit}
            className="w-full py-3 rounded-xl text-xl bg-light-blue disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition"
          >
            {showModal ? "Uspešno! Preusmeravam…" : "Registruj se"}
          </button>

          <Link className="text-white/50 hover:text-white/80 text-xl font-light" to="/login">
            Prijavi se
          </Link>
        </form>
      </div>

      <img
        src={background}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden md:block opacity-10 object-cover w-full h-full"
      />
    </main>
  );
};

export default Register;
