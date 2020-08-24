import React, {Component} from 'react'
import './ProductItem.css';

import AddToCartButtonComponent from '../AddToCartButtonComponent/AddToCartButtonComponent'

class ProductItemComponent extends Component{
  // constructor(props){
  //   console.log(this);
  //   console.log(props);
  // }
  render(){
    // console.log(this.props);
    const { id, title, size, price, sell_price, available_sizes, color, description, image, quantity,  } = this.props.product
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
        <AddToCartButtonComponent product_id={id} />
        
      </div>
    </div>
    // <h1>{ProductTitle}</h1>
    );
  }
}

export default ProductItemComponent;