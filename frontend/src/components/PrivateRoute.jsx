// File: src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ fix for Vite

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const { exp } = jwtDecode(token); // ✅ use named import
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("admin_token");
      return <Navigate to="/admin/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("admin_token");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
