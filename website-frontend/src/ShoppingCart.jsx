import React, { useState, useEffect } from 'react';
import Card from "./Card";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const API_CART_URL = 'http://localhost:5000/cart';

    useEffect(() => {
        fetch(API_CART_URL)
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const reloadPage = () => {
        fetch(API_CART_URL)
            .then(res => res.json())
            .then(data => setCart(data));
        fetch(API_CART_URL)
            .then(res => res.json())
            .then(data => setCart(data));
    }

    /*const addItemToCart = (id) => {
        fetch(API_CART_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, name: id.name, price: id.price, quantity: id.quantity})
        })
            .then(res => res.json())
            .then(newCart => setCart([...cart, newCart]));
    };*/

    const deleteItemFromCart = (itemId) => {
        fetch(`${API_CART_URL}/${itemId}`, {method: 'DELETE'})
            .then(() => setCart(cart.filter(t => t.itemId !== itemId)));
    };

    const findIdInCart = (itemId) => {
        const cartItem = cart.find(cart => cart.itemId == itemId)
        return cartItem.id
    }

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.map((product) => (
                    <Card key={product.id} id = {product.id} itemId={product.itemId} name={product.name}
                          price={product.price} quantity={product.quantity} reload={reloadPage} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                ))}
            </ul>
        </div>
    )
}
export default ShoppingCart