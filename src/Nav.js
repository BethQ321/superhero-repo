import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navigations = ({
  auth,
  products,
  orders,
  cartCount,
  logout,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const isLoggedIn = auth && auth.id;

  let displayedProducts = products;

  if (!isDarkMode) {
    displayedProducts = displayedProducts.filter(
      (product) => product.class !== "villain"
    );
  }

  const vipProductsCount = auth.is_vip
    ? displayedProducts.length
    : displayedProducts.filter((product) => !product.vip_only).length;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  // const toggleDarkMode = () => {
  //   const newMode = !isDarkMode;
  //   setIsDarkMode(newMode);
  //   localStorage.setItem("darkMode", newMode ? "1" : "0");

  //   // Add this line to toggle the dark mode class on the body element
  //   document.body.classList.toggle("dark-mode");
  // };

  // useEffect(() => {
  //   const storedMode = localStorage.getItem("darkMode");
  //   setIsDarkMode(storedMode === "1");
  // }, []);f

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
            {auth.image ? (
              <img className="profile-image" src={auth.image} alt="Profile" />
              ) : (
                <img
                className="profile-image"
                src="https://i.imgur.com/yoJLg9c.png"
                alt="Profile"
                />
                )}
          </NavLink>
                <span className="user-greeting">Welcome {auth.fname}!</span>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/orders">
            Orders ({orders.filter((order) => !order.is_cart).length})
          </NavLink>

          <div className="menu-and-dark-mode">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Menu
            </button>
            <button
              className="dark-modde-button"
              onClick={toggleDarkMode}
            ></button>
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
