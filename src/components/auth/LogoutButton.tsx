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
      className="px-4 py-2 rounded-xl bg-tertiary"
    >
      Odjava
    </button>
  );
};

export default LogoutButton;