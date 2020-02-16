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
            standbyProducts: [],
            reachedBottom: false
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

        fetch('/products?_limit=20')// only fetch a few items first time for the user to see something fast
            .then(response => response.json())
            .then(data => this.setState({products: this.spliceArr(data)}))
            .catch(error => console.log(error));

        generateRandomButUniqueImages().then(data => this.setState({ads: data}));

        fetch('/products')//fetching all the products in behind after showing the user a few content
            .then(response => response.json())
            .then(data => this.setState({standbyProducts: this.spliceArr(data)}) )
            .catch(error => console.log(error));

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        //const closeToBottom = Math.floor(document.body.scrollHeight - window.innerHeight) === Math.floor(window.scrollY);

        if (windowBottom === docHeight && this.state.standbyProducts.length > 1) {
            this.setState((prevState) => ({
                products: [...prevState.products, prevState.standbyProducts[1]],
                standbyProducts: prevState.standbyProducts.filter((value, index) => index !== 1 )
            }));
        }

        if (this.state.products.length === 25) {
            this.setState({reachedBottom: true})
        }else{
            this.setState({reachedBottom: false})
        }
    };

    handleSort = (event) => {
        const { value } = event.target;

        fetch(`/products?_limit=20&_sort=${value}`)
            .then(response => response.json())
            .then(data => this.setState({products: this.spliceArr(data)}))
            .catch(error => console.log(error));

        fetch(`/products?_sort=${value}`)
            .then(response => response.json())
            .then(data => this.setState({standbyProducts: this.spliceArr(data)}))
            .catch(error => console.log(error));

    };

    render() {
        const {products, reachedBottom } = this.state;
        return (
            <div className='app'>
                <header className='header'>
                    <h1>
                        Ascii Faces
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
                    { /*one might think that as the products changes and products.length increases, this loop will run again and everything will be re-rendered all over, but we can see in the developer's tool that this is not true because react is tool smart for that*/
                        products.length ? products.map((twentyProducts, index) =>
                                <div key={index}>
                                    <ProductsOverview items={twentyProducts}/>
                                    <Ad url={this.state.ads[index]}/>
                                </div>)
                            :<span className='main-content__loading'> Loading . . .</span>
                    }
                    {!reachedBottom ?
                        <p className="main-content__fetching">
                            Wait for it . . .
                        </p>
                        :
                        <p className="main-content__end">
                            ~ end of catalogue ~
                        </p>
                    }
                </main>
            </div>
        )
    }

}

export default App;