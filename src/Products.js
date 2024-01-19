import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./api/index";

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
  const [wishlistErrors, setWishlistErrors] = useState({});

  const addProductToWishlist = async (product) => {
    try {
      setWishlistErrors({ ...wishlistErrors, [product.id]: '' });

      const response = await axios.post(
        "/api/wishList",
        { productId: product.id },
        api.getHeaders()
      );
      console.log("Product added to wishlist:", response.data);
    } catch (error) {
      setWishlistErrors({
        ...wishlistErrors,
        [product.id]: 'Item is already on your wishlist'
      });
      console.error("Error adding product to wishlist:", error);
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
        <button onClick={handleShowAllClick}>Show All</button>
      </div>

      <ul className="product-list">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );

          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <br />
                <img
                  className="productImage"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div>{product.description} - {formatPrice(product.price)}</div>
              <div className="product-actions">
                {auth.id ? (
                  cartItem ? (
                    <div className="button-group">
                      <Link to={`/cart`}>Added!</Link>
                      <button onClick={() => updateLineItem(cartItem)}>
                        Add Another
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="button-group">
                        <button
                          className="add-to-cart"
                          onClick={() => createLineItem(product)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="add-to-wishlist"
                          onClick={() => addProductToWishlist(product)}
                        >
                          Add to Wishlist
                        </button>
                      </div>
                      {wishlistErrors[product.id] && (
                        <div className="wishlist-error">
                          {wishlistErrors[product.id]}
                        </div>
                      )}
                    </div>
                  )
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
