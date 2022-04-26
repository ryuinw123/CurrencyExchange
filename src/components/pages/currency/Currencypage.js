import React, { useContext, useEffect, useState } from 'react'
import { BiDollarCircle } from 'react-icons/bi'
import CurrencyCard from '../../currencycard/CurrencyCard'
import "./Currencypage.css"
import axios from 'axios';
import background from "../../../data/Background/money.jpg"
import { ThemeContext } from '../../../context';
const Currencypage = () => {
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode
  const [currency,setCurrency] = useState()
    useEffect(() => {
      axios.get(`http://185.78.166.45:8000/currency/`)
      .then(res => {
        setCurrency(res.data);
      })
    },[])

  return (
    <>
      <div className="currency-image-wrapper" style = {{backgroundImage : darkMode && `linear-gradient(180deg, rgba(18, 18, 18, 0) 33.82%, #121212 83%), url(${background})`}}>
        <div className="currency-box" style = {{background : darkMode && "rgba(33, 33, 33, 0.75)"}} >
                <div className="currency-text">
                    <div className="icon-wrapper"><BiDollarCircle /></div>
                    <h1>
                        Currency<br />
                    </h1>
                </div>
                <div className = "top-left"></div>
                <div className = "top-right"></div>
                <div className = "bottom-left"></div>
                <div className = "bottom-right"></div>
            </div>
      </div>
      <div className="currency-list">
      {currency ? currency.map((value, key) => {
                        return <CurrencyCard props = {value} />
                    }) : <div className="extend"><h1 className='loading . . .'>Loading</h1></div>}
      </div>
    </>
  )
}

export default Currencypage