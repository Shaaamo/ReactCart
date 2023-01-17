import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

function Header(props) {
  const { cartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)


  return (
    < header className="d-flex justify-between align-center p-40" >
      <Link to={`/ReactCart`}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React boots</h3>
            <p className="opacity-5">The coolest sneakers shop</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/cart.svg" alt="Cart" />
          <span>{totalPrice} zl.</span>
        </li>
        <li className="cu-p mr-20">
          <Link to={`/favorites`}>
            <img width={18} height={18} src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/heart.svg" alt="heart" />
          </Link>
        </li>
        <li>
          <Link to={`/orders`}>
            <img width={18} height={18} src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/user.svg" alt="User-img" />
          </Link>
        </li>
      </ul>
    </header >
  );
}

export default Header;
