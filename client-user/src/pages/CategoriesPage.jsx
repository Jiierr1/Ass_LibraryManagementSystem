// pages/CategoriesPage.js
import React, { useState } from "react";
import { useLibrary } from "../components/context/LibraryContext";

const CategoriesPage = () => {
  const { state, dispatch } = useLibrary();
  const { categories, books } = state;
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catName, setCatName] = useState("");
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    const usedInBooks = books.some((b) => b.categoryId === id);
    if (usedInBooks) {
      alert(
        "Cannot delete category used by one or more books. Reassign books first.",
      );
      return;
    }
    if (window.confirm("Delete category?"))
      dispatch({ type: "DELETE_CATEGORY", payload: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catName.trim()) return setError("Category name required");
    if (editingCat) {
      dispatch({
        type: "UPDATE_CATEGORY",
        payload: { ...editingCat, name: catName },
      });
    } else {
      dispatch({ type: "ADD_CATEGORY", payload: { name: catName } });
    }
    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingCat(null);
    setCatName("");
    setError("");
  };

  const openEdit = (cat) => {
    setEditingCat(cat);
    setCatName(cat.name);
    setShowModal(true);
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>Manage Categories</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          New Category
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Total Books</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => {
                  const bookCount = books.filter(
                    (b) => b.categoryId === cat.id,
                  ).length;
                  return (
                    <tr key={cat.id}>
                      <td>{idx + 1}</td>
                      <td>{cat.name}</td>
                      <td>{bookCount}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openEdit(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(cat.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No categories
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
                <h5>{editingCat ? "Edit Category" : "Add Category"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      autoFocus
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

export default CategoriesPage;
