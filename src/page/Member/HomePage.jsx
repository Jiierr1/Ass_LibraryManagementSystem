import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function HomePage() {
  const navigate = useNavigate();

  // ផ្ទៀងផ្ទាត់សុវត្ថិភាព៖ ប្រសិនបើគ្មាន Token ទេ មិនអនុញ្ញាតឱ្យចូលមើលទំព័រដើមឡើយ
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const categories = [
    "វិទ្យាសាស្ត្រ",
    "ប្រវត្តិសាស្ត្រ",
    "កូដ",
    "គណិតវិទ្យា",
    "ភាសាបរទេស",
    "បច្ចេកវិទ្យា",
  ];

  const books = [
    {
      title: "The Digital Age",
      author: "John Sterling",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
    {
      title: "Quantum Theory",
      author: "Dr. Alice Chen",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "Modern Design",
      author: "Marcus Vane",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    },
  ];

  const brandColor = "#00c3e3";

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#" style={{ color: brandColor, fontSize: "1.5rem" }}>
            BiblioGlass
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
              <li className="nav-item">
                <a className="nav-link active" href="#" style={{ color: brandColor }}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Catalogue</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">New Arrivals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Categories</a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              <div className="input-group shadow-sm rounded-pill overflow-hidden" style={{ maxWidth: "250px" }}>
                <span className="input-group-text border-0 text-white" style={{ backgroundColor: brandColor }}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search..."
                  style={{ backgroundColor: "#f1f3f5" }}
                />
              </div>

              <button className="btn position-relative border-0 p-1">
                <i className="bi bi-bell fs-5 text-secondary"></i>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>

              {/* User Dropdown Profile & Logout */}
              <div className="dropdown">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="rounded-circle shadow-sm dropdown-toggle"
                  width="40"
                  height="40"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ objectFit: "cover" }}
                />
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                  <li><a className="dropdown-item py-2 small" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                  <li><a className="dropdown-item py-2 small" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item py-2 small text-danger fw-semibold" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="d-flex align-items-center position-relative"
        style={{
          minHeight: "450px",
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.4)), url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <div className="col-12 col-md-6 p-4 p-md-5 rounded-4 bg-white shadow-lg">
            <h1 className="fw-bold display-5 mb-3 text-dark">
              សៀវភៅគ្រប់ប្រភេទ
            </h1>
            <p className="text-secondary mb-4">
              Welcome to BiblioGlass, where tradition meets technology. Elevate your learning experience.
            </p>

            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control py-2 shadow-sm border-light-subtle rounded-3"
                placeholder="ស្វែងរកសៀវភៅ..."
              />
              <button className="btn text-white px-4 fw-semibold shadow rounded-3 border-0" style={{ backgroundColor: brandColor }}>
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <small className="fw-bold text-uppercase tracking-wider" style={{ color: brandColor }}>
              Fresh In The Stacks
            </small>
            <h2 className="fw-bold m-0 text-dark">New Arrivals</h2>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-white bg-white shadow-sm rounded-circle p-2 border-0"><i className="bi bi-chevron-left d-flex"></i></button>
            <button className="btn btn-white bg-white shadow-sm rounded-circle p-2 border-0"><i className="bi bi-chevron-right d-flex"></i></button>
          </div>
        </div>

        <div className="row g-4">
          {books.map((book, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden card-hover">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div className="card-body p-4">
                  <h5 className="fw-bold text-dark text-truncate mb-1">{book.title}</h5>
                  <p className="text-muted small m-0">{book.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="bg-white py-5">
        <div className="container">
          <small className="fw-bold text-uppercase tracking-wider" style={{ color: brandColor }}>Top Borrowed</small>
          <h2 className="fw-bold mb-4 text-dark">Popular Books</h2>

          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-12 col-md-4" key={item}>
                <div className="card border-0 shadow-sm rounded-3 bg-light p-2">
                  <div className="card-body d-flex gap-3 align-items-center p-2">
                    <img
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                      alt=""
                      width="65"
                      height="85"
                      className="rounded shadow-sm"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="overflow-hidden">
                      <h6 className="fw-bold mb-1 text-dark text-truncate">Mastering Code</h6>
                      <small className="text-muted d-block text-truncate mb-1">Robert C. Martin</small>
                      <div className="text-warning small"><i className="bi bi-star-fill me-1"></i>4.9</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold text-dark mb-1">Categories</h2>
        <p className="text-muted small mb-4">Browse our vast collection</p>

        <div className="row g-3 mt-2 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-6 col-sm-4 col-md-2" key={index}>
              <div className="card border-0 shadow-sm py-4 h-100 rounded-4" style={{ cursor: "pointer", backgroundColor: "#fff" }}>
                <div className="mb-2">
                  <i className="bi bi-book fs-2" style={{ color: brandColor }}></i>
                </div>
                <h6 className="m-0 fw-semibold text-dark px-2 small">{cat}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works Section */}
      <section className="container pb-5">
        <div className="rounded-5 text-white p-5 shadow" style={{ background: `linear-gradient(135deg, ${brandColor}, #009cb5)` }}>
          <h1 className="text-center fw-bold mb-5">How It Works</h1>

          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <i className="bi bi-person-plus fs-1"></i>
              <h5 className="mt-3 fw-bold">Register</h5>
              <p className="small opacity-75 mb-0">Create account in seconds</p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-search fs-1"></i>
              <h5 className="mt-3 fw-bold">Search</h5>
              <p className="small opacity-75 mb-0">Find your favorite books</p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-book fs-1"></i>
              <h5 className="mt-3 fw-bold">Borrow</h5>
              <p className="small opacity-75 mb-0">Borrow online or scan QR</p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-arrow-return-left fs-1"></i>
              <h5 className="mt-3 fw-bold">Return</h5>
              <p className="small opacity-75 mb-0">Return books easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-5 border-top text-secondary small">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <h5 className="fw-bold mb-2" style={{ color: brandColor }}>BiblioGlass</h5>
              <p className="text-muted mb-0">© 2026 BiblioGlass Library Management Portal.</p>
            </div>
            <div className="col-4 col-md-2">
              <h6 className="fw-bold text-dark mb-3">Company</h6>
              <p className="mb-2">About</p>
              <p className="mb-0">Contact</p>
            </div>
            <div className="col-4 col-md-2">
              <h6 className="fw-bold text-dark mb-3">Support</h6>
              <p className="mb-2">Help Center</p>
              <p className="mb-0">Terms</p>
            </div>
            <div className="col-4 col-md-2">
              <h6 className="fw-bold text-dark mb-3">Legal</h6>
              <p className="mb-2">Privacy Policy</p>
              <p className="mb-0">Cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;