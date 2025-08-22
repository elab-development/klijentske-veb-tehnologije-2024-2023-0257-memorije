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
      className="bg-light-red mb-2 cursor-pointer px-6 py-1 lg:py-2 text-base lg:text-base font-black rounded-full shadow-[0_6px_0_0_#FF6C6C] hover:shadow-[0_4px_0_0_#ab4141] hover:translate-y-[2px] transition-all duration-150"
    >
      Odjava
    </button>
  );
};

export default LogoutButton;
