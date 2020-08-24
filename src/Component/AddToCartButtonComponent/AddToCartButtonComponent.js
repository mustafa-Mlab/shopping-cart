import React, {Component} from 'react'

import './AddToCartButtonComponent.css';

class AddToCartButtonComponent extends Component{
  
  render(){
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.', id);
    }
    const id = this.props.product_id
    return(
      <a className="add-to-cart" href="http://localhost:3000/" data-productID={id} onClick={handleClick} >Add to cart</a>
    );
  }
}

export default AddToCartButtonComponent;