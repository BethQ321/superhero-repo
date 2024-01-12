import React from "react";
import { NavLink } from "react-router-dom";

const Navigations = ({ auth, products, orders, cartCount, logout }) => {
  const isLoggedIn = auth && auth.id;

  const vipProductsCount = auth.is_vip
    ? products.length
    : products.filter((product) => !product.vip_only).length;

  return (
    <nav>
      {/* Logged-in user links */}
      {isLoggedIn ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
          <NavLink to="/orders">
            Orders ({orders.filter((order) => !order.is_cart).length})
          </NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          <NavLink to="/profile">Profile Settings</NavLink>
          <NavLink to="/wishList">Wishlist</NavLink>
          <span>
            Welcome {auth.username}!<button onClick={logout}>Logout</button>
          </span>
        </>
      ) : (
        <>
          {/*Not Logged in */}
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/products">Products ({vipProductsCount})</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigations;
