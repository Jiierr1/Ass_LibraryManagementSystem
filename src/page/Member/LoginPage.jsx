import { replace, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserAuth from "../../hooks/userAuth";
import LoginForm from "../../components/Login";

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useUserAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (email_or_username, password) => {
    try {
      await login(email_or_username, password);
      console.log("Login successfully");
      navigate("/", { replace: true });
    } catch (err) {
      console.log("Login Error:", err.message);
    }
  };

  return (
    <div className="login-page">
      <LoginForm login={handleLogin} loading={loading} error={error} />
    </div>
  );
}

export default LoginPage;
