import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Card( { id, itemId, name, price, quantity, image, displayAdd= false, sideDisplay = false, reload, addItem, deleteItem, findItem}){
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';
    const navigate = useNavigate();

    Card.propTypes = {
        displayAdd: PropTypes.bool,
        sideDisplay: PropTypes.bool
    }

    const updateQuantity = async (itemId, quantity) => {
        await Promise.all([fetch(`${API_ITEMS_URL}/${itemId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity, image: image})
        }),
        fetch(`${API_CART_URL}/${findItem(itemId)}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity, image: image})
        })])
        reload()
    }

    const handleAddToCart = async () => {
        if (quantity == 0) {
            await addItem(id, itemId, name, price, 1, image);
        }
        updateQuantity(itemId, quantity + 1);
    }
    const handleRemoveFromCart = async () => {
        updateQuantity(itemId, quantity - 1);
        deleteItem(itemId)
    }
    const handleAddOne = () => {
        updateQuantity(itemId, quantity + 1);
    }
    const handleRemoveOne = () => {
        updateQuantity(itemId, quantity - 1);
    }
    const handleCardPage = () => {
        navigate(`/item/${id}`);
    }

    return (
        <div className={sideDisplay ? "border p-3 h-100 d-flex flex-column align-items-center" : "border p-3 h-100 d-flex flex-column"}>
            <img src={image} alt={name} onClick={handleCardPage} style={{maxWidth: "100%", maxHeight: "200px", objectFit:"contain", cursor: "pointer"}} />
            <h1 onClick={handleCardPage} style={{cursor: "pointer"}}>{name}</h1>
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