import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import api from "./api/index"; 
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
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const [selectedRating, setSelectedRating] = useState("");
  const [sortMethod, setSortMethod] = useState("newest first");
  const [reviewForm, setReviewForm] = useState({
    name: "",
    product_id: "",
    review_title: "",
    reviewText: "",
    rating: "",
  });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const params = useParams();
  const productId = params.id;
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
      await api.createReview(productId, reviewForm, (newReview) => {
        setReviews([...reviews, newReview]);
        setReviewForm({
          name: "",
          product_id: productId,
          review_title: "",
          reviewText: "",
          rating: "",
        });
        setSubmissionMessage("Thank you for submitting your review.");
      });
    } catch (error) {
      console.error("Review submission error:", error);
      setError(error.message);
    }
  };
  const handleRatingFilterChange = (e) => {
    setSelectedRating(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
  };
  const resetFilter = () => {
    setSelectedRating("");
  };
  const sortedReviews = () => {
    let sorted = [...reviews];
    switch (sortMethod) {
      case "newest first":
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "oldest first":
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case "highest rating first":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest rating first":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };
  const filteredReviews = () => {
    return sortedReviews().filter(review => 
      selectedRating === "" || parseInt(review.rating) === parseInt(selectedRating)
    );
  };

  if (!oneProduct) {
    return <div>Error when loading, please log in.</div>;
  }

  return (
    <div className="singleProduct-container" >
      <div className="product-and-form-container" style={{paddingTop: "15px"}}>
      <div className="Sproduct-container">
        <div>
          <img src={oneProduct.image} className="Sproduct-image" alt={oneProduct.name} />
        </div>
        <div className="Sproduct-description" style={{position:"relative", paddingTop: "7px"}}>
           <Link to="/products" className="nav-link" style={{  position: "absolute", bottom: "15px", right: "15px"}}>
            All Products</Link>
        <h2 style={{textAlign: "center", paddingBottom: "20px", color: "black", fontSize: "32px", paddingTop: "0px", marginTop: "0px"}}>{oneProduct.name}</h2>
          <div style={{paddingBottom:"15px"}}>{oneProduct.description}</div>
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
      <div className="review-form">
      <h2  style={{ textAlign: "center" }}>Write A Review </h2>
      <form onSubmit={handleReviewSubmit}>
  <div>
    <label htmlFor="name">Reviewer:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={reviewForm.name}
      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
      required
    />
  </div>
  <div>
    <label htmlFor="reviewTitle">Review Title:</label>
    <input
      type="text"
      id="reviewTitle"
      name="reviewTitle"
      value={reviewForm.review_title}
      onChange={(e) =>
        setReviewForm({ ...reviewForm, review_title: e.target.value })
      }
      required
    />
  </div>
  <div>
    <label htmlFor="reviewText">Review:</label>
    <textarea
      id="reviewText"
      name="reviewText"
      value={reviewForm.reviewText}
      onChange={(e) =>
        setReviewForm({ ...reviewForm, reviewText: e.target.value })
      }
      required
      style={{ marginBottom: '10px', width: "100%", height: '100px' }} 
    />
  </div>
  <div className="rating-row">
  <label style={{paddingTop: '8px'}} htmlFor="rating">Rating (0-5):</label>
  <select
    id="rating"
    name="rating"
    value={reviewForm.rating}
    onChange={(e) =>
      setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })
    }
  >
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</div>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {!submissionMessage ? (
    <button type="submit" style={{ width: '150px', marginTop: '10px' }}>Submit Review</button>
  ) : (
    <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>{submissionMessage}</div>
  )}
</div>

</form>

</div>
</div>

<div className='reviews-container'>
  <h3 style={{textAlign: 'center', fontSize: '28px', paddingBottom: '15px'}}>Reviews</h3>
  {/* Sort by dropdown menu */}
  <div>
    <label htmlFor="sortMethod" style={{fontSize: '16px'}}>Sort by: </label>
    <select 
      id="sortMethod"
      value={sortMethod}
      onChange={handleSortChange}
      style={{ fontSize: '14px', paddingTop: '3px', paddingBottom: '3px', textAlign: 'center'}}
    >
      <option value="newest first">Sort by Newest</option>
      <option value="oldest first">Sort by Olders</option>
      <option value="highest rating first">Sort by Highest Reviews</option>
      <option value="lowest rating first">Sort by Lowest Reviews</option>
    </select>
  </div>

  {/* Ratings dropdown and View All Reviews button */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '30px' }}>
    <div>
      <label htmlFor="ratingFilter" style={{fontSize: '16px'}}>View By Rating: </label>
      <select
        id="ratingFilter"
        value={selectedRating}
        onChange={handleRatingFilterChange}
        style={{ fontSize: '15px', paddingTop: '3px', paddingBottom: '3px', textAlign: 'center'}}
      >
        <option value="">View By Star</option>
        <option value="1">1 Star Only</option>
        <option value="2">2 Star Only</option>
        <option value="3">3 Star Only</option>
        <option value="4">4 Star Only</option>
        <option value="5">5 Star Only</option>
      </select>
    </div>
    <button onClick={resetFilter} style={{ fontSize: '14px' }}>View All Reviews</button>
  </div>
<div className="scrollable-content">
<ul className="reviews-list">
        {filteredReviews().map((review) => (
          <li key={review.id} className="review-box">
      <div className="review-title">
        <h3>{review.review_title}</h3>
        </div>
        <div className="review-name">
          <p>Written On: {formatDate(review.created_at)}</p>
      </div>
      <div className="review-name">
        <p>Rating: {review.rating}/5 | Review By: {review.name}</p>
      </div>
      <div className="review-text">
        <p>Review: {review.reviewtext}</p> 
      </div>
    </li>
  ))}
</ul>
  </div> 
    </div>
    </div>
  );
};
export default SingleProduct;