import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navigations = ({ auth, products, orders, cartCount, logout, toggleDarkMode, isDarkMode }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const isLoggedIn = auth && auth.id;

  const vipProductsCount = auth.is_vip
    ? products.length
    : products.filter((product) => !product.vip_only).length;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="nav-container">
      {isLoggedIn ? (
        <>
          <NavLink to="/">
            <img src="/public/logo.png" alt="logo" />
          </NavLink>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/orders">
            Orders ({orders.filter((order) => !order.is_cart).length})
          </NavLink>
          <span className="user-greeting">Welcome {auth.username}!</span>

          <div className="menu-and-dark-mode">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Menu
            </button>
            <label className="dark-mode-switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              
            </label>
          </div>

          {isDropdownVisible && (
            <div ref={dropdownRef} className="dropdown-menu active">
              <NavLink to="/wishList">Wishlist</NavLink>
              <NavLink to="/profile">Profile Settings</NavLink>
              {auth.is_admin && <NavLink to="/admin">Admin</NavLink>}
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </>
      ) : (
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
