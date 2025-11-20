import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Components
import Navbar from "./Components/User/Navbar";
import ProductList from "./Components/User/ProductList";
import VehicleCard from "./Components/User/VehicleCard";
import Home from "./Components/User/Home";
import ImportData from "./Components/User/ImportData";

// Admin Components
import Excel from "./Components/Admin/ImportExcel";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import ProductMaster from "./Components/Admin/ProductMaster";


function App() {
  return (
    <Router>
      {/* User Navbar always visible */}
      <Navbar />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/vehicles" element={<VehicleCard />} />
        <Route path="/importdata" element={<ImportData />} />

        {/* Admin Routes wrapped with AdminLayout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Excel />} /> {/* default admin route /admin */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="importexcel" element={<Excel />} />
           <Route path="productmaster" element={<ProductMaster />} />

          {/* add other admin nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
