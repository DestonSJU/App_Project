import React from 'react';
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function CardPage({items, reload, addItem, deleteItem, findItem}) {
    const API_ITEMS_URL = 'http://localhost:5000/items';
    const API_CART_URL = 'http://localhost:5000/cart';


    const {id} = useParams();
    const product = items.find((item) => item.id == id);
    if (!product) {
        return (<h1 className="text-center"> Loading...</h1>)
    }

    const updateQuantity = async (itemId, quantity) => {
        await Promise.all([fetch(`${API_ITEMS_URL}/${itemId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: product.id, itemId: product.itemId, name: product.name, price: product.price, quantity: quantity, image: product.image})
        }),
            fetch(`${API_CART_URL}/${findItem(itemId)}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: product.id, itemId: product.itemId, name: product.name, price: product.price, quantity: quantity, image: product.image})
            })])
        reload()
    }

    const handleAddToCart = async () => {
        if (product.quantity == 0) {
            await addItem(product.id, product.itemId, product.name, product.price, 1, product.image);
        }
        updateQuantity(product.itemId, product.quantity + 1);
    }
    const handleRemoveFromCart = async () => {
        updateQuantity(product.itemId, product.quantity - 1);
        deleteItem(product.itemId)
    }
    const handleAddOne = () => {
        updateQuantity(product.itemId, product.quantity + 1);
    }
    const handleRemoveOne = () => {
        updateQuantity(product.itemId, product.quantity - 1);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4 offset-md-1">
                    <div className="d-flex justify-content-center align-items-center" style={{height:"800px", paddingTop:"100px"}} >
                        <img src={product.image} alt={product.name} style={{width: "100%", height: "100%", objectFit:"contain"}} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="row" style={{paddingTop: "200px", borderBottom: "2px solid #EAEDED"}}>
                        <h1>{product.name}</h1>
                    </div>
                    <div className="row" style={{paddingTop: "50px", borderBottom: "2px solid #EAEDED"}}>
                        <h1>${Number(product.price).toFixed(2)}</h1>
                    </div>
                    <div className="row" style={{paddingTop: "50px"}}>
                        <h1>About This Item:</h1>
                        <h3>More details will be listed soon</h3>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row" style={{paddingTop: "300px"}}>
                        <h1>${Number(product.price).toFixed(2)}</h1>
                    </div>
                    {product.quantity != 0 ?
                        (product.quantity == 1 ? (
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
                                    <span className="px-3 align-content-center">{product.quantity}</span>
                                    <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                                </div>
                            ) : (
                                <div className="btn-group border border-warning align-self-start" role="group" aria-label="Cart Control">
                                    <Button className="btn-card bg-transparent" variant="light" onClick={handleRemoveOne}>-</Button>
                                    <span className="px-3 align-content-center">{product.quantity}</span>
                                    <Button className="btn-card bg-transparent" variant="light" onClick={handleAddOne}>+</Button>
                                </div>
                            )
                        ) : (<Button className="add align-self-start" variant="warning" onClick={handleAddToCart}>Add to cart</Button>)}

                </div>
            </div>
        </div>
    )
}
export default CardPage