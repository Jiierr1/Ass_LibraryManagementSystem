import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
// import api from "../../service/api"; 

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  
  // State សម្រាប់គ្រប់គ្រងស្ថានភាពនៃការ Request
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // ផ្ញើ Request ទៅកាន់ Backend API (ឧទាហរណ៍៖ http://localhost:3000/api/auth/forgot-password)
      const res = await api.post("/auth/forgot-password", { 
        email: email 
      });

      console.log("OTP Sent Successfully:", res.data);
      setSuccessMessage("OTP verification code has been sent to your email.");
      
      // រង់ចាំ ១.៥ វិនាទី រួចរុញទៅកាន់ទំព័រ Verify OTP ដោយភ្ជាប់អ៊ីមែលទៅជាមួយតាម URL Parameter
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);

    } catch (err) {
      console.error("Forgot Password Error:", err);
      // ចាប់យកសារកំហុសពី Backend (ឧទាហរណ៍៖ អ៊ីមែលមិនមានក្នុងប្រព័ន្ធ)
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center p-3"
      style={{
        background: "linear-gradient(to bottom right, #eef8fb, #dff4fb)",
      }}
    >
      <div className="text-center w-100">
        {/* Top Icon */}
        <div
          className="mx-auto d-flex justify-content-center align-items-center mb-4 shadow-sm"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#c8eef8",
            borderRadius: "20px",
          }}
        >
          <ShieldCheck size={40} color="#0b7285" />
        </div>

        {/* Title */}
        <h1 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
          Forgot Password?
        </h1>

        <p
          className="text-muted mx-auto mb-4 small px-3"
          style={{
            maxWidth: "500px",
            fontSize: "16px",
          }}
        >
          Enter your institutional email below and we'll send you a recovery code to reset your account.
        </p>

        {/* Card */}
        <div
          className="bg-white shadow-lg mx-auto p-4 p-md-5"
          style={{
            maxWidth: "500px",
            borderRadius: "24px",
          }}
        >
          {/* បង្ហាញ Alert ពណ៌ក្រហមបើមាន Error ពី Backend */}
          {error && <div className="alert alert-danger py-2 small text-start">{error}</div>}
          
          {/* បង្ហាញ Alert ពណ៌បៃតងបើផ្ញើជោគជ័យ */}
          {successMessage && <div className="alert alert-success py-2 small text-start">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Label */}
            <div className="text-start mb-2">
              <label
                className="fw-bold"
                style={{
                  color: "#0b7285",
                  fontSize: "12px",
                  letterSpacing: "1px",
                }}
              >
                INSTITUTIONAL EMAIL
              </label>
            </div>

            {/* Input */}
            <div className="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
              <span className="input-group-text bg-light border-0">
                <Mail size={18} className="text-secondary" />
              </span>

              <input
                type="email"
                className="form-control border-0 bg-light py-3"
                placeholder="username@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-3 d-flex align-items-center justify-content-center border-0 shadow"
              style={{
                backgroundColor: "#0b7285",
                borderRadius: "14px",
                fontSize: "16px",
                height: "54px"
              }}
              disabled={loading}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ms-2" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-4">
            <a
              href="/login"
              className="text-decoration-none fw-semibold small d-inline-flex align-items-center transition"
              style={{ color: "#0b7285" }}
            >
              <ArrowLeft size={16} className="me-1" />
              Back to Login
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-5 pt-3">
          <h6 className="fw-bold m-0" style={{ color: "#0b7285", letterSpacing: "0.5px" }}>BiblioGlass</h6>
          <small className="text-muted opacity-70">© 2026 Management Portal</small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;