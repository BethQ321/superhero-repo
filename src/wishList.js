import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "./api/index";

const WishList = ({ cart, auth, products, lineItems, setLineItems }) => {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartErrors, setAddToCartErrors] = useState({});

  useEffect(() => {
    const fetchWishList = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/wishList", api.getHeaders());
        setWishList(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
      setIsLoading(false);
    };

    fetchWishList();
  }, [auth, products]);

  const handleAddToCartFromWishlist = async (item) => {
    const { product_id, wishlist_id } = item;
    const productToAdd = products.find((p) => p.id === product_id);

    if (!productToAdd) {
      setAddToCartErrors({
        ...addToCartErrors,
        [wishlist_id]: "Product not found.",
      });
      return;
    }

    const isItemInCart = lineItems.some(
      (lineItem) => lineItem.product_id === product_id
    );

    if (isItemInCart) {
      setAddToCartErrors({
        ...addToCartErrors,
        [wishlist_id]: "This item is already in your cart.",
      });
      return;
    }

    try {
      await api.createLineItem({
        product: productToAdd,
        cart: cart,
        lineItems: lineItems,
        setLineItems: setLineItems,
      });

      const response = await axios.delete(
        `/api/wishList/${wishlist_id}`,
        api.getHeaders()
      );

      setWishList((prevWishList) =>
        prevWishList.filter((item) => item.wishlist_id !== wishlist_id)
      );
    } catch (error) {
      console.error("Error in handleAddToCartFromWishlist:", error);
      setAddToCartErrors({
        ...addToCartErrors,
        [wishlist_id]: "Error processing your request.",
      });
    }
  };

  const handleRemove = async (wishlistItemId) => {
    try {
      await axios.delete(`/api/wishList/${wishlistItemId}`, api.getHeaders());
      setWishList((prevWishList) =>
        prevWishList.filter((item) => item.wishlist_id !== wishlistItemId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="product-container">
      <h2>Wish List</h2>
      {isLoading ? (
        <p>Loading wish list...</p>
      ) : wishList.length === 0 ? (
        <p>No items in your wish list.</p>
      ) : (
        <ul className="product-list" style={{ marginRight:"20px"}}>
          {wishList.map((item) => (
            <li className="product-box" key={item.wishlist_id}>
              <Link to={`/products/${item.product_id}`} className="product-link">
                <img
                  className="productImage"
                  src={item.product_image}
                  alt={item.product_name}
                />
              </Link>
              <br/>
              <div className="product-description">
                <Link to={`/products/${item.product_id}`}>
                  {item.product_name}
                </Link>
                <br />
                <br />
                ${item.product_price}
                <br />
                
              </div>
              <div className="product-actions">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCartFromWishlist(item)}
                  style={{border:"2px solid #373737"}}
                >
                  Add to Cart
                </button>
                <button
                  className="remove-from-wishlist"
                  onClick={() => handleRemove(item.wishlist_id)}
                  style={{border:"2px solid #373737"}}
                >
                  Remove
                </button>
                {addToCartErrors && addToCartErrors[item.wishlist_id] && (
                  <div className="wishlist-error">
                    {addToCartErrors[item.wishlist_id]}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
