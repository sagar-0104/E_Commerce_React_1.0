import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate('/', { replace: true });
        }
    }, [order, navigate]);

    if (!order) {
        return null;
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="order-confirmation">
            <div className="confirmation-container">
                {/* Animated Success Icon */}
                <div className="success-icon-container">
                    <div className="success-icon">
                        <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                    <div className="success-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="confirmation-header">
                    <h1 className="confirmation-title">🎉 Order Confirmed!</h1>
                    <p className="confirmation-subtitle">
                        Thank you for shopping with us! Your order has been successfully placed and is now being prepared.
                    </p>
                    <div className="order-number-badge">
                        <span className="order-label">Order</span>
                        <span className="order-id">#{order.id}</span>
                    </div>
                </div>

                {/* Order Details Cards */}
                <div className="order-details-section">
                    {/* Quick Info Cards */}
                    <div className="quick-info-cards">
                        <div className="info-card">
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Order Date</span>
                                <span className="card-value">{formatDate(order.orderDate)}</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="card-icon delivery">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Expected Delivery</span>
                                <span className="card-value">{formatDate(order.estimatedDelivery)}</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="card-icon payment">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Payment</span>
                                <span className="card-value">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="card-icon total">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="6" x2="12" y2="10" />
                                    <line x1="16" y1="12" x2="12" y2="12" />
                                    <line x1="8" y1="12" x2="12" y2="12" />
                                    <line x1="12" y1="14" x2="12" y2="18" />
                                </svg>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Total Amount</span>
                                <span className="card-value total-price">₹{order.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tracking Information */}
                    <div className="tracking-section">
                        <div className="tracking-header">
                            <div className="tracking-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="tracking-info">
                                <h3>Track Your Order</h3>
                                <p>Use this tracking number to monitor your shipment</p>
                            </div>
                        </div>
                        <div className="tracking-number-display">
                            <span className="tracking-label">Tracking Number</span>
                            <span className="tracking-number">{order.trackingNumber}</span>
                            <button className="copy-tracking-btn" onClick={() => navigator.clipboard.writeText(order.trackingNumber)}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="address-section">
                        <h3 className="section-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Delivery Address
                        </h3>
                        <div className="address-card">
                            <p className="address-text">{order.shippingAddress}</p>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="order-timeline">
                    <h3 className="timeline-title">Order Progress</h3>
                    <div className="timeline-container">
                        <div className="timeline-step completed">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <h4>Order Confirmed</h4>
                                <p>Your order has been placed successfully</p>
                                <span className="step-time">Just now</span>
                            </div>
                        </div>

                        <div className="timeline-step active">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <h4>Processing</h4>
                                <p>We're preparing your items for shipment</p>
                                <span className="step-time">1-2 business days</span>
                            </div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 3h15l-1 9H6l-1-9z" />
                                    <circle cx="6" cy="20" r="1" />
                                    <circle cx="20" cy="20" r="1" />
                                    <path d="M6 16h15l-1 3H6z" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <h4>Shipped</h4>
                                <p>Your order is on its way to you</p>
                                <span className="step-time">2-3 business days</span>
                            </div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="step-content">
                                <h4>Delivered</h4>
                                <p>Enjoy your new purchase!</p>
                                <span className="step-time">{formatDate(order.estimatedDelivery)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="confirmation-actions">
                    <button
                        onClick={() => navigate('/orders')}
                        className="action-button primary-button"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                        </svg>
                        View All Orders
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="action-button secondary-button"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H2m5 10v6a1 1 0 001 1h1m5-7v6a1 1 0 001 1h1" />
                        </svg>
                        Continue Shopping
                    </button>
                </div>

                {/* Support Section */}
                <div className="support-section">
                    <div className="support-card">
                        <div className="support-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <div className="support-content">
                            <h4>Need Help?</h4>
                            <p>Our customer support team is here to assist you with any questions about your order.</p>
                            <a href="/contact" className="support-link">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
