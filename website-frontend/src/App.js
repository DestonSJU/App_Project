import logo from './logo.svg';
import './App.css';
import Card from './Card'
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import ShoppingCart from "./ShoppingCart";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

//functional component
function App( ) {
//defining CSS styling in a variable
  const styles = {
    div1: {
      backgroundColor: 'grey',
      color: 'lightyellow',
      border: '3px dotted lightblue'
    },
    header1: {
      color: 'black'
    }
  }
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';

    useEffect(() => {
        fetch(API_ITEMS_URL)
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);
    useEffect(() => {
        fetch(API_CART_URL)
            .then(res => res.json())
            .then (data => setCart(data));
    }, []);

    const reloadPage = () => {
        fetch(API_ITEMS_URL)
            .then(res => res.json())
            .then(data => setItems([...data]))

        fetch(API_CART_URL)
            .then(res => res.json())
            .then(data => setCart([...data]))

    }
    const addItemToCart = (id, itemId, name, price, quantity, image) => {
        fetch(API_CART_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity, image: image})
        })
            .then(res => res.json())
            .then(newCart => setCart([...cart, newCart]));
    };

    const deleteItemFromCart = (itemId) => {
        fetch(`${API_CART_URL}/${findIdInCart(itemId)}`, {method: 'DELETE'})
            .then(() => setCart(cart.filter(t => t.itemId !== itemId)));
    };
    const findIdInCart = (itemId) => {
        const cartItem = cart.find(t => t.itemId == itemId)
        return cartItem ? cartItem.id : null
    }

  return (
//applying styling
      <div className="container">
        <h1 style={styles.header1}>Welcome to Amazon.com</h1>
        <NavBar />
          <ul>
              <div className="row">
              {items.map((product) => (
                  <div className="col-md-4">
                  <Card key={product.id} id = {product.id} itemId={product.itemId} name={product.name}
                        price={product.price} quantity={product.quantity} image={product.image} reload={reloadPage} addItem={addItemToCart} deleteItem={deleteItemFromCart} findItem={findIdInCart}/>
                  </div>
              ))}
              </div>
          </ul>
          {cart.length > 0 ? (
              <div className="container">
                <div className="position-fixed top-0 end-0">
                  <ShoppingCart cart={cart} appReload={reloadPage} deleteItem={deleteItemFromCart} findId={findIdInCart} />
                </div>
              </div>
          ) : null}
      </div>
  )
}
export default App
