// EditProducts.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./api";

const EditProducts = ({ formatPrice }) => {
  const [editProducts, setEditProducts] = useState([]);
  const navigate = useNavigate();
  const [refreshProducts, setRefreshProducts] = useState(false);

  useEffect(() => {
    const fetchEditProducts = async () => {
      try {
        const response = await api.fetchEditProducts(setEditProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchEditProducts();
  }, [refreshProducts]);

  const handleDelete = async (productId) => {
    try {
      await api.deleteProduct(productId);
      setRefreshProducts((prev) => !prev);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <h1 className="home-title">Edit Products</h1>
      <div className="orders-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {editProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.class}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/edit-single-product/${product.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditProducts;
