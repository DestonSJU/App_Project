import React from 'react';
import SearchBar from "./SearchBar";
function NavBar(search) {
    const styles = {
        div1: {
            backgroundColor: 'lightblue',
        },
        button1: {

        }
    }
    return (
        <div style={styles.div1} >
            <button style={styles.button1}>Home</button>
            <SearchBar seacrh={search}/>
            <button style={styles.button1}>Search</button>
            <button style={styles.button1}>Reset Search</button>
            <button style={styles.button1}>Cart</button>
        </div>
    )
}
export default NavBar;