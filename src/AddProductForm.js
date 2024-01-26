import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    class: "",
    vip_only: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setProductData({
      ...productData,
      [name]: newValue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", productData);
      setProductData({
        name: "",
        price: "",
        image: "",
        description: "",
        class: "",
        vip_only: false,
      });
      setSuccessMessage("Product successfully added!");
    } catch (error) {
      console.error("Error creating product:", error);
      setSuccessMessage("");
    }
  };

  return (
    <form className="add-product-form"onSubmit={handleSubmit}>
      <label>
        Product name:
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Class:
        <input
          type="text"
          name="class"
          value={productData.class}
          onChange={handleInputChange}
        />
      </label>
      <label>
        VIP-only:
        <input
          type="checkbox"
          name="vip_only"
          checked={productData.vip_only}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Product</button>
      {successMessage && (
        <span className="success-message">{successMessage}</span>
      )}
      <br></br>
      <br></br>
      <Link to="/admin" className="nav-link">
        Back to Admin
      </Link>
    </form>
  );
};

export default AddProduct;
