import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import api from './api/index'

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  setFilteredProducts,
  auth,
  handleSearchChange,
  handleSearchClick,
  handleShowAllClick,
  filteredProducts,
  vipProducts,
  searchQuery,
  formatPrice,
  addToWishList,
}) => {

 const addProductToWishlist = async (product) => {
    try {
      const response = await axios.post('/api/wishList', { productId: product.id }, 
      api.getHeaders()
      );
      console.log('Product added to wishlist:', response.data);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };




  return (
    <div className="product-container">
      <h2>Products</h2>
  
      <div className="product-search">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={handleShowAllClick}>Show All</button>
      </div>
  
      <ul className="product-list">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          return (
            <li key={product.id}>
              {product.vip_only ? (
                <Link to={`/products/${product.id}`}>
                  {product.vip_only ? `${product.name} VIP Item` : product.name}
                  <br></br>
                  <img
                    className="productImage"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              ) : (
                <Link to={`/products/${product.id}`}>
                  {product.vip_only ? `${product.name}` : product.name}
                  <br></br>
                  <img
                    className="productImage"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              )}
              : {product.description} - {formatPrice(product.price)}
              {auth.id ? (
                cartItem ? (
                  <>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <button onClick={() => updateLineItem(cartItem)}>
                      Add Another
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => createLineItem(product)}>
                      Add to Cart
                    </button>
                    <button onClick={() => addProductToWishlist(product)}>
                      Add to Wishlist
                    </button>
                  </>
                )
              ) : null}
              {auth.is_admin ? (
                <Link to={`/products/${product.id}/edit`}>Edit</Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
