import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar';
import "./Header.css"
import { MdAccountBalance, MdOutlineDarkMode } from 'react-icons/md';
import Currency from "../../data/Currency/mock_currency_all.json"
import { ThemeContext } from '../../context';
import HeaderCard from '../headercard/HeaderCard.js';
import axios from 'axios';

const Header = () => {
    const [cardData,setcardData] = useState();
    useEffect(() => {
        axios.get(`http://185.78.166.45:8000/header/`)
      .then(res => {
          console.log(res.data)
        setcardData(res.data);
      })

    },[])
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const handleClick = () => {
        theme.dispatch({ type: "TOGGLE" })
    }

    return (
        <div className="header">
            <div className="navbar-wrapper" style = {{background : darkMode && "#212121" , borderColor : darkMode && "#212121"}}>
                <div className="navbar">
                    <div className="navbar-container-left">
                        <Link to="/" className="navbar-logo">
                            <MdAccountBalance className="navbar-icon" style = {{color : darkMode && "white"}}/>
                        </Link>
                        <div className="Searchbar">
                            <Searchbar placeholder="Type here to search currency." data={Currency} />
                        </div>
                    </div>
                    <div className="navbar-container-right">
                        <ul className="nav-menu" >
                        <li className="nav-item">
                                <Link to="/compare" className="nav-links" style = {{color : darkMode && "white"}}>
                                    Compare
                                </Link>
                            </li>
                        <li className="nav-item">
                                <Link to="/choice" className="nav-links" style = {{color : darkMode && "white"}}>
                                    Best Choice
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/currency" className="nav-links" style = {{color : darkMode && "white"}}>
                                    Currency
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-links" style = {{color : darkMode && "white"}}>
                                    About
                                </Link>
                            </li>
                        </ul>
                        <div className="Moon">
                            <MdOutlineDarkMode className="darkMode"/>
                        </div>
                        <div className="t" style={{ backgroundColor: theme.state.darkMode ? "#58A8E8" : "#9B9B9B" }}>
                            <div className="t-button" onClick={handleClick} style={{ left: theme.state.darkMode ? 20 : -5 }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="currency-wrapper" style = {{backgroundColor : darkMode && "rgba(33, 33, 33, 0.75)"}}>
                <div className="currency">
                    {cardData && cardData.map((value, key) => {
                        return <HeaderCard currency= {value.currency} country={require(`../../data/Flag/${value.currency}.png`)} status={value.status} price={value.price} change={value.change} percentage={value.percentage} />
                    })}
                </div>
            </div>
        </div>
    )
}
//return <HeaderCard currency= {value.currency} country={require("../../data/Flag/" + value.country)} status={value.status} price={value.price} change={value.change} percentage={value.percentage} />
export default Header