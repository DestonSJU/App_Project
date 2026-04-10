import React, { useState, useEffect } from 'react';
import Card from "./Card";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const API_URL = 'http://localhost:5000/cart';

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const reloadPage = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCart(data));
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCart(data));
    }
    const handleCart = () => {

    }
    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.map((product) => (
                    <Card key={product.id} id = {product.id} name={product.name}
                          price={product.price} quantity={product.quantity} reload={reloadPage}/>
                ))}
            </ul>
        </div>
    )
}
export default ShoppingCart