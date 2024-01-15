import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import api from "./api";

const SingleProduct = ({ auth }) => {
  const params = useParams();
  const productId = params.id;
  const [review, setReview] = useState({
    product_id: productId,
    review_title: "",
    reviewText: "",
    rating: "",
  });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews?productId=${productId}`);
        setReviews(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.createReview(productId, review);
      console.log("Review created:", response);
      setReview({
        review_title: "",
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
          <label htmlFor="reviewTitle">Review Title:</label>
          <input
            type="text"
            id="reviewTitle"
            name="reviewTitle"
            value={review.review_title}
            onChange={(e) =>
              setReview({ ...review, review_title: e.target.value })
            }
            required
          />
        </div>
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
      <div>
  <h3>Reviews</h3>
  <ul className="reviews-list">
    {reviews
      .filter((review) => review.product_id === productId) 
      .map((review) => (
        <li key={review.id} className="review-box">
          <div className="review-title">
            <h4>{review.review_title}</h4> 
          </div>
          <div className="review-text">
            <p>{review.review_text}</p> 
          </div>
          <div className="review-rating">
            <p>Rating: {review.rating}/5</p>
          </div>
        </li>
      ))}
  </ul>
</div>


      <br />
      <Link to="/products">Back to Products</Link>
    </div>
  );
};

export default SingleProduct;
