import React, { useEffect, useState } from 'react'
import { BiDollarCircle } from 'react-icons/bi'
import CurrencyCard from '../../currencycard/CurrencyCard'
import "./Currencypage.css"
import axios from 'axios';
const Currencypage = () => {
  const [currency,setCurrency] = useState()
    useEffect(() => {
      axios.get(`http://185.78.166.45:8000/currency/`)
      .then(res => {
        setCurrency(res.data);
      })
    },[currency])

  return (
    <>
      <div className="currency-image-wrapper">
        <div className="currency-box">
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
                    }) : <h1 className='loading . . .'>Loading</h1>}
      </div>
    </>
  )
}

export default Currencypage