import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar';
import "./Header.css"
import { MdAccountBalance, MdOutlineDarkMode } from 'react-icons/md';
import Currency from "../../data/Currency/mock_data.json"
import { ThemeContext } from '../../context';
import data from '../../data/Currency/mock_currency.json'
import HeaderCard from '../headercard/HeaderCard.js';

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
                            <MdAccountBalance className="navbar-icon" />
                        </Link>
                        <div className="Searchbar">
                            <Searchbar placeholder="Type here to search currency." data={Currency} />
                        </div>
                    </div>
                    <div className="navbar-container-right">
                        <ul className="nav-menu" >
                            <li className="nav-item">
                                <Link to="/currency" className="nav-links">
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
                            <MdOutlineDarkMode className="darkMode" />
                        </div>
                        <div className="t" style={{ backgroundColor: theme.state.darkMode ? "#58A8E8" : "#9B9B9B" }}>
                            <div className="t-button" onClick={handleClick} style={{ left: theme.state.darkMode ? 20 : -5 }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="currency-wrapper">
                <div className="currency">
                    {data.map((value, key) => {
                        return <HeaderCard currency= {value.currency} country={require("../../data/Flag/" + value.country)} status={value.status} price={value.price} change={value.change} percentage={value.percentage} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header