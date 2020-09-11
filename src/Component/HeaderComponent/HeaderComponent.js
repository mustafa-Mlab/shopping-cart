import React, {Component} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './HeaderComponent.css';

class HeaderComponent extends Component{
  
  render(){
    const logo = this.props.logo
    // const coffeeIcon = <FontAwesomeIcon icon={faCoffee} /> // for donation menu item
    // const downIcon = <FontAwesomeIcon icon={faCaretDown} /> // if menu have sub item
    return(
      <header className="row">
        <div className="logo col-md-3"><img className="site-logo" src={logo} alt="Logo " /></div>
        <div className="menu col-md-9">
          <ul className="main-nav">
    <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Man</a></li>
    <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Woman</a></li>
            <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Kids</a></li>
            <li className="menu-item"><a className="menu-link" href="http://localhost:3000/" >Lifestyle</a></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;