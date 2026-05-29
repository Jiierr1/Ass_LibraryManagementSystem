// pages/SettingsPage.js
import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const SettingsPage = () => {
  const { state, dispatch } = useLibrary();
  const { settings } = state;
  const [maxDays, setMaxDays] = useState(settings.maxLoanDays);
  const [finePerDay, setFinePerDay] = useState(settings.finePerDay);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: {
        maxLoanDays: parseInt(maxDays),
        finePerDay: parseFloat(finePerDay),
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <h2>System Settings</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Loan Policies</h5>
            </div>
            <div className="card-body">
              {saved && (
                <div className="alert alert-success">
                  Settings saved successfully!
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Maximum Loan Days (days)</label>
                <input
                  type="number"
                  className="form-control"
                  value={maxDays}
                  onChange={(e) => setMaxDays(e.target.value)}
                  min="1"
                  max="90"
                />
                <small className="text-muted">
                  Default borrowing period for new loans
                </small>
              </div>
              <div className="mb-3">
                <label className="form-label">Fine per Day ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={finePerDay}
                  onChange={(e) => setFinePerDay(e.target.value)}
                  min="0"
                />
                <small className="text-muted">
                  Amount charged per day overdue
                </small>
              </div>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Current Policy Preview</h5>
            </div>
            <div className="card-body">
              <p>
                <strong>Loan Duration:</strong> {maxDays} days
              </p>
              <p>
                <strong>Overdue Fine:</strong> ${finePerDay} per day
              </p>
              <hr />
              <h6>Example Calculation:</h6>
              <p>
                If a book is returned 5 days late → Fine = 5 × ${finePerDay} ={" "}
                <strong>${(5 * finePerDay).toFixed(2)}</strong>
              </p>
              <p className="text-muted small mt-3">
                These settings apply to all new loans and returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
