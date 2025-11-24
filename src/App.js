import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Components
import Navbar from "./Components/User/Navbar";
import ProductList from "./Components/User/ProductList";
import VehicleCard from "./Components/User/VehicleCard";
import Home from "./Components/User/Home";
import ImportData from "./Components/User/ImportData";
import ProductFeatures from "./Components/User/ProductFeatures";
import Contact from "./Components/User/Contact";

// Admin Components
import Excel from "./Components/Admin/ImportExcel";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import ProductMaster from "./Components/Admin/ProductMaster";
import LoginPage from "./Components/Admin/Login";

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------------- USER ROUTES WITH NAVBAR ---------------- */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/vehicles" element={<VehicleCard />} />
                <Route path="/importdata" element={<ImportData />} />
                <Route path="/productfeatures" element={<ProductFeatures />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </>
          }
        />

        {/* ---------------- ADMIN LOGIN ONLY ---------------- */}
        <Route path="/login" element={<LoginPage />} />

        {/* ---------------- ADMIN SECTION WITH SIDEBAR + NAVBAR ---------------- */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="importexcel" element={<Excel />} />
          <Route path="productmaster" element={<ProductMaster />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
