import React from 'react';
import './App.css';
import ProductsOverview from "./components/products-overview/products-overview.component.jsx";
import Ad from "./components/Ad/Ad.component.jsx";
import generateRandomButUniqueImages from "./utils/generateImg.js";

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            products: [],
            ads: [],
            randomNumbers: []
        }
    }

    spliceArr = (arr) => { //this will slice big array into smaller arrays that contains only 20 items
        let chunk = [];

        while (arr.length > 0){
            chunk.push(arr.splice(0, 20))
        }
        return chunk
    };

    componentDidMount() {
        fetch('/products?_page=1&_limit=20')
            .then(response => response.json())
            .then(data => this.setState({products: this.spliceArr(data)}))
            .catch(error => console.log(error));

        generateRandomButUniqueImages().then(data => this.setState({ads: data}));

        // fetch('http://localhost:3000/products')
        //     .then(response => response.json())
        //     .then(data => this.setState({products: this.spliceArr(data)}))
        //     .catch(error => console.log(error));
    }

    handleSort = (event) => {
        const { value } = event.target;

        fetch(`/products?_limit=100&_sort=${value}`)
            .then(response => response.json())
            .then(data => this.setState({products: this.spliceArr(data)}))
            .catch(error => console.log(error))
    };

    render() {
        const {products} = this.state;
        return (
            <div className='app'>
                <header className='header'>
                    <h1>
                        Product Grid
                    </h1>
                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to
                        peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                </header>
                <main className='main-content'>
                    <div className="sort-products">
                        <label htmlFor="sort-button">Sort By:</label>
                        <select className='sort-button' onChange={this.handleSort}>
                            <option value=''> </option>
                            <option value="id">id</option>
                            <option value="size">size</option>
                            <option value="price">price</option>
                        </select>
                    </div>
                    {
                        products.length ? products.map((twentyProducts, index) =>
                                <div>
                                    <ProductsOverview items={twentyProducts}/>
                                    <Ad url={this.state.ads[index]}/>
                                </div>)
                            :<span>Loading . . .</span>
                    }
                    {/*{products ? <Grid items={filteredProducts}/> : <span>Loading . . .</span>}*/}
                    <p className="end">
                        ~ end of catalogue ~
                    </p>
                </main>
            </div>
        )
    }

}

export default App;