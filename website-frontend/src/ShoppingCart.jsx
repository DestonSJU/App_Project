import React, { useState, useEffect } from 'react';
import Card from "./Card";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';

function ShoppingCart({cart, setCart, reload, sideDisplay}) {
    const API_CART_URL = 'http://localhost:5000/cart';
    let subtotal = 0;

    useEffect(() => {
        for (let i = 0; i < cart.length; i++) {
            subtotal = subtotal + cart[i].price;
        }
    }, [cart])
    const deleteItemFromCart = (itemId) => {
        fetch(`${API_CART_URL}/${findIdInCart(itemId)}`, {method: 'DELETE'})
            .then(() => setCart(cart.filter(t => t.itemId !== itemId)));
    };
    const findIdInCart = (itemId) => {
        const cartItem = cart.find(t => t.itemId == itemId)
        return cartItem ? cartItem.id : null
    }

    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + cart[i].price * cart[i].quantity;
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center">Shopping Cart</h1>
            <h2 className="text-center">Subtotal</h2>
            <h2 className="subtotal text-center">${subtotal.toFixed(2)}</h2>
            <ul className="row g-2">
                {cart.map((product) => (
                    <div className="p-0 border-0 bg-transparent">
                        <Card key={product.id} id = {product.id} itemId={product.itemId} name={product.name}
                              price={product.price} quantity={product.quantity} image={product.image} displayAdd={true} sideDisplay={sideDisplay}
                              reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                    </div>
                ))}
            </ul>
        </div>
    )
}
export default ShoppingCart