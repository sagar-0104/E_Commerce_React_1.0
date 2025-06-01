import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Item.css"
import { ShopContext } from '../../Context/ShopContext'

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(props.id);
  };

  const handleViewDetails = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='item'>
      <div className="item-image-container">
        <img src={props.image} alt='' />
        <div className="item-overlay">
          <div className="item-buttons">
            <button className="cart-btn" onClick={handleAddToCart} title="Add to Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M9 21C9.6 21 10 20.6 10 20S9.6 19 9 19 8 19.4 8 20 8.4 21 9 21ZM20 21C20.6 21 21 20.6 21 20S20.6 19 20 19 19 19.4 19 20 19.4 21 20 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link to={`/product/${props.id}`} onClick={handleViewDetails}>
              <button className="details-btn" title="View Details">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Link to={`/product/${props.id}`} onClick={handleViewDetails}>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            ₹{props.new_price}
          </div>
          <div className="item-price-old">
            ₹{props.old_price}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Item