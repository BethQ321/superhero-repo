import React, { useState, useEffect } from "react";
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
  const [selectedClass, setSelectedClass] = useState("All");
  const [showVipOnly, setShowVipOnly] = useState(false);

  const addProductToWishlist = async (product) => {
    try {
      const response = await axios.post(
        "/api/wishList",
        { productId: product.id },
        api.getHeaders()
      );
      console.log("Product added to wishlist:", response.data);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const filterProductsByClass = (selectedClass) => {
    if (selectedClass === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.class === selectedClass);
      setFilteredProducts(filtered);
    }
  };

  const handleVipCheckboxChange = () => {
    setShowVipOnly(!showVipOnly);
    if (!showVipOnly) {
      const vipFilteredProducts = products.filter((product) => product.vip_only);
      setFilteredProducts(vipFilteredProducts);
    } else {
      filterProductsByClass(selectedClass);
    }
  };

  useEffect(() => {
    if (!showVipOnly) {
      filterProductsByClass(selectedClass);
    }
  }, [selectedClass, showVipOnly, products]);

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

      <div className="product-filter">
        <label>Filter by Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="All">All</option>
          <option value="suit">Suit</option>
          <option value="vehicle">Vehicle</option>
          <option value="mystic">Mystic</option>
          <option value="tech">Tech</option>
        </select><br></br>

        {auth.is_vip ? (
          <label>
            <input
              type="checkbox"
              checked={showVipOnly}
              onChange={handleVipCheckboxChange}
            />
            Show VIP Items Only
          </label>
        ) : null }
      </div>

      <ul className="product-list">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (lineItem) => lineItem.product_id === product.id
          );
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.vip_only ? `${product.name} (VIP Item!)` : product.name}
                <br></br>
                <img
                  className="productImage"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              : {product.description} - {formatPrice(product.price)}
              {auth.id ? (
                cartItem ? (
                  <>
                    <Link to={`/cart`}>Added!</Link>
                    <button onClick={() => updateLineItem(cartItem)}>
                      Add Another
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
