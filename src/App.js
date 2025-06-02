import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id =>
    this.setState(prevState => {
      const {cartList} = prevState
      const newCartList = cartList.filter(item => item.id !== id)
      return {cartList: newCartList}
    })

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = product =>
    this.setState(prevState => {
      const {cartList} = prevState
      return {
        cartList: cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : {...item},
        ),
      }
    })

  decrementCartItemQuantity = product => {
    this.setState(prevState => {
      const updatedCart = prevState.cartList
        .map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0) // Remove if quantity reaches 0
      return {cartList: updatedCart}
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingProduct = cartList.find(item => item.id === product.id)

    if (existingProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : {...item},
        ),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
