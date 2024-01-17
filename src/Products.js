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
    <div>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
      />
     {/* <button onClick={handleSearchClick}>Search</button> */}
      <button onClick={handleShowAllClick}>Show All</button>
      <ul>
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          return (
            <li key={product.id}>
              {auth.is_vip ? `${product.name} VIP Item!` : product.name}{" "}
              <img className="productImage" src={product.image} alt={product.name} /> :{" "}
              {product.description} - {formatPrice(product.price)}
              {auth.id ? (
                cartItem ? (
                  <>
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