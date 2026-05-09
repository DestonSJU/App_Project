import logo from './logo.svg';
import './App.css';
import Card from './Card'
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import ShoppingCart from "./ShoppingCart";
import CardPage from "./CardPage";
import {useState, useEffect, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import {Routes, Route, Link, useLocation, useSearchParams} from "react-router-dom"
import Carousel from "react-bootstrap/Carousel"

//functional component
function App( ) {

    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search") || "";

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

    const searchedItems = items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
      <div className="container-fluid">
          <div className="row">
              <div className={cart.length > 0 && (location.pathname == "/all" || location.pathname.includes("/result")) ? "col-md-10 p-0" : "col-md-12 p-0"}>
                  <div className="d-flex" style={{backgroundColor: "#232f3e"}}>
                      <h1 className="website-title mb-0" style={{marginLeft: "20px"}}>Amazon</h1>
                      <div className="flex-grow-1 px-3">
                          <SearchBar/>
                      </div>
                      <Link to="/cart">
                          <Button className="btn-cart bg-transparent border-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                   className="bi bi-cart" viewBox="0 0 16 16">
                                  <path
                                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg> Cart
                          </Button>
                      </Link>
                  </div>

                  <NavBar/>
                  <Routes>
                      <Route path="/"
                             element={
                                 <div style={{backgroundColor: "#EAEDED", minHeight: "100vh"}}>
                                     <h1 style={{marginLeft:"600px", paddingBottom:"100px"}}>Amazon Home Page</h1>
                                     <div className="container" style={{backgroundColor: "white"}}>
                                         <div className="align-self-center">
                                             <h2>Recently Added Items</h2>
                                         </div>
                                         <Carousel>
                                             {items.slice(-5).reverse().map((product) => (
                                                 <Carousel.Item key={product.id} interval={2000}>
                                                     <Link to={`/item/${product.id}`}>
                                                         <div className="d-flex justify-content-center align-items-center" style={{height:"500px", paddingTop:"100px"}}>
                                                             <img src={product.image} alt={product.name} style={{width: "100%", height: "100%", objectFit:"contain"}}/>
                                                         </div>
                                                     </Link>
                                                 </Carousel.Item>
                                             ))}
                                         </Carousel>
                                     </div>
                                 </div>
                             }/>
                      <Route path="/all"
                             element={
                                 <ul>
                                     <div className="row g-2">
                                         {items.map((product) => (
                                             <div className="col-md-3" key={product.id}>
                                                 <Card id={product.id} itemId={product.itemId} name={product.name}
                                                       price={product.price} quantity={product.quantity} image={product.image}
                                                       reload={reloadPage} addItem={addItemToCart} deleteItem={deleteItemFromCart} findItem={findIdInCart}/>
                                             </div>
                                         ))}
                                     </div>
                                 </ul>
                             }/>
                      <Route path="/results"
                             element={
                                 <ul>
                                     <div className="row g-2">
                                         {searchedItems.map((product) => (
                                             <div className="col-md-3" key={product.id}>
                                                 <Card id={product.id} itemId={product.itemId} name={product.name}
                                                       price={product.price} quantity={product.quantity} image={product.image}
                                                       reload={reloadPage} addItem={addItemToCart} deleteItem={deleteItemFromCart} findItem={findIdInCart}/>
                                             </div>
                                         ))}
                                     </div>
                                 </ul>
                             }/>

                      <Route path="/cart"
                             element={
                                <div style={{backgroundColor: "#EAEDED", minHeight: "100vh"}}>
                                    <div className="container" style={{backgroundColor: "white"}}>
                                        <ShoppingCart cart={cart} setCart={setCart} reload={reloadPage} deleteItem={deleteItemFromCart} findId={findIdInCart} sideDisplay={true} />
                                    </div>
                                </div>
                             }/>
                      <Route path="/item/:id" element={<CardPage items={items} reload={reloadPage} addItem={addItemToCart} deleteItem={deleteItemFromCart} findItem={findIdInCart} />}/>

                      <Route path="/about"
                             element={
                                <div className="text-center">
                                    <h1>About Us</h1>
                                    <p style={{fontSize: "25px"}}>
                                        This website was created as a semester long project for a Internet App Development Class. It was made with the goal of trying
                                        to emulate Amazon.
                                    </p>
                                </div>
                             }/>
                      <Route path="/help"
                             element={
                                 <div className="text-center">
                                     <h1>Help</h1>
                                     <h1>Frequently Asked Questions</h1>
                                     <p style={{fontSize: "25px"}}>
                                         There are currently no frequently asked questions or anyone to contact for assistance.
                                     </p>
                                 </div>
                             }/>

                  </Routes>

              </div>
              {cart.length > 0 && (location.pathname == "/all" || location.pathname.includes("/result")) ? (
                  <div className="col-md-2 p-0">
                      <ShoppingCart cart={cart} setCart={setCart} reload={reloadPage} deleteItem={deleteItemFromCart} findId={findIdInCart} sideDisplay={true} />
                  </div>
              ) : null}

        </div>
      </div>
  )
}
export default App
