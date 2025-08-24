import { LogOut } from "lucide-react";
import { clearAuth } from "../../lib/authStorage";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        clearAuth();
        navigate("/login");
      }}
      className="bg-light-red flex items-center gap-1 mt-1 mb-2 cursor-pointer px-4 lg:px-6 py-3 lg:py-1 text-base lg:text-base font-black rounded-2xl lg:rounded-full shadow-[0_4px_0_0_#FF6C6C] hover:shadow-[0_4px_0_0_#ab4141] hover:translate-y-[2px] transition-all duration-150"
    >
      <LogOut className="lg:hidden"/> <span className="lg:flex hidden">Odjavi se</span>
    </button>
  );
};

export default LogoutButton;
