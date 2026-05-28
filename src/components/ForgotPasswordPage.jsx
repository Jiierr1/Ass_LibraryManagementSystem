import React, { useState } from "react";
import { Mail, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Send OTP to:", email);

    // call API here
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(to bottom right, #eef8fb, #dff4fb)",
      }}
    >
      <div className="text-center w-100">

        {/* Top Icon */}
        <div
          className="mx-auto d-flex justify-content-center align-items-center mb-4"
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
          className="text-muted mx-auto mb-5"
          style={{
            maxWidth: "500px",
            fontSize: "18px",
          }}
        >
          Enter your institutional email below and we'll send
          you a recovery code to reset your account.
        </p>

        {/* Card */}
        <div
          className="bg-white shadow-lg mx-auto p-5"
          style={{
            maxWidth: "500px",
            borderRadius: "24px",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Label */}
            <div className="text-start mb-2">
              <label
                className="fw-bold"
                style={{
                  color: "#0b7285",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              >
                INSTITUTIONAL EMAIL
              </label>
            </div>

            {/* Input */}
            <div className="input-group mb-4">
              <span className="input-group-text bg-light border-0">
                <Mail size={18} />
              </span>

              <input
                type="email"
                className="form-control border-0 bg-light py-3"
                placeholder="username@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-3"
              style={{
                backgroundColor: "#0b7285",
                borderRadius: "14px",
                fontSize: "18px",
              }}
            >
              Send OTP
              <ArrowRight className="ms-2" size={20} />
            </button>
          </form>

          {/* Back Login */}
          <div className="mt-4">
            <a
              href="/login"
              className="text-decoration-none fw-semibold"
              style={{ color: "#0b7285" }}
            >
              <ArrowLeft size={18} className="me-1" />
              Back to Login
            </a>
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="d-flex justify-content-center gap-4 mt-5 text-secondary">
          <ShieldCheck size={20} />
          <Mail size={20} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;