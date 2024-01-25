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
  isDarkMode,
}) => {
  const [selectedClass, setSelectedClass] = useState("All");
  const [showVipOnly, setShowVipOnly] = useState(false);
  const [wishlistErrors, setWishlistErrors] = useState({});
  const [wishlistStatus, setWishlistStatus] = useState({});

  const addProductToWishlist = async (product) => {
    try {
      setWishlistErrors({ ...wishlistErrors, [product.id]: "" });

      const response = await axios.post(
        "/api/wishList",
        { productId: product.id },
        api.getHeaders()
      );
      setWishlistStatus({ ...wishlistStatus, [product.id]: true });
    } catch (error) {
      setWishlistErrors({
        ...wishlistErrors,
        [product.id]: "Item is already on your wishlist",
      });
      console.error("Error adding product to wishlist:", error);
    }
  };
  const filterProductsByClass = (selectedClass) => {
    let filtered = products;
  
    if (selectedClass !== "All") {
      filtered = filtered.filter((product) => product.class === selectedClass);
    }
  
    if (!auth.is_vip) {
      filtered = filtered.filter((product) => !product.vip_only);
    }
  
    if (!auth.id) { // Check if the user is not logged in
      filtered = filtered.filter((product) => !product.vip_only);
    }
  
    if (!isDarkMode) { // Check if it's not dark mode
      filtered = filtered.filter((product) => product.class !== "villain");
    }
  
    setFilteredProducts(filtered);
  };
  
 

  useEffect(() => {
    let updatedFilteredProducts = products;
  
    if (selectedClass !== "All") {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.class === selectedClass
      );
    }
  
    if (!auth.is_vip) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => !product.vip_only
      );
    } else if (showVipOnly) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.vip_only
      );
    }
  
    if (!auth.id) { // Check if the user is not logged in
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => !product.vip_only
      );
    }
  
    if (!isDarkMode) { // Check if it's not dark mode
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => product.class !== "villain"
      );
    }
  
    setFilteredProducts(updatedFilteredProducts);
  }, [selectedClass, showVipOnly, products, auth, isDarkMode]);
  
  

  const handleVipCheckboxChange = () => {
    setShowVipOnly(!showVipOnly);
    if (!showVipOnly) {
      const vipFilteredProducts = products.filter(
        (product) => product.vip_only
      );
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

      {auth.id && ( 
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
            <option value="weapon">Weapon</option>
            {isDarkMode && <option value="villain">Villain</option>}
          </select>
          <br></br>

          {auth.is_vip ? (
            <label>
              <input
                type="checkbox"
                checked={showVipOnly}
                onChange={handleVipCheckboxChange}
              />
              Show VIP Items Only
            </label>
          ) : null}
        </div>
      )}
<ul className="product-list">
  {filteredProducts.map((product) => {
    if (
      (!auth.id &&
        (product.vip_only || product.class === "villain")) ||
      (!isDarkMode && product.class === "villain")
    ) {
      return null;
    }
    const cartItem = cartItems.find(
      (lineItem) => lineItem.product_id === product.id
    );
      
          return (
            <li className="product-box" key={product.id}>
              <Link to={`/products/${product.id}`} className="product-link">
                <div className="product-name">
                  {product.vip_only ? `VIP Item!` : ""}
                </div>
                <img
                  className="productImage"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="product-description">

                <Link to={`/products/${product.id}`}>{product.name}</Link><br /><br />
                {formatPrice(product.price)}
              </div>
              <div className="product-actions">
                {auth.id ? (
                  cartItems.find(
                    (lineItem) => lineItem.product_id === product.id
                  ) ? (
                    <div className="button-group">
                      <Link to={`/cart`}>View Cart</Link>
                      <button
                        onClick={() =>
                          updateLineItem(
                            cartItems.find(
                              (lineItem) => lineItem.product_id === product.id
                            )
                          )
                        }
                      >
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
                        {wishlistStatus[product.id] ? (
                          <div className="wishlist-added">
                            Added to Wishlist
                          </div>
                        ) : (
                          <button
                            className="add-to-wishlist"
                            onClick={() => addProductToWishlist(product)}
                          >
                            Add to Wishlist
                          </button>
                        )}
                      </div>
                      {wishlistErrors && wishlistErrors[product.id] && (
                        <div className="wishlist-error">
                          {wishlistErrors[product.id]}
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <div>
                    <div className="button-group">
                      <button className="add-to-cart" disabled>
                        Add to Cart
                      </button>
                      <button className="add-to-wishlist" disabled>
                        Add to Wishlist
                      </button>
                    </div>
                    {wishlistErrors && wishlistErrors[product.id] && (
                      <div className="wishlist-error">
                        {wishlistErrors[product.id]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
