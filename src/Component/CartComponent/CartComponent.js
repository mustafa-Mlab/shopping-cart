import React, {Component, useContext} from 'react';

import './CartComponent.css';

import CartItem from '../CartItemComponent/CartItemComponent';
import { CartContext } from '../../Providers/CartContext/CartContext';



class CartComponent extends Component{
 
  static contextType = CartContext;

  constructor(props){
    super(props);
    this.getProduct = this.getProduct.bind(this);
    this.state = [];
  }

  componentDidMount(){
    this.setState(this.context.cart);
  }

  getProduct(id){
    const productList = this.props.productList.data;
    let thisItem = {};
    productList.map(item => {
      if(parseInt(item.id) === parseInt(id)) {
        thisItem = item;
      }
    })
    return thisItem;
  }

 
  render(){
    console.log(this.context);
    return(
      <div className="cart col-md-4">
        <h1 className="cart-title text-center mb30">Your cart</h1>

        <div className="row cart-header">
          <div className="col-md-1">
            <h5>ID</h5>
          </div>
          <div className=" col-md-2">
            <h5>Image</h5>
          </div>
          <div className="col-md-3">
            <h5>Title</h5>
          </div>
          <div className="col-md-2">
            <h5>Units</h5>
          </div>
          <div className=" col-md-2">
            <h5>Unit Price</h5>
          </div>
          <div className=" col-md-2">
            <h5>Total Price</h5>
          </div>
        </div>
        {this.context.cart.map(cartItems => <CartItem item={cartItems} product={this.getProduct(cartItems.CartId)} key={cartItems.CartId} /> )}

    </div>
    );
  }
}

export default CartComponent;