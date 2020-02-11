import React from 'react';
import './App.styles.css';
import ProductView from "./components/product-view/product-view.component.jsx";

const App = () => {

    return (
        <div className='app'>
            <header className='header'>
                <h1>
                    Product Grid
                </h1>
                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            </header>
            <main className='main-content'>
                <div className="sort-products">
                    Sort By: <button>Sort</button>
                </div>
                <ProductView />
            </main>
        </div>
    )
};

export default App;