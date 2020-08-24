import React from 'react';
import logo from './assets/img/logo.svg';
import ProductList from './Data/products.json';
import './assets/css/App.css';

// import SingleProduct from './Component/ProductItemComponent/ProductItem'
import ProductItemComponent from './Component/ProductItemComponent/ProductItem'

function App() {
  console.log(ProductList);
  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-md-9 product-list">
              {/* <header className="col-md-12"> */}
              <div className="logo col-md-3"><img className="site-logo" src={logo} alt="Logo " /></div>
              <div className="menu col-md-9">
                <ul className="main-nav">
                  <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Man</a></li>
                  <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Woman</a></li>
                  <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Kids</a></li>
                  <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Lifestyle</a></li>
                </ul>
              </div>
            {/* </header> */}
            </div>
            <div className="filter-bar row">

            </div>
            <div className="products row">
              { ProductList.data.map(item => <ProductItemComponent product={item} />) }
            </div>
          </div>
          <div className="row">
            <div className="cart col-md-3">
                <div className="row">
                  <div className="col-md-2">
                    <h2>ID</h2>
                  </div>
                  <div className="col-md-4">
                    <h2>Title</h2>
                  </div>
                  <div className="col-md-3">
                    <h2>Quantity</h2>
                  </div>
                  <div className=" col-md-3">
                    <h2>Price</h2>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="container">
        <div className="row text-center">
          <div className="col-md-12">
            All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
