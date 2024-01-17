import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import api from "./api";

const SingleProduct = ({
  auth,
  products,
  lineItem,
  removeFromCart,
  updateLineItem,
  updateDownLineItem,
  handleDecrement,
  cartItems,
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

  const oneProduct = products.find((product) => {
    return product.id === productId;
  });

  //

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const cartItem = cartItems.find(
    (lineItem) => lineItem.product_id === oneProduct.id
  );

  const handleAddToCart = () => {
    createLineItem(oneProduct);
    setIsAddedToCart(true);
  };

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

  //first add user
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.createReview(productId, review);
      console.log(review);
      console.log("Review created:", response);
      setReview({
        name: "",
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
      <div>
        <h2>{oneProduct.name}</h2>
        <div className="Sproduct-container">
          <div>
            <img src={oneProduct.image} className="Sproduct-image" />
          </div>
          <div className="Sproduct-description">
            {oneProduct.description}

            <div>
              {/*Add to Cart button */}
              {!cartItem && (
                <button onClick={handleAddToCart}>Add to Cart</button>
              )}

              {/*Add to Cart button */}
              {cartItem && (
                <button onClick={() => updateLineItem(cartItem)}>
                  Add One!
                </button>
              )}

              {/* Subtract from Cart button */}
              {cartItem && (
                <button onClick={() => handleDecrement(cartItem)}>
                  Remove One!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <br></br>

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
                  <p>{review.reviewtext}</p>
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
