// pages/BooksPage.js
import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const BooksPage = () => {
  const { state, dispatch } = useLibrary();
  const { books, categories, loans } = state;
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    categoryId: categories[0]?.id || "",
    publishedYear: "",
  });
  const [error, setError] = useState("");

  const isBookBorrowed = (bookId) =>
    loans.some((l) => l.bookId === bookId && !l.returnDate);

  const handleDelete = (bookId) => {
    if (isBookBorrowed(bookId)) {
      alert("Cannot delete book that is currently borrowed!");
      return;
    }
    if (window.confirm("Delete this book?"))
      dispatch({ type: "DELETE_BOOK", payload: bookId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author)
      return setError("Title and Author required");
    if (editingBook) {
      dispatch({
        type: "UPDATE_BOOK",
        payload: { ...editingBook, ...formData },
      });
    } else {
      dispatch({ type: "ADD_BOOK", payload: { ...formData, id: Date.now() } });
    }
    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      isbn: "",
      categoryId: categories[0]?.id || "",
      publishedYear: "",
    });
    setError("");
  };

  const openEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn || "",
      categoryId: book.categoryId,
      publishedYear: book.publishedYear || "",
    });
    setShowModal(true);
  };

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "Uncategorized";

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>Manage Books</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Book
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  const borrowed = isBookBorrowed(book.id);
                  return (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn || "-"}</td>
                      <td>{getCategoryName(book.categoryId)}</td>
                      <td>{book.publishedYear || "-"}</td>
                      <td>
                        {borrowed ? (
                          <span className="badge bg-warning text-dark">
                            Borrowed
                          </span>
                        ) : (
                          <span className="badge bg-success">Available</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openEdit(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(book.id)}
                          disabled={borrowed}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {books.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingBook ? "Edit Book" : "Add Book"}</h5>
                <button className="btn-close" onClick={resetModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label>Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Author *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>ISBN</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Category</label>
                    <select
                      className="form-select"
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          categoryId: parseInt(e.target.value),
                        })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Published Year</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.publishedYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publishedYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
