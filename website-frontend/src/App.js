import logo from './logo.svg';
import './App.css';
import Card from './Card'
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import ShoppingCart from "./ShoppingCart";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

//functional component
function App( ) {

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
      <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 p-0">
                <div className="d-flex align-items-center" style={{backgroundColor: "#232f3e"}}>
                    <h1 className="website-title mb-0">Welcome to Amazon</h1>
                    <div className="mx-auto">
                        <SearchBar />
                    </div>
                    <Button className="btn-cart bg-transparent border-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                             className="bi bi-cart" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg> Cart
                    </Button>
                </div>
                <NavBar/>
                <ul>
                    <div className="row g-2">
                        {items.map((product) => (
                            <div className="col-md-3">
                                <Card key={product.id} id={product.id} itemId={product.itemId} name={product.name}
                                      price={product.price} quantity={product.quantity} image={product.image}
                                      reload={reloadPage} addItem={addItemToCart} deleteItem={deleteItemFromCart} findItem={findIdInCart}/>
                      </div>
                  ))}
                  </div>
                </ul>
            </div>
              {cart.length > 0 ? (
                  <div className="col-md-2 p-0">
                      <ShoppingCart cart={cart} setCart={setCart} reload={reloadPage} deleteItem={deleteItemFromCart} findId={findIdInCart} />
                  </div>

              ) : null}
          </div>
      </div>
  )
}
export default App
