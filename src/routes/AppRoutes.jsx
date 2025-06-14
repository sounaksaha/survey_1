import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UploadForm from "../pages/UploadForm";
import List from "../pages/List";

import Layout from "../components/Layout";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<UploadForm />} />
        <Route path="form" element={<List />} />
        <Route path="form/:id" element={<UploadForm />} /> {/* For editing */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
