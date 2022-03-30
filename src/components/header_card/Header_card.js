import { ChangeHistory } from '@mui/icons-material'
import React from 'react'
import "./Header_card.css"

const Header_Card = ({ currency, country, status, price, change, percentage }) => {
  return (
    <div className="header-card-wrapper">
      <div className="card-wrapper-left">
        <div className="image-wrapper-left"><img src={country} alt="" className="a-img" /></div>
        <p className="header-currency"> {currency} </p>
      </div>
      <div className="card-wrapper-right">
        <div className="card-wrapper-top">
          <div className="card-icon">
            <ChangeHistory />
          </div>
          <p >{price}</p>
        </div>
        <div className="card-wrapper-bottom">
          <p >{change} ({percentage})</p>
        </div>
      </div>
    </div>
  )
}

export default Header_Card