// Initial Imports
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

function ShoppingCart({cart, setCart, reload, sideDisplay, cartPage = false}) {
    // Inital Variables
    const API_CART_URL = 'http://localhost:5000/cart';
    const navigate = useNavigate();
    let subtotal = 0;
    let totalQuantity = 0;

    // Set up default propTypes to ensure necessary variables are boolean
    ShoppingCart.propTypes = {
        sideDisplay: PropTypes.bool,
        cartPage: PropTypes.bool
    }

    // Delete function that deletes the designated item from the cart
    const deleteItemFromCart = (itemId) => {
        fetch(`${API_CART_URL}/${findIdInCart(itemId)}`, {method: 'DELETE'})
            .then(() => setCart(cart.filter(t => t.itemId !== itemId)));
    };

    // Takes an itemId and finds the corresponding item in the cart
    const findIdInCart = (itemId) => {
        const cartItem = cart.find(t => t.itemId == itemId)
        return cartItem ? cartItem.id : null
    }

    // Routes to cart
    const handleCartPage = () => {
        navigate("/cart");
    }
    // Calculates subtotal of the cart
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + cart[i].price * cart[i].quantity;
    }
    // Calculates quantity for cart icon
    for (let i = 0; i < cart.length; i++) {
        totalQuantity = totalQuantity + cart[i].quantity;
    }

    // Used for the cart page
    if (cartPage) {
        return (
            <div className="container-fluid">
                <div className="row" style={{paddingTop: "30px", marginLeft: "30px", borderBottom: "2px solid #EAEDED"}}>
                    <h1 style={{marginLeft: "-10px"}}>Shopping Cart</h1>
                    <h4 style={{marginLeft: "1040px"}}>Price</h4>
                </div>
                <div className="row g-2">
                    {cart.map((product) => (
                        <div style={{borderBottom: "2px solid #EAEDED"}} key={product.id}>
                            <Card id = {product.id} itemId={product.itemId} name={product.name}
                                  price={product.price} quantity={product.quantity} image={product.image} description={product.description} displayAdd={true} sideDisplay={sideDisplay} cartPage={cartPage}
                                  reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                        </div>
                    ))}
                </div>
                <div className="col-md-2 "></div>
                {totalQuantity == 1 ? (
                    <h2 style={{marginLeft: "812px"}}>Subtotal (1 item): ${subtotal.toFixed(2)}</h2>
                ) : (
                    <h2 style={{marginLeft: "785px"}}>Subtotal ({totalQuantity} items): ${subtotal.toFixed(2)}</h2>
                )
                }
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <h2 className="text-center">Subtotal</h2>
            <h2 className="subtotal text-center">${subtotal.toFixed(2)}</h2>
            <div className="d-flex justify-content-center" style={{paddingBottom: "10px", borderBottom: "2px solid #EAEDED"}}>
                <Button className="bg-transparent border" variant="light" onClick={handleCartPage}>Go To Cart</Button>
            </div>
            <div className="row g-2">
                {cart.map((product) => (
                    <div className="border-0 bg-transparent d-flex justify-content-center" key={product.id}>
                        <Card id = {product.id} itemId={product.itemId} name={product.name}
                              price={product.price} quantity={product.quantity} image={product.image} description={product.description} displayAdd={true} sideDisplay={sideDisplay}
                              reload={reload} deleteItem={deleteItemFromCart} findItem={findIdInCart} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ShoppingCart