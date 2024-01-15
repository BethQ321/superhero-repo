//import React from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

const SingleProduct = ({ products, users,  cartItems, createLineItem, updateLineItem, auth }) => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const params = useParams()
    const id = params.id

    const handleReview = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/products/${id}`, {
                review,
                rating,
            });
        } catch (error) {
            setError(error.message)
        }
    };
        
    return (
        <div>
          <form onSubmit={handleReview}>
            <input
              type="text"
              value={review}
                onChange={(event) => setReview(event.target.value)}
              placeholder="Place review here"
            /> 
            <input
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            placeholder="Rating (0-5)"
            min={0}
            max={5}
        />
            <button type="submit">Add review</button>
          </form>
          
          <br />
          
          <Link to='/products'><button>Back to Products</button></Link>
        </div>
      );
    }
    
    export default SingleProduct;