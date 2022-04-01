import React from 'react'
import { BiDollarCircle } from 'react-icons/bi'
import CurrencyCard from '../../currencycard/CurrencyCard'
import Currency from "../../../data/Currency/mock_currency_page.json"
import "./Currencypage.css"
const Currencypage = () => {

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
      {Currency.map((value, key) => {
                        return <CurrencyCard props = {value} />
                    })}
      </div>
    </>
  )
}

export default Currencypage