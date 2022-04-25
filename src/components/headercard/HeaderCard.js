import { BsFillTriangleFill } from 'react-icons/bs'
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc'
import React from 'react'
import "./HeaderCard.css"

const HeaderCard = ({ currency, country, status, price, change, percentage }) => {
  function GenerateIcon(props) {
    if (props.status === "up")
      return <div style={{ color: "#00FF00" }}>
        <div className="card-wrapper-top" style={{ color: "#00FF00" }}>
          <div className="card-icon" style = {{transform : "translate(0px,-1px)"}}><BsFillTriangleFill /></div>
          <p >{props.price}</p>
        </div>
        <div className="card-wrapper-bottom">
          <p >{props.change} ({props.percentage})</p>
        </div>
      </div>
    if (props.status === "down")
      return <div style={{ color: "#FF0000" }}>
        <div className="card-wrapper-top">
          <div className="card-icon" style={{ transform: "rotate(180deg) translate(0px,7px)" }}><BsFillTriangleFill /></div>
          <p >{props.price}</p>
        </div>
        <div className="card-wrapper-bottom">
          <p >{props.change} ({props.percentage})</p>
        </div>
      </div>
    if (props.status === "equal")
      return <div style={{ color: "#F1F100" }}>
        <div className="card-wrapper-top">
          <div className="card-icon" ><VscTriangleLeft /><VscTriangleRight /></div>
          <p >{props.price}</p>
        </div>
        <div className="card-wrapper-bottom">
          <p >{props.change} ({props.percentage})</p>
        </div>
      </div>
  }
  return (
    <div className="header-card-wrapper">
      <div className="card-wrapper-left">
        <div className="image-wrapper-left"><img src={country} alt="" className="a-img" /></div>
        <p> {currency} </p>
      </div>
      <div className="card-wrapper-right">
        <GenerateIcon status={status} price = {price} change = {change} percentage = {percentage} />
      </div>
      <div className="border">

      </div>
    </div>
  )
}

export default HeaderCard