import React from "react";
import './product-card.styles.css';

import parseDate from "../../utils/parseDate.js";

const ProductCard = ({product}) => (
    <div className="product-card" key={product.id}>
        <div className="product__preview" style={{fontSize: `${product.size}px`}}>
            {product.face}
        </div>
        <div className="product__details">
            <div className="product__SnP">
                <span className="product__size">
                    {product.size}px
                </span>
                <span className="product__price">
                    ${product.price/100}
                </span>
            </div>
            <span className="product__added-date">
                Added {parseDate(product.date)}
            </span>
        </div>
    </div>
);

export default ProductCard;