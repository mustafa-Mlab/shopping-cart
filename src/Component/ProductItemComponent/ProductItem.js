import React, {Component} from 'react'
import './ProductItem.css';

import AddToCartButtonComponent from '../AddToCartButtonComponent/AddToCartButtonComponent'

import {CartConsumer} from '../../Providers/CartContext/CartContext'


class ProductItemComponent extends Component{

  render(){
    const { id, title, size, price, sell_price, available_sizes, color, description, image, quantity  } = this.props.product
    return(
    <div className="item col-md-4" data-id={id}>
      <div className="image">
        <img className="w-100" src={image} alt={title} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{title}</h1>
        <div className="col-md-12 price-section">
          <span className="col-md-6 regular-price">{price}$</span>
          <span className="col-md-6 sell-price text-right">{sell_price}$</span>
        </div>
        <CartConsumer>
          <AddToCartButtonComponent product_id={id}  />
        </CartConsumer>
      </div>
    </div>
    );
  }
}

export default ProductItemComponent;