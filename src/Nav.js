import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigations = ({ auth, products, orders, cartCount, logout }) => {
  const isLoggedIn = auth && auth.id;

  return (
    <nav>
      {/* Everyone can see */}
      <NavLink to='/products'>Products ({products.length})</NavLink>

      {/* Logged-in user links */}
      {isLoggedIn ? (
        <>
          <NavLink to='/orders'>Orders ({orders.filter(order => !order.is_cart).length})</NavLink>
          <NavLink to='/cart'>Cart ({cartCount})</NavLink>
          <NavLink to='/profile'>Profile Settings</NavLink>
          <NavLink to='/wishList'>Wishlist</NavLink>
          <span>
            Welcome {auth.username}!
            <button onClick={logout}>Logout</button>
          </span>
        </>
      ) : (
        <>
        {/*Not Logged in */}
          <NavLink to="/login">Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigations;
