import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar';
import "./Header.css"
import { AccountBalance, DarkModeOutlined } from '@mui/icons-material';
import Currency from "../../data/Currency/mock_data.json"
import { ThemeContext } from '../../context';
import image from '../../data/Flag/Sweden.png'
import Header_Card from '../header_card/Header_card.js';

const Header = () => {
    const theme = useContext(ThemeContext)
    const handleClick = () => {
        theme.dispatch({ type: "TOGGLE" })
    }
    return (
        <div className="header">
            <div className="navbar-wrapper">
                <div className="navbar">
                    <div className="navbar-container-left">
                        <Link to="/" className="navbar-logo">
                            <AccountBalance className="navbar-icon" />
                        </Link>
                        <div className="Searchbar">
                            <Searchbar placeholder="Type here to search currency." data={Currency} />
                        </div>
                    </div>
                    <div className="navbar-container-right">
                        <ul className="nav-menu" >
                            <li className="nav-item">
                                <Link to="/" className="nav-links">
                                    Currency
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-links">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <div className="Moon">
                            <DarkModeOutlined className="darkMode" />
                        </div>
                        <div className="t" style={{ backgroundColor: theme.state.darkMode ? "#58A8E8" : "#9B9B9B" }}>
                            <div className="t-button" onClick={handleClick} style={{ left: theme.state.darkMode ? 20 : -5 }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="currency-wrapper">
                <div className="currency">
                    <Header_Card currency= "USD50" country={image} status = "up" price = "33.00" change= "1.00" percentage = "1.00%" />
                </div>
            </div>
        </div>
    )
}

export default Header