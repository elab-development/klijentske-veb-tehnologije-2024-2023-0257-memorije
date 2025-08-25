import { getCurrentUser } from "../lib/authStorage";
import LogoutButton from "./auth/LogoutButton";
import profilIkonica from "../assets/dzoni.png";

export const Profil = () => {
  const user = getCurrentUser();
  return (
    <div className="lg:absolute lg:mt-0 mt-4 left-14 z-30 top-14 rounded-xl lg:border border-light-gray lg:bg-secondary px-6 py-4 flex lg:flex-row flex-col lg:items-start items-center gap-2 lg:gap-4">
      <div className="relative overflow-hidden rounded-full border-5 lg:border-4 border-white aspect-square w-18 lg:w-16">
        <img
          src={profilIkonica}
          alt="Ikonica"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl lg:text-xl font-bold">
          {user?.firstName} {user?.lastName}
        </h3>
        <div className="lg:flex hidden">
          <LogoutButton />
        </div>
      </div>
       <div className="lg:hidden absolute right-8 top-10">
          <LogoutButton />
        </div>
    </div>
  );
};
