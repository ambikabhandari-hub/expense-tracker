import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser) {
      setError(
        "Account nahi mila. Pehle Register karo."
      );
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");
    } else {
      setError(
        "Email ya password galat hai."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          💰
        </div>

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to your Expense Tracker
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
        </p>

        <button
          className="register-btn"
          onClick={() =>
            navigate("/register")
          }
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Login;