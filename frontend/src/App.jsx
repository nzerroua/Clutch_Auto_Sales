// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CarDetails from "./pages/CarDetails";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer"; // ✅ import Footer
import Financing from "./pages/Financing";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContactForms from "./pages/AdminContactForms";
import AdminFinancingRequests from "./pages/AdminFinancingRequests";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main style={{ paddingTop: "80px", flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Financing" element={<Financing />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-car"
            element={
              <PrivateRoute>
                <AddCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit-car/:id"
            element={
              <PrivateRoute>
                <EditCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/contact-forms"
            element={
              <PrivateRoute>
                <AdminContactForms />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/financing-requests"
            element={
              <PrivateRoute>
                <AdminFinancingRequests />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer /> {/* ✅ Footer shown on all pages */}
    </div>
  );
}

export default App;
