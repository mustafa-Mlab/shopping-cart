import React, { useState } from 'react';
import './ReviewsDashboard.scss';
import { getProductSlug } from '../../utils/slug';

function ReviewsDashboard({ user, orders, reviews, onAddReview, navigate }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedProduct, setSelectedProduct] = useState(null); // Product to review
  const [selectedOrder, setSelectedOrder] = useState(null); // Order to review
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  if (!user) {
    return (
      <div className="container not-logged-in-container text-center">
        <h2>You are not signed in</h2>
        <p>Please sign in to view your ratings dashboard.</p>
        <button className="btn-primary" onClick={() => navigate('login')}>
          Sign In
        </button>
      </div>
    );
  }

  // 1. Get all products from delivered orders
  const deliveredOrders = orders.filter(
    (o) => o.shippingAddress.email === user.email && o.status === 'delivered'
  );

  // Extract all delivered items as unique objects containing { product, orderId }
  const deliveredItems = [];
  deliveredOrders.forEach((order) => {
    order.items.forEach((item) => {
      // Avoid adding exact duplicate items in same order
      if (!deliveredItems.some((di) => di.product.id === item.product.id && di.orderId === order.id)) {
        deliveredItems.push({
          product: item.product,
          orderId: order.id,
        });
      }
    });
  });

  // 2. Separate into Pending and Reviewed based on matches in the global reviews list
  const userReviews = reviews.filter((r) => r.reviewerName === user.name);

  const pendingItems = deliveredItems.filter((item) => {
    // Has not been reviewed yet for this specific order
    return !userReviews.some(
      (r) => r.productId === item.product.id && r.orderId === item.orderId
    );
  });

  const reviewedItemsList = deliveredItems
    .filter((item) => {
      return userReviews.some(
        (r) => r.productId === item.product.id && r.orderId === item.orderId
      );
    })
    .map((item) => {
      const reviewObj = userReviews.find(
        (r) => r.productId === item.product.id && r.orderId === item.orderId
      );
      return {
        ...item,
        review: reviewObj,
      };
    });

  const handleOpenReviewForm = (item) => {
    setSelectedProduct(item.product);
    setSelectedOrder(item.orderId);
    setRating(5);
    setComment('');
    setReviewError('');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setReviewError('Please write a comment for your review.');
      return;
    }

    onAddReview(selectedProduct.id, selectedOrder, rating, comment.trim());
    
    // Reset form states
    setSelectedProduct(null);
    setSelectedOrder(null);
    setComment('');
    
    // Switch to Reviewed tab to see the post
    setActiveTab('reviewed');
  };

  return (
    <div className="reviews-dashboard-page container">
      <h1 className="section-title">Your Ratings & Reviews</h1>

      <div className="reviews-layout">
        {/* Navigation Tabs */}
        <div className="tab-headers glass-effect">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('pending');
              setSelectedProduct(null);
            }}
          >
            Pending Reviews ({pendingItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviewed' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('reviewed');
              setSelectedProduct(null);
            }}
          >
            Reviewed Items ({reviewedItemsList.length})
          </button>
        </div>

        {/* Tab Contents */}
        <main className="tab-content-area">
          {selectedProduct ? (
            /* Review Submission Form */
            <div className="review-form-card glass-effect">
              <h3>Write a Review for {selectedProduct.title}</h3>
              <p className="order-context">Purchased in order <span>{selectedOrder}</span></p>

              <form onSubmit={handleReviewSubmit} className="review-submit-form">
                <div className="form-group">
                  <label>Rating</label>
                  <div className="stars-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= rating ? 'selected' : ''}`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    className="form-control"
                    placeholder="Describe your experience with this product..."
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  {reviewError && <span className="error-text">{reviewError}</span>}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'pending' ? (
            /* Pending Reviews List */
            <div className="items-list-card glass-effect">
              {pendingItems.length === 0 ? (
                <div className="empty-reviews text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-reviews-icon">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <h4>No pending reviews</h4>
                  <p>You don't have any purchased items waiting for review. Only delivered orders can be rated.</p>
                  <button className="btn-secondary" onClick={() => navigate('home')}>
                    Go to Shop
                  </button>
                </div>
              ) : (
                <div className="pending-reviews-list">
                  {pendingItems.map((item, index) => (
                    <div key={index} className="pending-review-row">
                      <div className="row-item-image">
                        <div className="thumbnail-placeholder">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="icon">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          </svg>
                        </div>
                      </div>

                      <div className="row-item-details">
                        <h4 onClick={() => navigate(`product/${getProductSlug(item.product)}`)}>{item.product.title}</h4>
                        <p className="order-id-info">Order ID: <span>{item.orderId}</span></p>
                      </div>

                      <button
                        className="btn-rate-item btn-primary"
                        onClick={() => handleOpenReviewForm(item)}
                      >
                        Rate Product
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Reviewed Items List */
            <div className="items-list-card glass-effect">
              {reviewedItemsList.length === 0 ? (
                <div className="empty-reviews text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-reviews-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <h4>No reviews posted</h4>
                  <p>You haven't posted any reviews yet.</p>
                </div>
              ) : (
                <div className="reviewed-items-list">
                  {reviewedItemsList.map((item, index) => (
                    <div key={index} className="reviewed-item-row">
                      <div className="reviewed-header-details">
                        <div className="row-item-image">
                          <div className="thumbnail-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="icon">
                              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="row-item-details">
                          <h4 onClick={() => navigate(`product/${getProductSlug(item.product)}`)}>{item.product.title}</h4>
                          <span className="order-id-info">Order ID: <span>{item.orderId}</span></span>
                        </div>
                      </div>

                      <div className="review-post-content">
                        <div className="review-meta">
                          <span className="stars">{"★".repeat(item.review.rating)}{"☆".repeat(5 - item.review.rating)}</span>
                          <span className="date">{item.review.date}</span>
                        </div>
                        <p className="comment">"{item.review.comment}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ReviewsDashboard;
