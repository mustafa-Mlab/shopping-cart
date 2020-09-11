import React, {Component} from 'react'
import logo from './assets/img/logo.svg';
import ProductList from './Data/products.json';

import './assets/css/App.css';

import Header from './Component/HeaderComponent/HeaderComponent'
import ProductItem from './Component/ProductItemComponent/ProductItem'
import Cart from './Component/CartComponent/CartComponent'

import CartProvider from './Providers/CartContext/CartContext'

class App extends Component{
    
  render(){
    return (
      <CartProvider>
        <div className="App">
          <div className="container-fluid">
            <div className="content">  
              <Header logo={logo}/>
              <div className="row">
                <div className="col-md-8 product-list">
                
                  <div className="filter-bar row">
    
                  </div>
                  <div className="products row">
                    { ProductList.data.map(item => <ProductItem product={item} key={item.id}/>) }
                  </div> 
                </div>
                <Cart productList={ProductList}/>
                
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
      </CartProvider>
    );
  }
}

export default App;
