import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../page/Member/LoginPage";
import Homepage from "../page/Member/HomePage";
import ProtectedRoute from "./protectedRoute";
import RegisterPage from "../page/Member/RegisterPage";
import ForgotPasswordPage from "../components/ForgotPasswordPage";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
