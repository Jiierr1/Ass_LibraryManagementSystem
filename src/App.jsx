// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sidebar from "./adminblog/page/Sidebar";
import Dashboard from "./adminblog/page/Dashboard";
import UsersPage from "./adminblog/page/UsersPage";
import BooksPage from "./adminblog/page/BooksPage";
import CategoriesPage from "./adminblog/page/CategoriesPage";
import LoansPage from "./adminblog/page/LoansPage";
import SettingsPage from "./adminblog/page/SettingsPage";
import ReportsPage from "./adminblog/page/ReportsPage";
import { LibraryProvider } from "./adminblog/context/LibraryContext";
import "./App.css";

function App() {
  return (
    <LibraryProvider>
      <Router>
        <div className="app-container d-flex">
          <Sidebar />
          <main className="main-content flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LibraryProvider>
  );
}

export default App;
