import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Orders.css';

const Orders = () => {
    const { getUserOrders, all_product, cancelOrder, getOrderTrackingInfo } = useContext(ShopContext);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [trackingInfo, setTrackingInfo] = useState(null);
    const orders = getUserOrders();

    const getProductById = (id) => {
        return all_product.find(product => product.id === id);
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            const result = cancelOrder(orderId);
            if (result.success) {
                alert('Order cancelled successfully');
            } else {
                alert(result.message);
            }
        }
    };

    const handleTrackOrder = (orderId) => {
        const tracking = getOrderTrackingInfo(orderId);
        setTrackingInfo(tracking);
        setSelectedOrder(orderId);
    };

    const closeTracking = () => {
        setTrackingInfo(null);
        setSelectedOrder(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return '#28a745';
            case 'processing': return '#ffc107';
            case 'shipped': return '#17a2b8';
            case 'delivered': return '#28a745';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'processing':
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                );
            case 'shipped':
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l6 6M4 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'cancelled':
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'delivered':
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                );
            default:
                return (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="orders-empty">
                <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1H10V6zm8 15H6V9h2v1c0 .55.45 1 1 1s1-.45 1-1V9h4v1c0 .55.45 1 1 1s1-.45 1-1V9h2v12z" fill="currentColor" />
                    </svg>
                </div>
                <h2>No Orders Yet</h2>
                <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
                <a href="/" className="start-shopping-btn">Start Shopping</a>
            </div>
        );
    }

    // Separate orders by status for better UX
    const activeOrders = orders.filter(order => order.status !== 'cancelled');
    const cancelledOrders = orders.filter(order => order.status === 'cancelled');

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>My Orders</h1>
                <p>Track and manage your orders</p>
            </div>

            {/* Order Tracking Modal */}
            {trackingInfo && (
                <div className="tracking-modal-overlay" onClick={closeTracking}>
                    <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="tracking-header">
                            <h2>Order Tracking</h2>
                            <button className="close-btn" onClick={closeTracking}>×</button>
                        </div>

                        <div className="tracking-content">
                            <div className="order-info">
                                <h3>Order #{trackingInfo.order.id}</h3>
                                <p>Tracking Number: <strong>{trackingInfo.order.trackingNumber}</strong></p>
                                <p>Current Status: <strong style={{ color: getStatusColor(trackingInfo.currentStatus) }}>{trackingInfo.currentStatus.toUpperCase()}</strong></p>
                            </div>

                            <div className="tracking-progress">
                                <h4>Package Journey</h4>
                                <div className="tracking-steps">
                                    {trackingInfo.trackingSteps.map((step, index) => (
                                        <div key={step.status} className={`tracking-step ${step.completed ? 'completed' : 'pending'}`}>
                                            <div className="step-icon">
                                                {step.completed ? (
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <div className="pending-dot"></div>
                                                )}
                                            </div>
                                            <div className="step-content">
                                                <h5>{step.label}</h5>
                                                {step.time && <p className="step-time">{step.time}</p>}
                                                {!step.completed && index === trackingInfo.trackingSteps.findIndex(s => !s.completed) && (
                                                    <p className="step-status">In Progress...</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="tracking-info">
                                <p><strong>Where is my order?</strong></p>
                                {trackingInfo.currentStatus === 'confirmed' && (
                                    <p>Your order has been confirmed and is being prepared for processing.</p>
                                )}
                                {trackingInfo.currentStatus === 'processing' && (
                                    <p>Your order is currently being processed and will be shipped soon.</p>
                                )}
                                {trackingInfo.currentStatus === 'shipped' && (
                                    <p>Your order has been shipped and is on its way to you!</p>
                                )}
                                {trackingInfo.currentStatus === 'delivered' && (
                                    <p>Your order has been successfully delivered. Enjoy your purchase!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Orders Section */}
            {activeOrders.length > 0 && (
                <div className="orders-section">
                    <div className="section-header">
                        <h2>Active Orders ({activeOrders.length})</h2>
                    </div>
                    <div className="orders-list">
                        {activeOrders.map((order) => (
                            <div key={order.id} className={`order-card ${order.status}`}>
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                                    </div>
                                    <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                                        {getStatusIcon(order.status)}
                                        <span className="status-text">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {Object.entries(order.items).map(([productId, quantity]) => {
                                        if (quantity === 0) return null;
                                        const product = getProductById(parseInt(productId));
                                        if (!product) return null;

                                        return (
                                            <div key={productId} className="order-item">
                                                <img src={product.image} alt={product.name} />
                                                <div className="item-info">
                                                    <h4>{product.name}</h4>
                                                    <p>Quantity: {quantity}</p>
                                                    <p className="item-price">₹{product.new_price * quantity}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="order-details">
                                    <div className="order-summary">
                                        <div className="summary-row">
                                            <span>Total Amount:</span>
                                            <span className="total-amount">₹{order.total}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Payment Method:</span>
                                            <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Tracking Number:</span>
                                            <span className="tracking-number">{order.trackingNumber}</span>
                                        </div>
                                    </div>

                                    <div className="delivery-info">
                                        <div className="delivery-address">
                                            <h5>Delivery Address:</h5>
                                            <p>{order.shippingAddress}</p>
                                        </div>
                                        {order.status === 'shipped' || order.status === 'delivered' ? (
                                            <div className="delivery-date">
                                                <h5>
                                                    {order.status === 'delivered' ? 'Delivered:' : 'Expected Delivery:'}
                                                </h5>
                                                <p>{formatDate(order.estimatedDelivery)}</p>
                                            </div>
                                        ) : (
                                            <div className="delivery-date">
                                                <h5>Expected Delivery:</h5>
                                                <p>{formatDate(order.estimatedDelivery)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="order-actions">
                                    {order.status === 'confirmed' && (
                                        <button
                                            className="action-btn cancel-btn"
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                    <button
                                        className="action-btn track-btn"
                                        onClick={() => handleTrackOrder(order.id)}
                                    >
                                        Track Order
                                    </button>
                                    <button className="action-btn reorder-btn">Reorder Items</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Cancelled Orders Section */}
            {cancelledOrders.length > 0 && (
                <div className="orders-section cancelled-section">
                    <div className="section-header cancelled-header">
                        <h2>Cancelled Orders ({cancelledOrders.length})</h2>
                        <div className="cancelled-info">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2" />
                                <path d="M12 8v4M12 16h.01" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>These orders have been cancelled and are no longer active</span>
                        </div>
                    </div>
                    <div className="orders-list">
                        {cancelledOrders.map((order) => (
                            <div key={order.id} className="order-card cancelled">
                                <div className="cancelled-badge">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Cancelled</span>
                                </div>

                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                                    </div>
                                    <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                                        {getStatusIcon(order.status)}
                                        <span className="status-text">Cancelled</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {Object.entries(order.items).map(([productId, quantity]) => {
                                        if (quantity === 0) return null;
                                        const product = getProductById(parseInt(productId));
                                        if (!product) return null;

                                        return (
                                            <div key={productId} className="order-item">
                                                <img src={product.image} alt={product.name} />
                                                <div className="item-info">
                                                    <h4>{product.name}</h4>
                                                    <p>Quantity: {quantity}</p>
                                                    <p className="item-price">₹{product.new_price * quantity}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="order-details">
                                    <div className="order-summary">
                                        <div className="summary-row">
                                            <span>Total Amount:</span>
                                            <span className="total-amount">₹{order.total}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Payment Method:</span>
                                            <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Cancellation Date:</span>
                                            <span>{formatDate(new Date().toISOString())}</span>
                                        </div>
                                    </div>

                                    <div className="delivery-info">
                                        <div className="cancellation-message">
                                            <h5>Order Cancelled</h5>
                                            <p>This order was cancelled and no charges were made. If you were charged, the refund will be processed within 3-5 business days.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <button className="action-btn reorder-btn">Reorder Items</button>
                                    <button className="action-btn help-btn">Need Help?</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Show empty state if no active orders */}
            {activeOrders.length === 0 && cancelledOrders.length > 0 && (
                <div className="no-active-orders">
                    <div className="empty-active-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                        </svg>
                    </div>
                    <h3>No Active Orders</h3>
                    <p>You have no active orders at the moment. Start shopping to place new orders!</p>
                    <a href="/" className="start-shopping-btn small">Browse Products</a>
                </div>
            )}
        </div>
    );
};

export default Orders;