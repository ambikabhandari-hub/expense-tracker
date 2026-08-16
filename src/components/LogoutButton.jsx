import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Check that button is working
    alert("Logout button clicked!");

    // Remove login session
    localStorage.removeItem("isLoggedIn");

    // Remove saved user session if present
    sessionStorage.clear();

    // Go to login page
    navigate("/login", {
      replace: true,
    });

    // Refresh the application
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button
      type="button"
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;