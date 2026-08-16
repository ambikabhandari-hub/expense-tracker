import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </button>
  );
}

export default LogoutButton;