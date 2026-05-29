// pages/LoansPage.js
import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const LoansPage = () => {
  const { state, dispatch } = useLibrary();
  const { books, users, loans, settings } = state;
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [message, setMessage] = useState("");

  const members = users.filter((u) => u.role === "member");
  const availableBooks = books.filter(
    (book) => !loans.some((l) => l.bookId === book.id && !l.returnDate),
  );

  const handleBorrow = () => {
    if (!selectedMember || !selectedBook) {
      setMessage("Please select both member and book");
      return;
    }
    const borrowDate = new Date().toISOString().split("T")[0];
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + settings.maxLoanDays);
    const dueDate = dueDateObj.toISOString().split("T")[0];
    dispatch({
      type: "ADD_LOAN",
      payload: {
        bookId: parseInt(selectedBook),
        memberId: parseInt(selectedMember),
        borrowDate,
        dueDate,
        returnDate: null,
      },
    });
    setShowBorrowModal(false);
    setSelectedMember("");
    setSelectedBook("");
    setMessage("");
  };

  const handleReturn = (loanId, bookId, memberId) => {
    const loan = loans.find((l) => l.id === loanId);
    if (!loan) return;
    const returnDate = new Date().toISOString().split("T")[0];
    const dueDateObj = new Date(loan.dueDate);
    const returnDateObj = new Date(returnDate);
    const daysLate = Math.max(
      0,
      Math.floor((returnDateObj - dueDateObj) / (1000 * 3600 * 24)),
    );
    const fineAmount = daysLate * settings.finePerDay;
    dispatch({
      type: "RETURN_LOAN",
      payload: { id: loanId, returnDate, fine: fineAmount },
    });
    alert(`Book returned. Fine: $${fineAmount.toFixed(2)}`);
  };

  const activeLoans = loans.filter((l) => !l.returnDate);
  const getBookTitle = (id) =>
    books.find((b) => b.id === id)?.title || "Unknown";
  const getMemberName = (id) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>Borrowing & Returns</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowBorrowModal(true)}
        >
          Borrow Book
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            Currently Borrowed Books ({activeLoans.length})
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan) => {
                  const isOverdue = new Date(loan.dueDate) < new Date();
                  return (
                    <tr key={loan.id}>
                      <td>{getBookTitle(loan.bookId)}</td>
                      <td>{getMemberName(loan.memberId)}</td>
                      <td>{loan.borrowDate}</td>
                      <td className={isOverdue ? "text-danger fw-bold" : ""}>
                        {loan.dueDate} {isOverdue && "(Overdue)"}
                      </td>
                      <td>
                        {isOverdue ? (
                          <span className="badge bg-danger">Overdue</span>
                        ) : (
                          <span className="badge bg-info">Active</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleReturn(loan.id)}
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {activeLoans.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No active loans
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showBorrowModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>New Borrowing</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowBorrowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {message && (
                  <div className="alert alert-warning">{message}</div>
                )}
                <div className="mb-3">
                  <label className="form-label">Member</label>
                  <select
                    className="form-select"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    <option value="">Select member</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Book</label>
                  <select
                    className="form-select"
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                  >
                    <option value="">Select book</option>
                    {availableBooks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} by {b.author}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="alert alert-info">
                  Max Loan: {state.settings.maxLoanDays} days | Fine: $
                  {state.settings.finePerDay}/day overdue
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowBorrowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleBorrow}>
                  Confirm Borrow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansPage;
