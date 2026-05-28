import React, { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
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
        {/* Left Side */}
        <div className="col-md-6 p-5">
          <h1 className="fw-bold text-info mb-2">Join BiblioGlass</h1>

          <p className="text-muted mb-4">
            Empowering your journey through knowledge.
            <br />
            Create your member account below.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>

              <div className="input-group">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <span className="input-group-text bg-white">
                  <User size={18} />
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                <span className="input-group-text bg-white">
                  <Mail size={18} />
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number</label>

              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="+855 12 345 678"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <span className="input-group-text bg-white">
                  <Phone size={18} />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <span className="input-group-text bg-white">
                    <Lock size={18} />
                  </span>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Info */}
            <div className="alert alert-info small">
              Password must be at least 8 characters with one special symbol.
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-info w-100 text-white fw-bold py-2"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-muted">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        {/* Right Side */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-5"
          style={{
            background: "linear-gradient(to bottom, #dff6fb, #eefcff)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600"
            alt="Library"
            className="img-fluid rounded shadow mb-4"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
            }}
          />

          <h2 className="fw-bold text-info">Discover More</h2>

          <p className="text-muted">
            Gain access to over 500,000 digital resources and a community of
            lifelong learners.
          </p>

          <div className="d-flex gap-4 mt-3">
            <div>📚 Books</div>
            <div>🏅 Certificates</div>
            <div>👥 Community</div>
          </div>

          <div className="mt-5">
            <h4 className="fw-bold text-info">BiblioGlass</h4>

            <small className="text-muted">© 2026 Management Portal</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
