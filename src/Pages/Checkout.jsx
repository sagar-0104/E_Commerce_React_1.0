import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Checkout.css';

const Checkout = () => {
    const { cartItems, all_product, getTotalCartAmount, placeOrder, user } = useContext(ShopContext);
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'card'
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!orderData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!orderData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!orderData.email.trim()) newErrors.email = 'Email is required';
        if (!orderData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!orderData.address.trim()) newErrors.address = 'Address is required';
        if (!orderData.city.trim()) newErrors.city = 'City is required';
        if (!orderData.state.trim()) newErrors.state = 'State is required';
        if (!orderData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsProcessing(true);

        try {
            const result = placeOrder({
                address: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}`,
                paymentMethod: orderData.paymentMethod,
                customerInfo: orderData
            });

            if (result.success) {
                navigate('/order-confirmation', { state: { order: result.order } });
            } else {
                setErrors({ general: result.message });
            }
        } catch (error) {
            setErrors({ general: 'Failed to place order. Please try again.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const cartProducts = all_product.filter(product => cartItems[product.id] > 0);

    if (cartProducts.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <p>Add some items to your cart before checkout</p>
                <button onClick={() => navigate('/')} className="continue-shopping-btn">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <div className="checkout-form-section">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        {errors.general && (
                            <div className="error-message general-error">{errors.general}</div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={orderData.firstName}
                                    onChange={handleInputChange}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={orderData.lastName}
                                    onChange={handleInputChange}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={orderData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label>Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={orderData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={orderData.address}
                                onChange={handleInputChange}
                                className={errors.address ? 'error' : ''}
                                placeholder="Street address"
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={orderData.city}
                                    onChange={handleInputChange}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <span className="error-text">{errors.city}</span>}
                            </div>

                            <div className="form-group">
                                <label>State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={orderData.state}
                                    onChange={handleInputChange}
                                    className={errors.state ? 'error' : ''}
                                />
                                {errors.state && <span className="error-text">{errors.state}</span>}
                            </div>

                            <div className="form-group">
                                <label>ZIP Code *</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={orderData.zipCode}
                                    onChange={handleInputChange}
                                    className={errors.zipCode ? 'error' : ''}
                                />
                                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                            </div>
                        </div>

                        <div className="payment-section">
                            <h3>Payment Method</h3>
                            <div className="payment-options">
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={orderData.paymentMethod === 'card'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Credit/Debit Card</span>
                                </label>
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={orderData.paymentMethod === 'paypal'}
                                        onChange={handleInputChange}
                                    />
                                    <span>PayPal</span>
                                </label>
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={orderData.paymentMethod === 'cod'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="place-order-btn"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Place Order - ₹${getTotalCartAmount()}`}
                        </button>
                    </form>
                </div>

                <div className="order-summary-section">
                    <h3>Order Summary</h3>
                    <div className="order-items">
                        {cartProducts.map((product) => (
                            <div key={product.id} className="order-item">
                                <img src={product.image} alt={product.name} />
                                <div className="item-details">
                                    <h4>{product.name}</h4>
                                    <p>Quantity: {cartItems[product.id]}</p>
                                    <p className="item-price">₹{product.new_price * cartItems[product.id]}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-totals">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>₹{getTotalCartAmount()}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="total-row total">
                            <span>Total:</span>
                            <span>₹{getTotalCartAmount()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
