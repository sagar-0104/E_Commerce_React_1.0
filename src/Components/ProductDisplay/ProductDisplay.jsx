import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [mainImage, setMainImage] = useState(product.image);
    const [selectedSize, setSelectedSize] = useState('');

    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image
    ];

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {productImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product view ${index + 1}`}
                            className={`productdisplay-img-list-img ${mainImage === image ? 'active' : ''}`}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={mainImage} alt='Main product' />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <div className="stars-container">
                        <img src={star_icon} alt='star' />
                        <img src={star_icon} alt='star' />
                        <img src={star_icon} alt='star' />
                        <img src={star_icon} alt='star' />
                        <img src={star_dull_icon} alt='star' />
                    </div>
                    <p className="rating-text">(133 reviews)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                    <div className="discount-badge">
                        {Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    <p>A lightweight, usually knitted, pullover shirt with a close-fitting design. Perfect for casual wear and comfortable for all-day use. Made with high-quality materials for durability and style.</p>
                </div>
                <div className="productdisplay-right-size">
                    <h3>Select Size</h3>
                    <div className="productdisplay-right-sizes">
                        {sizes.map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                    {selectedSize && <p className="size-selected">Selected size: <strong>{selectedSize}</strong></p>}
                </div>
                <div className="product-actions">
                    <button
                        className="add-to-cart-btn"
                        onClick={() => { addToCart(product.id) }}
                        disabled={!selectedSize}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M9 21C9.6 21 10 20.6 10 20S9.6 19 9 19 8 19.4 8 20 8.4 21 9 21ZM20 21C20.6 21 21 20.6 21 20S20.6 19 20 19 19 19.4 19 20 19.4 21 20 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add to Cart
                    </button>
                    <button className="wishlist-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="product-info">
                    <div className="product-category">
                        <span className="label">Category:</span>
                        <span className="value">Women, T-shirt, Crop-Top</span>
                    </div>
                    <div className="product-tags">
                        <span className="label">Tags:</span>
                        <div className="tags">
                            <span className="tag">Modern</span>
                            <span className="tag">Latest</span>
                            <span className="tag">Trending</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay