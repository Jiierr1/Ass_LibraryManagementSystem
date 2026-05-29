// pages/Dashboard.js
import React from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  FiBook,
  FiUsers,
  FiBookOpen,
  FiClock,
  FiDollarSign,
  FiUserCheck,
} from "react-icons/fi";

const Dashboard = () => {
  const { state } = useLibrary();
  const { users, books, loans, settings } = state;

  const activeLoans = loans.filter((l) => !l.returnDate).length;
  const overdueLoans = loans.filter(
    (l) => !l.returnDate && new Date(l.dueDate) < new Date(),
  ).length;
  const totalMembers = users.filter((u) => u.role === "member").length;
  const totalIncome = loans
    .reduce((sum, l) => sum + (l.fine || 0), 0)
    .toFixed(2);

  const stats = [
    {
      title: "Total Books",
      value: books.length,
      bgColor: "#819ced", // deep blue
      textColor: "#ffffff",
      icon: FiBook,
      iconBg: "rgba(255,255,255,0.2)",
    },
    {
      title: "Active Members",
      value: totalMembers,
      bgColor: "#66e684", // forest green
      textColor: "#ffffff",
      icon: FiUsers,
      iconBg: "rgba(255,255,255,0.2)",
    },
    {
      title: "Books Borrowed",
      value: activeLoans,
      bgColor: "#d4b75e", // golden
      textColor: "#ffffff",
      icon: FiBookOpen,
      iconBg: "rgba(255,255,255,0.2)",
    },
    {
      title: "Overdue Books",
      value: overdueLoans,
      bgColor: "#b9757c", // rich red
      textColor: "#ffffff",
      icon: FiClock,
      iconBg: "rgba(255,255,255,0.2)",
    },
    {
      title: "Total Fine Income",
      value: `$${totalIncome}`,
      bgColor: "#08d5f5", // teal
      textColor: "#ffffff",
      icon: FiDollarSign,
      iconBg: "rgba(255,255,255,0.2)",
    },
    {
      title: "Librarians",
      value: users.filter((u) => u.role === "librarian").length,
      bgColor: "#63a1d7", // slate gray
      textColor: "#ffffff",
      icon: FiUserCheck,
      iconBg: "rgba(255,255,255,0.2)",
    },
  ];

  const recentLoans = [...loans].sort((a, b) => b.id - a.id).slice(0, 5);
  const getBookTitle = (id) =>
    books.find((b) => b.id === id)?.title || "Unknown";
  const getMemberName = (id) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <p className="text-muted">Welcome back, Administrator</p>
      </div>

      <div className="row g-4 mb-5">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div className="col-md-4 col-lg-3" key={idx}>
              <div
                className="card card-stats border-2 shadow-xl h-100"
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.textColor,
                  borderRadius: "1rem",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6
                        className="text-uppercase mb-1 small fw-semibold"
                        style={{ opacity: 0.85 }}
                      >
                        {stat.title}
                      </h6>
                      <h3 className="mb-0 ">{stat.value}</h3>
                    </div>
                    <div
                      className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: stat.iconBg }}
                    >
                      <IconComponent size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of the component remains same as before (Recent Borrowing Activity, System Settings, Quick Links) */}
      {/* ... (keep the exact same code from previous version for the rest) */}

      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white border-0 pt-3">
          <h5 className="mb-0 fw-semibold">Recent Borrowing Activity</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="ps-3">Book</th>
                  <th>Member</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLoans.map((loan) => {
                  const isOverdue =
                    !loan.returnDate && new Date(loan.dueDate) < new Date();
                  return (
                    <tr key={loan.id}>
                      <td className="ps-3 fw-medium">
                        {getBookTitle(loan.bookId)}
                      </td>
                      <td>{getMemberName(loan.memberId)}</td>
                      <td>{loan.borrowDate}</td>
                      <td>{loan.dueDate}</td>
                      <td>
                        {loan.returnDate ? (
                          <span className="badge bg-secondary rounded-pill px-3">
                            Returned
                          </span>
                        ) : isOverdue ? (
                          <span className="badge bg-danger rounded-pill px-3">
                            Overdue
                          </span>
                        ) : (
                          <span className="badge bg-success rounded-pill px-3">
                            Active
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {recentLoans.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No loans found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="mb-0 fw-semibold">System Settings</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-2 me-3"
                  style={{ backgroundColor: "#e8f0fe" }}
                >
                  <FiClock size={20} color="#2d4a9f" />
                </div>
                <div>
                  <p className="mb-0 text-muted small">Max Loan Days</p>
                  <p className="mb-0 fw-bold">{settings.maxLoanDays} days</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle p-2 me-3"
                  style={{ backgroundColor: "#fdebe9" }}
                >
                  <FiDollarSign size={20} color="#c82333" />
                </div>
                <div>
                  <p className="mb-0 text-muted small">Fine per Day</p>
                  <p className="mb-0 fw-bold">${settings.finePerDay}</p>
                </div>
              </div>
              <hr />
              <p className="text-muted small mb-0">
                Update these in <strong>System Settings</strong> page
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-header bg-white border-0 pt-3">
              <h5 className="mb-0 fw-semibold">Quick Links</h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-3">
                <a
                  href="/books"
                  className="btn btn-outline-primary rounded-pill px-4 py-2"
                >
                  <FiBook size={16} className="me-2" /> Add New Book
                </a>
                <a
                  href="/users"
                  className="btn btn-outline-success rounded-pill px-4 py-2"
                >
                  <FiUsers size={16} className="me-2" /> Register Member
                </a>
                <a
                  href="/loans"
                  className="btn btn-outline-warning rounded-pill px-4 py-2"
                >
                  <FiBookOpen size={16} className="me-2" /> Borrow Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
