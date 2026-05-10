// Initial Imports
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Card( { id, itemId, name, price, quantity, image, description, displayAdd= false, sideDisplay = false, cartPage = false, reload, addItem, deleteItem, findItem}){
    // Initial Variables
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';
    const navigate = useNavigate();

    // Set up default propTypes to ensure necessary variables are boolean
    Card.propTypes = {
        displayAdd: PropTypes.bool,
        sideDisplay: PropTypes.bool,
        cartPage: PropTypes.bool
    }

    // Put function that updates the item in items and the cart with the changed quantity and reloads the page
    const updateQuantity = async (itemId, quantity) => {
        await Promise.all([fetch(`${API_ITEMS_URL}/${itemId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity, image: image, description: description})
        }),
        fetch(`${API_CART_URL}/${findItem(itemId)}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity, image: image, description: description})
        })])
        reload()
    }

    // Adds item to cart and updates quantity in items
    const handleAddToCart = async () => {
        if (quantity == 0) {
            await addItem(id, itemId, name, price, 1, image, description);
        }
        updateQuantity(itemId, quantity + 1);
    }
    // Removes item from cart and updates quantity in items
    const handleRemoveFromCart = async () => {
        updateQuantity(itemId, quantity - 1);
        deleteItem(itemId)
    }
    // These functions update quantity up or down in items and cart
    const handleAddOne = () => {
        updateQuantity(itemId, quantity + 1);
    }
    const handleRemoveOne = () => {
        updateQuantity(itemId, quantity - 1);
    }

    // Routes to specific product page
    const handleCardPage = () => {
        navigate(`/item/${itemId}`);
    }

    // Used for the cart page
    if (cartPage) {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="d-flex justify-content-center align-items-center" style={{height:"200px", paddingTop:"10px", cursor: "pointer"}} >
                            <img src={image} alt={name} onClick={handleCardPage} style={{width: "100%", height: "100%", objectFit:"contain"}} />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h2 onClick={handleCardPage} style={{paddingTop: "10px", paddingBottom: "90px", cursor: "pointer"}}>{name}</h2>
                        {quantity == 1 ? (
                            <div className="btn-group border border-warning align-self-start" role="group" aria-label="Cart Control">
                                <Button className="btn-card bg-transparent" variant="light" onClick={handleRemoveFromCart}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </Button>
                                <span className="px-3 align-content-center">{quantity}</span>
                                <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                            </div>
                        ) : (
                            <div className="btn-group border border-warning align-self-start" role="group" aria-label="Cart Control">
                                <Button className="btn-card bg-transparent" variant="light" onClick={handleRemoveOne}>-</Button>
                                <span className="px-3 align-content-center">{quantity}</span>
                                <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                            </div>
                        )}
                    </div>
                    <div className="col-md-2">
                        <h2 style={{paddingTop: "10px"}}>${Number(price).toFixed(2)}</h2>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className={sideDisplay ? "p-3 h-100 d-flex flex-column justify-content-center align-items-center" : "border p-3 h-100 d-flex flex-column"} style={sideDisplay ? {borderBottom: "2px solid #EAEDED"} : {}}>
            <img src={image} alt={name} onClick={handleCardPage} style={{maxWidth: "100%", maxHeight: "200px", objectFit:"contain", cursor: "pointer"}} />
            {sideDisplay ? null :
                <h1 onClick={handleCardPage} style={{cursor: "pointer"}}>{name}</h1>
            }
            <h3>${Number(price).toFixed(2)}</h3>
            {quantity != 0 ?
                (quantity == 1 ? (
                    <div className={sideDisplay ? "btn-group border border-warning align-self-center" : "btn-group border border-warning align-self-start"} role="group" aria-label="Cart Control">
                        <Button className="btn-card bg-transparent" variant="light" onClick={handleRemoveFromCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </Button>
                        <span className="px-3 align-content-center">{quantity}</span>
                        <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                    </div>
                    ) : (
                        <div className={sideDisplay ? "btn-group border border-warning align-self-center" : "btn-group border border-warning align-self-start"} role="group" aria-label="Cart Control">
                            <Button className="btn-card bg-transparent" variant="light" onClick={handleRemoveOne}>-</Button>
                            <span className="px-3 align-content-center">{quantity}</span>
                            <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                        </div>
                    )
                ) : (<Button className="add align-self-start" variant="warning" onClick={handleAddToCart}>Add to cart</Button>)}
        </div>
    )
}
export default Card