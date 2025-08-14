import { Link } from "react-router-dom";
import background from "../assets/background.jpg";
import Input from "../components/form/Input";

const Login = () => {
  return (
    <main className="relative p-4 min-h-screen flex flex-col items-center justify-center">
      <div className=" justify-center z-10 bg-primary md:border border-tertiary rounded-2xl p-8 lg:p-10 flex flex-col w-full gap-4 max-w-lg">
        <h1 className="mb-8 font-bold text-3xl text-center">Prijavite se</h1>
        <form className="items-center flex flex-col gap-8">
          <Input
            label="Korisničko ime"
            type="text"
            placeholder="Unesite korisničko ime"
          />
          <Input
            label="Lozinka"
            type="password"
            placeholder="Unesite lozinku"
          />
          <button className="py-3 rounded-xl text-xl w-full bg-light-blue">Prijavite se</button>
          <Link className="text-white/25 text-xl font-light" to="/register">Registracija</Link>
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
