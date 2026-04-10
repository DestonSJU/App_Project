import React from 'react';
function SearchBar(){
//we could use filter
    const products = ['apt', 'applet', 'apple']
    const handleSearch = () => {
        const inputText = document.getElementById('search').value;
        let filtProds = products.filter(product =>
            product.includes(inputText))
        console.log(filtProds)
    }
    return (
        <>
            <b>Search: </b><input id="search" onChange={handleSearch}/>
        </>
    )
}
export default SearchBar