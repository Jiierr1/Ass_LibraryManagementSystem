import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function HomePage() {
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
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
    {
      title: "Quantum Theory",
      author: "Dr. Alice Chen",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "Modern Design",
      author: "Marcus Vane",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    },
  ];

  return (
    <div className="bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-info" href="#">
            BiblioGlass
          </a>

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active text-info" href="#">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Catalogue
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                New Arrivals
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Categories
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="input-group">
              <span className="input-group-text bg-info border-0 text-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control border-0 bg-info bg-opacity-10"
                placeholder="Search..."
              />
            </div>

            <i className="bi bi-bell"></i>

            <img
              src="https://i.pravatar.cc/40"
              alt=""
              className="rounded-circle"
              width="40"
            />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="text-dark d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="col-md-6 bg-white bg-opacity-75 p-4 rounded">
            <h1 className="fw-bold display-5 mb-3">
              សៀវភៅគ្រប់ប្រភេទ
            </h1>

            <p className="text-secondary">
              Welcome to BiblioGlass, where tradition meets technology.
            </p>

            <div className="d-flex gap-3 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="ស្វែងរកសៀវភៅ..."
              />

              <button className="btn btn-info text-white px-4">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <small className="text-info text-uppercase">
              Fresh In The Stacks
            </small>

            <h2 className="fw-bold">New Arrivals</h2>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-light rounded-circle">
              <i className="bi bi-chevron-left"></i>
            </button>

            <button className="btn btn-light rounded-circle">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="row g-4">
          {books.map((book, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt=""
                  style={{ height: "350px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="fw-bold">{book.title}</h5>

                  <p className="text-secondary">{book.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="bg-white py-5">
        <div className="container">
          <small className="text-info text-uppercase">
            Top Borrowed
          </small>

          <h2 className="fw-bold mb-4">Popular Books</h2>

          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4" key={item}>
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                      alt=""
                      width="70"
                      className="rounded"
                    />

                    <div>
                      <h5 className="fw-bold mb-1">
                        Mastering Code
                      </h5>

                      <small className="text-secondary">
                        Robert C. Martin
                      </small>

                      <div className="text-warning mt-2">
                        ★ 4.9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold">Categories</h2>

        <p className="text-secondary">
          Browse our vast collection
        </p>

        <div className="row g-4 mt-4">
          {categories.map((cat, index) => (
            <div className="col-md-2" key={index}>
              <div className="card border-0 shadow-sm py-4 h-100">
                <div className="mb-3">
                  <i className="bi bi-book fs-1 text-info"></i>
                </div>

                <h6>{cat}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container pb-5">
        <div className="bg-info rounded-5 text-white p-5">
          <h1 className="text-center fw-bold mb-5">
            How It Works
          </h1>

          <div className="row text-center g-4">
            <div className="col-md-3">
              <i className="bi bi-person-plus fs-1"></i>

              <h5 className="mt-3">Register</h5>

              <p>Create account in seconds</p>
            </div>

            <div className="col-md-3">
              <i className="bi bi-search fs-1"></i>

              <h5 className="mt-3">Search</h5>

              <p>Find your favorite books</p>
            </div>

            <div className="col-md-3">
              <i className="bi bi-book fs-1"></i>

              <h5 className="mt-3">Borrow</h5>

              <p>Borrow online or scan QR</p>
            </div>

            <div className="col-md-3">
              <i className="bi bi-arrow-return-left fs-1"></i>

              <h5 className="mt-3">Return</h5>

              <p>Return books easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold text-info">BiblioGlass</h5>

              <p className="text-secondary">
                © 2026 BiblioGlass Library
              </p>
            </div>

            <div className="col-md-2">
              <h6>Company</h6>

              <p>About</p>

              <p>Contact</p>
            </div>

            <div className="col-md-2">
              <h6>Support</h6>

              <p>Help Center</p>

              <p>Terms</p>
            </div>

            <div className="col-md-2">
              <h6>Legal</h6>

              <p>Privacy Policy</p>

              <p>Cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default HomePage;
