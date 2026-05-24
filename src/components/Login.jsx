import React, { useState } from "react";
function Login({ login, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation error
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email RegExp
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Email
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Clear error
    setEmailError("");

    login(email, password);
  };

  return (
    <div className="min-vh-100 w-100" style={{ borderRadius: "16px" }}>
      <div className="row g-0 min-vh-100 ">
        {/* Left Side: Dark Teal Cover Image/Panel */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-end p-5 text-white position-relative"
          style={{
            background:
              'linear-gradient(rgba(11, 62, 71, 0.85), rgba(11, 62, 71, 0.95)), url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000") center/cover',
            minHeight: "550px",
          }}
        >
          <div className="position-absolute top-0 start-0 m-5">
            <h4 className="fw-bold">
              <i className="bi bi-book-half me-2"></i>BiblioGlass
            </h4>
          </div>
          <div>
            <h2 className="fw-bold mb-3 display-6">
              Elevating Knowledge Discovery
            </h2>
            <p className="text-white-50 lh-base">
              Access our global collection of literature and academic resources
              through a modern, seamless management interface.
            </p>
          </div>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="col-md-6 bg-white d-flex justify-content-center align-items-center p-5">
          <div className="w-100" style={{ maxWidth: "640px" }}>
            <h2 className="fw-bold text-dark mb-1 fs-2">Welcome Back</h2>

            <p className="text-muted small mb-4 fs-5">
              Please enter your credentials to access your portal.
            </p>

            {error && (
              <div className="alert alert-danger py-2 small">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary fs-5">
                  Email Address
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control form-control-lg border-start-0 ps-0"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    required
                  />
                </div>
                {emailError && (
                  <div className="text-danger small mt-1">{emailError}</div>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small fw-semibold text-secondary mb-0 fs-6">
                    Password
                  </label>

                  <a
                    href="#"
                    className="text-decoration-none fw-semibold fs-6"
                    style={{ color: "#0099b8" }}
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg border-start-0 ps-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <span
                    className="input-group-text bg-white border-start-0 text-muted"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    ></i>
                  </span>
                </div>
              </div>

              {/* Remember Me */}
              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />

                <label
                  className="form-check-label small text-muted"
                  htmlFor="rememberMe"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-info w-100 text-white fw-semibold fs-5 d-flex align-items-center justify-content-center py-2 rounded-4 border-0"
                disabled={loading}
              >
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    Login to Dashboard
                    <i className="bi bi-arrow-right ms-2"></i>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="position-relative my-4 text-center">
              <hr className="text-muted opacity-25" />

              <span
                className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted text-uppercase fw-semibold"
                style={{
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
              >
                Or continue with
              </span>
            </div>

            {/* OAuth Buttons */}
            <div className="row g-3">
              {/* Google Button */}
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-3 border-light-subtle text-dark"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    height: "40px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.55 2.95-2.22 5.44-4.72 7.12l7.36 5.7C43.68 37.49 46.5 31.43 46.5 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.36-5.7c-2.11 1.42-4.81 2.3-8.53 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>

                  <span>Google</span>
                </button>
              </div>

              {/* SSO Button */}
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 border-light-subtle"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    height: "40px",
                    color: "#212529",
                  }}
                >
                  <i
                    className="bi bi-building"
                    style={{
                      color: "#6c757d",
                      fontSize: "16px",
                    }}
                  ></i>

                  <span>SSO</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center small text-muted mt-4 mb-0">
              New here?{" "}
              <a
                href="#"
                className="text-decoration-none fw-semibold"
                style={{ color: "#0099b8" }}
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
