import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            <div className="cartitems-list">
                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format cartitems-format-item">
                                    <img src={e.image} alt='' className='carticon-product-icon' />
                                    <p className="cartitems-name">{e.name}</p>
                                    <p className="cartitems-price">₹{e.new_price}</p>
                                    <div className="cartitems-quantity">
                                        <button
                                            className="quantity-btn decrease"
                                            onClick={() => removeFromCart(e.id)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{cartItems[e.id]}</span>
                                        <button
                                            className="quantity-btn increase"
                                            onClick={() => addToCart(e.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartitems-total">₹{e.new_price * cartItems[e.id]}</p>
                                    <img
                                        className='cartitem-remove-icon'
                                        src={remove_icon}
                                        onClick={() => { removeFromCart(e.id) }}
                                        alt=''
                                    />
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="cartitems-down">
                <div className="cart-items-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='Enter promo code' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItems