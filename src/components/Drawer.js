import Info from "./Info";
import React, { useContext, useState } from 'react';
import { AppContext } from "../App";
import axios from "axios";



function Drawer({ onClose, items = [], onRemove }) {
  const { cartItems, setCartItems } = useContext(AppContext)
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://63a4e3fe2a73744b0081b2ee.mockapi.io/orders', {
        items: cartItems,
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])


    } catch (error) {
      console.log(error, "(((");
    }
    setIsLoading(false)
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Basket <img className="cu-p" onClick={onClose} src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/btn-remove.svg" alt="Remove" />
        </h2>


        {
          items.length > 0 ?
            <div className="d-flex flex-column flex">
              <div className="items">
                {
                  items.map((obj) => (
                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                      <div
                        style={{ backgroundImage: `url(${obj.image})` }}
                        className="cartItemImg"></div>

                      <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} zl.</b>
                      </div>
                      <img onClick={() => onRemove(obj.id)} className="removeBtn" src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/btn-remove.svg" alt="Remove" />
                    </div>
                  ))
                }
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Total:</span>
                    <div></div>
                    <b>{totalPrice} zl. </b>
                  </li>
                  <li>
                    <span>Tax 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice / 100 * 5)} zl. </b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                  Make an order <img src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
            :
            <Info
              title={isOrderComplete ? "You've made an order" : "Your bag is empty"}
              description={isOrderComplete ? `Your order will be delivered soon. Your ID is ${orderId}` : "Add at least one pair of sneakers to place an order."}
              image={isOrderComplete ? "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/complete-order.jpg" : "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/empty-cart.jpg"}
            />
        }

      </div>
    </div>
  );
}

export default Drawer;
