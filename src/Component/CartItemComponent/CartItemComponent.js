import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import './CartItemComponent.css';

class CartItemComponent extends Component{

  getPrice(product){
    if(product.sell_price){
      return product.sell_price;
    }else{
      return product.price;
    }
  }

  incraseQuantity(id){
    return "";
  }
  decraseQuantity(id){
    return "";
  }
  render(){
    console.log(this.props);
    const thisProduct = this.props.product;
    const thisItem = this.props.item;
    const upIcon = <FontAwesomeIcon icon={faCaretUp} /> // for donation menu item
    const downIcon = <FontAwesomeIcon icon={faCaretDown} /> // if menu have sub item
    return(
      <div className="row">
        <div className="col-md-1">
          <h5>{thisItem.CartId}</h5>
        </div>
        <div className=" col-md-2">
          <img className="w-100" src={thisProduct.image} alt={thisProduct.title} />
        </div>
        <div className="col-md-3">
          <h5>{thisProduct.title}</h5>
        </div>
        <div className="col-md-2 quantity">
          <h5><span className="unit-count">{ thisItem.ProductQuantity }</span> 
            <span className="up-down-icon">
              <span className="qup-icon" data-CartId={thisItem.CartId} onClick={this.incraseQuantity} >{upIcon}</span>
              <span className="qdown-icon"data-CartId={thisItem.CartId} onClick={this.decraseQuantity} >{downIcon}</span>
            </span>
          </h5>
        </div>
        <div className=" col-md-2">
          <h5>{this.getPrice(thisProduct)}</h5>
        </div>
        <div className=" col-md-2">
          <h5>{this.getPrice(thisProduct) * thisItem.ProductQuantity }</h5>
        </div>
      </div>
    );
  }
}

export default CartItemComponent;