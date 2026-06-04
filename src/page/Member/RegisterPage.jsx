import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input"; 
import api from "../../service/api"; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // ឆែកឈ្មោះ
    if (!formData.fullName.trim()) {
      formErrors.fullName = "Full Name is required";
      valid = false;
    }

    // ឆែកអ៊ីមែល
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (formData.phone.trim().length < 9) {
      formErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

 
    if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
      valid = false;
    }


    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError(null);
    if (!validateForm()) return;

    setLoading(true);
    try {
      // ផ្ញើទិន្នន័យទៅកាន់ API (ឧទាហរណ៍៖ http://localhost:3000/api/auth/register)
      const res = await api.post("/auth/register", {
        fullName: formData.fullName,
        email_or_username: formData.email, // ឬប្រើ email ទៅតាមអ្វីដែល Backend រង់ចាំទទួល
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration successfully:", res.data);
      
      // ប្រសិនបើ Backend បោះ Token មកឱ្យភ្លាមៗក្រោយចុះឈ្មោះរួច
      if (res.data?.data?.token) {
        localStorage.setItem("token", res.data.data.token);
      }

      alert("Account created successfully!");
      navigate("/", { replace: true }); // រុញទៅកាន់ទំព័រដើម
    } catch (err) {
      console.error("Register Error:", err);
      setBackendError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center p-3 p-md-5"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #f8f9fa)",
      }}
    >
      <div
        className="row bg-white shadow-lg overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "1100px",
          borderRadius: "20px",
        }}
      >
        {/* Left Side: Form */}
        <div className="col-md-6 p-4 p-md-5">
          <h1 className="fw-bold mb-2 text-dark" style={{ letterSpacing: "0.5px" }}>
            Join BiblioGlass
          </h1>
          <p className="text-muted mb-4 small">
            Empowering your journey through knowledge. Create your member account below.
          </p>

          {/* បង្ហាញ Error ពី Backend ប្រសិនបើមាន */}
          {backendError && (
            <div className="alert alert-danger py-2 small">{backendError}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">Full Name</label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                icon="bi bi-person"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleChange}
                width="100%"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@gmail.com"
                icon="bi bi-envelope"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
                width="100%"
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary mb-1">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="+855 12 345 678"
                icon="bi bi-telephone"
                value={formData.phone}
                error={errors.phone}
                onChange={handleChange}
                width="100%"
              />
            </div>

            {/* Password Fields */}
            <div className="row g-2">
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold text-secondary mb-1">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  icon="bi bi-lock"
                  value={formData.password}
                  error={errors.password}
                  onChange={handleChange}
                  width="100%"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label small fw-semibold text-secondary mb-1">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  icon="bi bi-shield-lock"
                  value={formData.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={handleChange}
                  width="100%"
                />
              </div>
            </div>

            {/* Password Policy Info */}
            <div className="alert alert-info py-2 opacity-75 style={{ fontSize: '13px' }}" style={{ fontSize: "13px", backgroundColor: "#eefcff", border: "1px solid #bcebf5", color: "#007d96" }}>
              <i className="bi bi-info-circle me-2"></i> Password must be at least 8 characters long.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-semibold d-flex align-items-center justify-content-center py-2 rounded-3 border-0 mt-4"
              style={{
                backgroundColor: "#00c3e3",
                fontSize: "1rem",
                height: "46px",
              }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 small text-muted">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold" style={{ color: "#0099b8" }}>
              Login
            </a>
          </p>
        </div>

        {/* Right Side: Showcase Panel */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-center p-5"
          style={{
            background: "linear-gradient(to bottom, #dff6fb, #eefcff)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600"
            alt="Library"
            className="img-fluid rounded shadow mb-4"
            style={{
              width: "320px",
              height: "320px",
              objectFit: "cover",
            }}
          />

          <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "1.5rem" }}>Discover More</h2>
          <p className="text-muted small px-4 mb-4">
            Gain access to over 500,000 digital resources and a community of lifelong learners.
          </p>

          <div className="d-flex gap-3 mt-2 font-semibold small text-secondary">
            <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill">📚 Books</span>
            <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill">🏅 Certificates</span>
            <span className="badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill">👥 Community</span>
          </div>

          <div className="mt-5 pt-4">
            <h5 className="fw-bold m-0" style={{ color: "#0099b8", letterSpacing: "0.5px" }}>BiblioGlass</h5>
            <small className="text-muted opacity-70">© 2026 Management Portal</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;