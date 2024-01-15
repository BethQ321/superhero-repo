import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import api from "./api";

const SingleProduct = ({ auth }) => {
  const productId = useParams(); 
  const [review, setReview] = useState({
    product_id: productId,
    reviewText: "",
    rating: "",
  });
console.log(productId)
  const [error, setError] = useState(null);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.createReview(productId, review);
      console.log("Review created:", response);
    setReview({
        reviewText: "",
        rating: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Product Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            name="reviewText"
            value={review.reviewText}
            onChange={(e) =>
              setReview({ ...review, reviewText: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating (0-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={review.rating}
            onChange={(e) =>
              setReview({ ...review, rating: parseInt(e.target.value) })
            }
            min="0"
            max="5"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <br />
      <Link to="/products">Back to Products</Link>
    </div>
  );
};

export default SingleProduct;
