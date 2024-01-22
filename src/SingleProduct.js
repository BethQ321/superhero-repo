import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import api from "./api";

const SingleProduct = ({
  auth,
  products,
  cartItems,
  removeFromCart,
  updateLineItem,
  updateDownLineItem,
  handleDecrement,
  createLineItem,
}) => {
  const params = useParams();
  const productId = params.id;
  const [review, setReview] = useState({
    name: "",
    product_id: productId,
    review_title: "",
    reviewText: "",
    rating: "",
  });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // Reload fix
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

  const oneProduct = products.find((product) => product.id === productId);
  const cartItem = cartItems.find((item) => item.product_id === oneProduct?.id);

  const handleAddToCart = () => {
    createLineItem(oneProduct);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.createReview(productId, review);
      setReviews([...reviews, response.data]);
      setReview({
        name: "",
        review_title: "",
        reviewText: "",
        rating: "",
      });
    } catch (error) {
      console.error("Review submission error:", error);
      setError(error.message);
    }
  };

  if (!oneProduct) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h2>{oneProduct.name}</h2>
      <div className="Sproduct-container">
        <div>
          <img src={oneProduct.image} className="Sproduct-image" alt={oneProduct.name} />
        </div>
        <div className="Sproduct-description">
          {oneProduct.description}

          <div>
            {cartItem ? (
              <div>
                <button onClick={() => updateLineItem(cartItem)}>Add One!</button>
                <button onClick={() => handleDecrement(cartItem)}>Remove One!</button>
              </div>
            ) : (
              <button onClick={handleAddToCart}>Add to Cart</button>
            )}
          </div>
        </div>
      </div>

      <h2>Product Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label htmlFor="name">Reviewer:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={review.name}
            onChange={(e) => setReview({ ...review, name: e.target.value })}
            required
          />
        </div>

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
                  <p>{review.reviewText}</p>
                </div>
                <div className="review-rating">
                  <p>Rating: {review.rating}/5</p>
                </div>
                <div className="name">
                  <p>Name: {review.name}</p>
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
