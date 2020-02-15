import React from 'react';
import './products-overview.styles.css'
import ProductCard from "../../components/product-card/product-card.component.jsx";

const ProductsOverview = ({items}) => (
    <div className={`products-overview`}>
            {items.map(item =>
                <ProductCard product={item} key={item.id} />
            )}
    </div>
);

export default ProductsOverview;