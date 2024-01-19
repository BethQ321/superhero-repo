import React from "react";
import { Link, NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Administrator</h1>
      <NavLink className="admin-nav-link" to="/addproduct">Add Product</NavLink>
      <NavLink className="admin-nav-link" to="/allusers">Users</NavLink>
      <NavLink className="admin-nav-link" to="/editproducts">Edit Products</NavLink>
      <NavLink className="admin-nav-link" to="/allorders">Orders</NavLink>
    </div>
  );
};

export default Admin;
