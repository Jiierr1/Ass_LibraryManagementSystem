// pages/ReportsPage.js
import React from "react";
import { useLibrary } from "../components/context/LibraryContext";

const ReportsPage = () => {
  const { state } = useLibrary();
  const { loans, books, users, settings } = state;
  const today = new Date();

  const activeLoans = loans.filter((l) => !l.returnDate);
  const overdueLoans = activeLoans.filter((l) => new Date(l.dueDate) < today);
  const totalFineIncome = loans
    .reduce((sum, l) => sum + (l.fine || 0), 0)
    .toFixed(2);

  const getBookTitle = (id) =>
    books.find((b) => b.id === id)?.title || "Unknown";
  const getMemberName = (id) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  return (
    <div>
      <div className="page-header">
        <h2>Reports & Analytics</h2>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Currently Borrowed</h5>
              <h2 className="mb-0">{activeLoans.length}</h2>
              <small>Active loans</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Overdue Books</h5>
              <h2 className="mb-0">{overdueLoans.length}</h2>
              <small>Need attention</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Fine Income</h5>
              <h2 className="mb-0">${totalFineIncome}</h2>
              <small>Collected from late returns</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Currently Borrowed Books</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book Title</th>
                  <th>Borrower</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{getBookTitle(loan.bookId)}</td>
                    <td>{getMemberName(loan.memberId)}</td>
                    <td>{loan.borrowDate}</td>
                    <td>{loan.dueDate}</td>
                    <td>
                      {new Date(loan.dueDate) < today ? (
                        <span className="badge bg-danger">Overdue</span>
                      ) : (
                        <span className="badge bg-success">On Time</span>
                      )}
                    </td>
                  </tr>
                ))}
                {activeLoans.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No active borrowings
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Overdue Books</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book Title</th>
                  <th>Borrower</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Estimated Fine</th>
                </tr>
              </thead>
              <tbody>
                {overdueLoans.map((loan) => {
                  const due = new Date(loan.dueDate);
                  const daysOver = Math.floor(
                    (today - due) / (1000 * 3600 * 24),
                  );
                  const estFine = daysOver * settings.finePerDay;
                  return (
                    <tr key={loan.id}>
                      <td>{getBookTitle(loan.bookId)}</td>
                      <td>{getMemberName(loan.memberId)}</td>
                      <td>{loan.dueDate}</td>
                      <td className="text-danger">{daysOver} days</td>
                      <td>${estFine.toFixed(2)}</td>
                    </tr>
                  );
                })}
                {overdueLoans.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No overdue books
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Fine Collection History</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Return Date</th>
                  <th>Fine Amount</th>
                </tr>
              </thead>
              <tbody>
                {loans
                  .filter((l) => l.returnDate && l.fine > 0)
                  .map((loan) => (
                    <tr key={loan.id}>
                      <td>{getBookTitle(loan.bookId)}</td>
                      <td>{getMemberName(loan.memberId)}</td>
                      <td>{loan.returnDate}</td>
                      <td>${loan.fine.toFixed(2)}</td>
                    </tr>
                  ))}
                {loans.filter((l) => l.returnDate && l.fine > 0).length ===
                  0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No fine records yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
