import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api/index';

const WishList = ({ cart, updateCart, auth, products, lineItems, setLineItems}) => {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const { product_id } = item;
    const productToAdd = products.find((p) => p.id === product_id);
    console.log('productToAdd', productToAdd)
    if (!productToAdd) {
  
      console.error(`Product not found for ID: ${product_id}`);
      return;
    }
  
    if (!cart || !cart.id) {
      console.error('Invalid cart or cart ID not found');
      return;
    }
  
    try {
      console.log('Adding item to cart:', {
        product: productToAdd,
        cart: cart,
        lineItems: lineItems,
      });
  
      await api.createLineItem({
        product: productToAdd,
        cart: cart,
        lineItems: lineItems,
        setLineItems: setLineItems,
      });
  
      const updatedLineItems = await api.fetchLineItems();
      setLineItems(updatedLineItems);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    console.log('Type of setLineItems:', typeof setLineItems);

  };
  


  const handleRemove = async (wishlistItemId) => {
    try {
      await axios.delete(`/api/wishList/${wishlistItemId}`, api.getHeaders());
      setWishList(prevWishList => prevWishList.filter(item => item.wishlist_id !== wishlistItemId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };


  return (
    <div>
      <h2>Wish List</h2>
      {isLoading ? (
        <p>Loading wish list...</p>
      ) : wishList.length === 0 ? (
        <p>No items in your wish list.</p>
      ) : (
        <ul>
          {wishList.map((item) => (
            <li key={item.wishlist_id}>
              <img src={item.product_image} alt={item.product_name} />
              <div>{item.product_name} - ${item.product_price}</div>
              <div>{item.product_description}</div>
              <button onClick={() => handleAddToCartFromWishlist(item)}>Add to Cart</button>
              <button onClick={() => handleRemove(item.wishlist_id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
