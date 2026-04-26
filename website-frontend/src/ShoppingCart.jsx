import React, { useState, useEffect } from 'react';
import Card from "./Card";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';

function ShoppingCart({cart, setCart, reload}) {
    const API_CART_URL = 'http://localhost:5000/cart';

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
        fetch(`${API_CART_URL}/${findIdInCart(itemId)}`, {method: 'DELETE'})
            .then(() => setCart(cart.filter(t => t.itemId !== itemId)));
    };
    const findIdInCart = (itemId) => {
        const cartItem = cart.find(t => t.itemId == itemId)
        return cartItem ? cartItem.id : null
    }

    return (
        <div className="container-fluid">
            <h1 class="text-center">Cart</h1>
            <ul className="row g-2">
                {cart.map((product) => (
                    <div className="p-0 border-0 bg-transparent">
                        <Card key={product.id} id = {product.id} itemId={product.itemId} name={product.name}
                              price={product.price} quantity={product.quantity} image={product.image} displayAdd={true}
                              reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                    </div>
                ))}
            </ul>
        </div>
    )
}
export default ShoppingCart