import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navigations = ({ auth, products, orders, cartCount, logout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const isLoggedIn = auth && auth.id;

  const vipProductsCount = auth.is_vip
    ? products.length
    : products.filter((product) => !product.vip_only).length;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="nav-container">
      {/* Existing Nav Links */}
      {isLoggedIn ? (
        <>
          <NavLink to="/">
            <img src="/public/logo.png" alt="logo" />
          </NavLink>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
          <NavLink to="/orders">
            Orders ({orders.filter((order) => !order.is_cart).length})
          </NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <span className="user-greeting">Welcome {auth.username}!</span>

          {/* Dropdown Menu Toggle */}
          <button onClick={toggleDropdown} className="dropdown-toggle">
            Menu
          </button>

          {/* Dropdown Menu */}
          {isDropdownVisible && (
            <div className="dropdown-menu active">
              {" "}
              {/* Add 'active' class */}
              <NavLink to="/wishList">Wishlist</NavLink>
              <NavLink to="/profile">Profile Settings</NavLink>
              {auth.is_admin && <NavLink to="/admin">Admin</NavLink>}
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </>
      ) : (
        // Not Logged in Links
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigations;
