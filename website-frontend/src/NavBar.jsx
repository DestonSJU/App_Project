import React from 'react';
import {useNavigate} from 'react-router-dom';

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
    const navigate = useNavigate();
    const handleHomePage = () => {
        navigate("/");
    }
    const handleAboutPage = () => {
        navigate("/about");
    }
    const handleAllPage = () => {
        navigate("/all");
    }
    const handleHelpPage = () => {
        navigate("/help");
    }

    return (
        <div style={styles.div1} >
            <button onClick={handleHomePage} style={{...styles.button1, marginLeft:"20px"}}>Home</button>
            <button onClick={handleAboutPage} style={styles.button1}>About</button>
            <button onClick={handleAllPage} style={styles.button1}>All Items</button>
            <button onClick={handleHelpPage} style={styles.button1}>Help</button>
        </div>
    )
}
export default NavBar;