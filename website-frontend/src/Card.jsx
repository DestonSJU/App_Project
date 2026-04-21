import React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Card( { id, itemId, name, price, quantity, displayAdd= false, reload, addItem, deleteItem, findItem } ){
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
        await fetch(`${API_ITEMS_URL}/${itemId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity})
        })
        await fetch(`${API_CART_URL}/${findItem(itemId)}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, itemId: itemId, name: name, price: price, quantity: quantity})
        })
        reload();
    }

    const handleAddToCart = () => {
        if (quantity == 0) {
            addItem(id, itemId, name, price, 1);
        }
        setIsAdded(true)
        setChangeQuantity(prev => prev + 1)
    }
    const handleRemoveFromCart = () => {
        setIsAdded(false)
        setChangeQuantity(prev => prev - 1)
        deleteItem(itemId)
    }
    const handleAddOne = () => {
        setChangeQuantity(prev => prev + 1)

    }
    const handleRemoveOne = () => {
        setChangeQuantity(prev => prev - 1)

    }

    return (
        <div>
            <h1>{name}</h1>
            <h3>${Number(price).toFixed(2)}</h3>
            {isAdded ?
                (isOne ? (
                    <>
                        <button onClick={handleRemoveFromCart}>TRASH CAN</button>
                        <p>{changeQuantity}</p>
                        <button onClick={handleAddOne}>+</button>
                    </>
                    ) : (
                        <>
                            <button onClick={handleRemoveOne}>-</button>
                            <p>{changeQuantity}</p>
                            <button onClick={handleAddOne}>+</button>
                        </>
                    )
                ) : (<button onClick={handleAddToCart}>Add to cart</button>)}
        </div>
    )
}
export default Card