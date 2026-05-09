import React, { useState, useEffect } from 'react';
import Card from "./Card";
import PropTypes from 'prop-types';

function ShoppingCart({cart, setCart, reload, sideDisplay, cartPage = false}) {
    const API_CART_URL = 'http://localhost:5000/cart';
    let subtotal = 0;

    ShoppingCart.propTypes = {
        sideDisplay: PropTypes.bool,
        cartPage: PropTypes.bool
    }

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
    if (cartPage) {
        return (
            <div className="container-fluid">
                <div className="row" style={{paddingTop: "30px", marginLeft: "30px", borderBottom: "2px solid #EAEDED"}}>
                    <h1 style={{marginLeft: "-10px"}}>Shopping Cart</h1>
                    <h4 style={{marginLeft: "1050px"}}>Price</h4>
                </div>
                <ul className="row g-2">
                    {cart.map((product) => (
                        <div style={{borderBottom: "2px solid #EAEDED"}}>
                            <Card key={product.id} id = {product.id} itemId={product.itemId} name={product.name}
                                  price={product.price} quantity={product.quantity} image={product.image} description={product.description} displayAdd={true} sideDisplay={sideDisplay} cartPage={cartPage}
                                  reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                        </div>
                    ))}
                </ul>
                <div className="col-md-2 "></div>
                <h2 style={{marginLeft: "940px"}}>Subtotal: ${subtotal.toFixed(2)}</h2>
            </div>
        )
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
                              price={product.price} quantity={product.quantity} image={product.image} description={product.description} displayAdd={true} sideDisplay={sideDisplay}
                              reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                    </div>
                ))}
            </ul>
        </div>
    )
}
export default ShoppingCart