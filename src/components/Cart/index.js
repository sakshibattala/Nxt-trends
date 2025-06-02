import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const emptyCartItems = () => removeAllCartItems()

      const itemsInCart = cartList.length

      let orderPrice = 0
      if (cartList.length > 0) {
        const totalPrice = cartList.forEach(
          item => (orderPrice += item.quantity * item.price),
        )
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button className="remove-all-button" onClick={emptyCartItems}>
                  Remove All
                </button>
                <CartListView />
                <div className="checkout-container">
                  <h1>
                    Order Total: <span>Rs {orderPrice}/-</span>
                  </h1>
                  <p>{itemsInCart} items in cart</p>
                  <button type="button">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
