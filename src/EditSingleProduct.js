// EditSingleProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSingleProduct = ({ formatPrice }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [editSuccess, setEditSuccess] = useState(false);

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    class: "",
    image: "",
    price: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${product.id}`, product);
      setEditSuccess(true);
    } catch (error) {
      console.error('Error updating product:', error);
      setEditSuccess(false);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form className='add-product-form'>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleInputChange} />
        </label>
        <label>
    Image URL:
    <input
      type="text"
      name="image"
      value={product.image}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Class:
    <input
      type="text"
      name="class"
      value={product.class}
      onChange={handleInputChange}
    />
  </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        <button onClick={handleSave}>Save Changes</button>
        {editSuccess && <span>Product successfully updated!</span>}
        <br />
        <button onClick={() => navigate('/editproducts')}>Back to Admin</button>
      </form>
    </div>
  );
};

export default EditSingleProduct;
