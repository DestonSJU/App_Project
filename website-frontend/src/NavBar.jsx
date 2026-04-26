import React from 'react';
import SearchBar from "./SearchBar";
function NavBar(search) {
    const styles = {
        div1: {
            backgroundColor: '#232f3e',
        },
        button1: {
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
        }
    }
    return (
        <div style={styles.div1} >
            <button style={styles.button1}>Home</button>
            <button style={styles.button1}>About</button>
            <button style={styles.button1}>Deals</button>
            <button style={styles.button1}>Best Sellers</button>
            <button style={styles.button1}>Help</button>
        </div>
    )
}
export default NavBar;