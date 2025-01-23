import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckStudentLogin } from "./api/studentApi";
import { CheckStaffLogin } from "./api/staffApi";
import "../styles/dbms_project.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT"); // Default role
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usnRegex = /^RVCE\d{2}BIS\d{3}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format. Please enter a valid email.");
      return;
    }

    if (role === "STUDENT") {
      if (!usnRegex.test(pwd)) {
        setErrorMessage(
          "Invalid USN format. Please enter in RVCEnnBxxnnn format."
        );
        return;
      }
      const res = await CheckStudentLogin({ email, pwd });
      if (res != null) {
        navigate("/student");
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } else if (role === "STAFF") {
      const res = await CheckStaffLogin({ email, pwd });
      if (res != null) {
        if (res.type === "Lab") {
          navigate("/Labhome");
        } else if (res.type === "Staff") {
          navigate("/Depthome");
        }
      } else {
        setErrorMessage("Invalid login credentials");
      }
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login</h1>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="STAFF">Staff</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
