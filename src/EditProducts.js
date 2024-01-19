import React, { useState } from "react";
import axios from "axios";
import api from "./api";

const EditProducts = ({ products, formatPrice }) => {
  const [editedProduct, setEditedProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (product) => {
    setEditedProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${editedProduct.id}`, {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
      });

      setEditedProduct({
        id: "",
        name: "",
        description: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <h1 className="home-title" >Edit Products</h1>
      <div className="orders-container"><table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{formatPrice(product.price)}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
      {/* Edit Form */}
      {isEditing && (
        <div className="edit-product-form" >
          <h2 className="form-heading">Edit Product</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <br />
            <label>
              Price (in cents):
              <input
                type="number"
                name="price"
                className="form-input"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button className="form-button" onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProducts;
