import { Link } from "react-router-dom";
import background from "../assets/background.jpg";
import Input from "../components/form/Input";

const Register = () => {
  return (
    <main className="relative p-4 min-h-screen flex flex-col items-center justify-center">
      <div className=" justify-center z-10 bg-primary md:border border-tertiary rounded-2xl p-8 lg:px-10 lg:py-16 lg:max-w-3xl flex flex-col w-full gap-4 max-w-lg">
        <h1 className="mb-8 font-bold text-3xl text-center">Registrujte se</h1>
        <form className="items-center flex flex-col gap-8">
          <Input
            onChange={()=>{}}
            label="Korisničko ime"
            type="text"
            placeholder="Unesite korisničko ime"
          />
          <div className="flex lg:flex-row flex-col w-full gap-8">
            <Input
              onChange={()=>{}}
              label="Lozinka"
              type="password"
              placeholder="Unesite lozinku"
            />
            <Input
              onChange={()=>{}}
              label="Potvrdite lozinku"
              type="password"
              placeholder="Unesite ponovo"
            />
          </div>
          <button className="py-3 rounded-xl text-xl w-full bg-light-blue">
            Registruj se
          </button>
          <Link className="text-white/25 text-xl font-light" to="/login">
            Prijavi se
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

export default Register;
