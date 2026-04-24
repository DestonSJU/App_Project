import React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';

function Card( { id, itemId, name, price, quantity, image, displayAdd= false, reload, addItem, deleteItem, findItem}){
//state variables and setters
    const [isAdded, setIsAdded] = useState(displayAdd)
    const [isOne, setIsOne] = useState(false)
    const [changeQuantity, setChangeQuantity] = useState(quantity)
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';
    Card.propTypes = {
        displayAdd: PropTypes.bool
    }

    useEffect(() => {
        if (changeQuantity == 1) {
            setIsOne(true)
        }
        else {
            setIsOne(false)
        }
        updateQuantity(itemId, changeQuantity);
    }, [changeQuantity]);



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

    const handleAddToCart = () => {
        if (quantity == 0) {
            addItem(id, itemId, name, price, 1, image);
        }
        setIsAdded(true)
        setChangeQuantity(prev => prev + 1)
        reload()

    }
    const handleRemoveFromCart = () => {
        setIsAdded(false)
        setChangeQuantity(prev => prev - 1)
        deleteItem(itemId)
        reload()

    }
    const handleAddOne = () => {
        setChangeQuantity(prev => prev + 1)
        reload()



    }
    const handleRemoveOne = () => {
        setChangeQuantity(prev => prev - 1)
        reload()
    }

    return (
        <div>
            <img src={image} alt={name} style={{ width: "200px" }} />
            <h1>{name}</h1>
            <h3>${Number(price).toFixed(2)}</h3>
            {isAdded ?
                (isOne ? (
                    <div className="card">
                        <button onClick={handleRemoveFromCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                        <p>{changeQuantity}</p>
                        <button onClick={handleAddOne}>+</button>
                    </div>
                    ) : (
                        <div className="card">
                            <button onClick={handleRemoveOne}>-</button>
                            <p>{changeQuantity}</p>
                            <button onClick={handleAddOne}>+</button>
                        </div>
                    )
                ) : (<button onClick={handleAddToCart}>Add to cart</button>)}
        </div>
    )
}
export default Card