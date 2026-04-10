import React from 'react';
import { useState } from 'react'
function Card( { id, name, price, quantity, reload } ){
//state variables and setters
    const [isAdded, setIsAdded] = useState(false)
    const [isOne, setIsOne] = useState(false)
    const [changeQuantity, setChangeQuantity] = useState(quantity)
    const API_URL = 'http://localhost:5000/cart';

    const updateQuantity = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, name: name, price: price, quantity: changeQuantity})
        })
        reload();
    }
    const handleAddToCart = () => {
        setIsAdded(!isAdded)
        if (quantity == 1) {
            setIsOne(true)
        }
    }
    const handleRemoveFromCart = () => {
        setIsAdded(!isAdded)
        if (quantity != 1) {
            setIsOne(false)
        }
    }
    const handleAddOne = () => {
        setChangeQuantity((changeQuantity) => changeQuantity + 1)
        if (changeQuantity > 1) {
            setIsOne(false)
        }
        updateQuantity(id)
    }
    const handleRemoveOne = () => {
        setChangeQuantity((changeQuantity) => changeQuantity - 1)
        if (changeQuantity == 1) {
            setIsOne(true)
        }
        updateQuantity(id)
    }

    return (
        <div>
            <h1>Product Name: {name}</h1>
            <h3>Price: ${Number(price).toFixed(2)}</h3>
            {isAdded ?
                (isOne ? (
                    <>
                        <button onClick={handleRemoveFromCart}>DELETE</button>
                        <p>{quantity}</p>
                        <button onClick={handleAddOne}>+</button>
                    </>
                    ) : (
                        <>
                            <button onClick={handleRemoveOne}>-</button>
                            <p>{quantity}</p>
                            <button onClick={handleAddOne}>+</button>
                        </>
                    )
                ) : (<button onClick={handleAddToCart}>Add to cart</button>)}
        </div>
    )
}
export default Card