import React from 'react';
import './product-view.styles.css';

class ProductView extends React.Component{

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        fetch('/products?_page=10&_limit=40')
            .then(response => response.json())
            .then(data => this.setState({products: data}))
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div className="product-view">
                {this.state.products.map(product =>
                    <div className="product-card" key={product.id}>
                        <div className="product__preview" style={{fontSize: `${product.size}px`}}>
                            {product.face}
                        </div>
                        <div className="product__details">
                            <div className="product__SnP">
                                <span className="product__size">
                                    {product.size}
                                </span>
                                <span className="product__price">
                                    {product.price}
                                </span>
                            </div>
                            <span className="product__added">
                                {product.date}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ProductView;