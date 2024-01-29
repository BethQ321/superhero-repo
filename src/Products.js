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
  isDarkMode,
  addProductToWishlist,
  wishlistErrors,
  wishlistStatus,
  
}) => {
  const [selectedClass, setSelectedClass] = useState("All");
  const [showVipOnly, setShowVipOnly] = useState(false);
  // const [wishlistErrors, setWishlistErrors] = useState({});
  // const [wishlistStatus, setWishlistStatus] = useState({});

  // const addProductToWishlist = async (product) => {
  //   try {
  //     setWishlistErrors({ ...wishlistErrors, [product.id]: "" });

  //     const response = await axios.post(
  //       "/api/wishList",
  //       { productId: product.id },
  //       api.getHeaders()
  //     );
  //     setWishlistStatus({ ...wishlistStatus, [product.id]: true });
  //   } catch (error) {
  //     setWishlistErrors({
  //       ...wishlistErrors,
  //       [product.id]: "Item is already on your wishlist",
  //     });
  //     console.error("Error adding product to wishlist:", error);
  //   }
  // };

  const filterProductsByClass = (selectedClass) => {
    let filtered = products;

    if (selectedClass !== "All") {
      filtered = filtered.filter((product) => product.class === selectedClass);
    }

    if (!auth.is_vip) {
      filtered = filtered.filter((product) => !product.vip_only);
    }

    if (!auth.id) {
      filtered = filtered.filter((product) => !product.vip_only);
    }

    if (!isDarkMode) {
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

    if (!auth.id) {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (product) => !product.vip_only
      );
    }

    if (!isDarkMode) {
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
    <div className="product-container" style={{marginRight: "20px"}}>
      <h2>Products</h2>

      <div className="product-search">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleShowAllClick} style={{border:"2px solid #373737"}}>Show All</button>
      </div>

      {auth.id && (
        <div className="filter-container">
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
          </div>

          {auth.is_vip ? (
            <label className="vip-label">
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
      <ul className="product-list" style={{ overflowY:"auto", height: "calc(78vh)"}}>
        {filteredProducts.map((product) => {
          if (
            (!auth.id && (product.vip_only || product.class === "villain")) ||
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
                <img
                  className="productImage"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <br />
              <div className="product-description">
                <Link to={`/products/${product.id}`}>
                  {product.vip_only ? `VIP Item!` : ""}<br/>
                  {product.name} 
                </Link>
                <br />
                <br />
                {formatPrice(product.price)}
              </div>
              <div className="product-actions">
              {auth.id ? (
  cartItems.find((lineItem) => lineItem.product_id === product.id) ? (
    <div className="button-group" >
      <Link to={`/cart`} style={{border:"2px solid #373737", paddingLeft:"10px", paddingRight:"10px", paddingTop:"5px", paddingBottom: "5px", borderRadius: "5px" }}>
        View Cart</Link>
      <button 
        style={{border:"2px solid #373737"}}
        onClick={() => updateLineItem(cartItems.find((lineItem) => lineItem.product_id === product.id))}
      >
        Add Another
      </button>
    </div>
  ) : (
    <div>
      <div className="button-group" >
        <button
          className="add-to-cart"
          onClick={() => createLineItem(product)}
          style={{border:"2px solid #373737"}}
        >
          Add to Cart
        </button>
        {wishlistStatus[product.id] ? (
          <div className="wishlist-added">
            Added to Wishlist
          </div>
        ) : (
          wishlistErrors && wishlistErrors[product.id] ? (
            <div className="wishlist-error">
              {wishlistErrors[product.id]}
            </div>
          ) : (
            <button
              className="add-to-wishlist"
              onClick={() => addProductToWishlist(product)}
              style={{border:"2px solid #373737"}}
            >
              Add to Wishlist
            </button>
          )
        )}
      </div>
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
