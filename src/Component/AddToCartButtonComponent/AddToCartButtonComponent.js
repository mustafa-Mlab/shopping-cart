import React, {Component} from 'react'

import './AddToCartButtonComponent.css';
import { CartContext } from '../../Providers/CartContext/CartContext';


class AddToCartButtonComponent extends Component{
  
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static contextType = CartContext;
  
  handleClick(e) {
    e.preventDefault();
    const id = this.props.product_id
    let currentCart = this.context.cart;
    let newCartItem = {};
    if(currentCart.length){
      let cartid = currentCart.length + 1;
      let match = 0;
      for (const [key, value] of Object.entries(currentCart)) {
        if(value.ProductId === id){
          currentCart[key].ProductQuantity++;
          match = 1;
        }
      }
      if( ! match ){
        newCartItem = {
          'ProductId': id,
          'CartId': cartid,
          'ProductQuantity': 1
        }
        currentCart.push(newCartItem);
      }
      this.context.setCart(currentCart);
    }else{
      let cartid = 1;
      newCartItem = {
        'ProductId': id,
        'CartId': cartid,
        'ProductQuantity': 1
      }
      currentCart.push(newCartItem);
      this.context.setCart(currentCart);
    }
    // let cartid = (localStorage.getItem("cartItem") !== null) ? JSON.parse(localStorage['cartItem']).length + 1 : 1;
    // var oldItems = JSON.parse(localStorage.getItem('cartItem')) || [];
    // if( Array.isArray(oldItems) && oldItems.length ){
    //   let match = 0;
    //   for (const [key, value] of Object.entries(oldItems)) {
    //     if(value.ProductId === id){
    //       oldItems[key].ProductQuantity++;
    //       match = 1;
    //     }
    //   }
    //   if( ! match ){
    //     var newItem = {
    //       'ProductId': id,
    //       'CartId': cartid,
    //       'ProductQuantity': 1
    //     };
    //     oldItems.push(newItem);
    //   }

    //   localStorage.setItem('cartItem', JSON.stringify(oldItems));
    // }else{
    //   var newItem = {
    //     'ProductId': id,
    //     'CartId': cartid,
    //     'ProductQuantity': 1
    //   };
    //   oldItems.push(newItem);

    //   localStorage.setItem('cartItem', JSON.stringify(oldItems));
    // }
  }
  render(){
    console.log(this.context);
    const id = this.props.product_id
    return(
        <a className="add-to-cart" href="http://localhost:3000/" data-productid={id} onClick={this.handleClick} >Add to cart</a>
    );
  }
}

export default AddToCartButtonComponent;