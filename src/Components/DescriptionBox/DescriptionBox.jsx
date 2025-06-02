import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(133)</div>
        </div>
        <div className="descriptionbox-description">
            <p>E-commerce is the buying and selling of goods or services over the internet. It offers convenience, secure payments, and doorstep delivery to customers worldwide.</p>
            <p>some text.......</p>
        </div>

    </div>
  )
}

export default DescriptionBox
