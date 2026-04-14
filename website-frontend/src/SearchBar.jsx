import React from 'react';
function SearchBar({search}){

    return (
        <>
            <b>Search: </b><input id="search" onChange={search}/>
        </>
    )
}
export default SearchBar