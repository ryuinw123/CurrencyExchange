import React from 'react'
import image from "../../data/Flag/Sweden.png"
import { IoTriangleSharp } from 'react-icons/io5';
import { VscTriangleLeft,VscTriangleRight } from 'react-icons/vsc';
import "./CurrencyCard.css"

const CurrencyCard = ({props}) => {
    function GenerateIcon() {
        if (props.status === "up")
          return <div style={{ color: "#00FF00" }}>
            <div className="card-wrapper" style={{ color: "#00FF00"}}>
              <div className="card-icon" style = {{ transform : "translate(0px,-1px)" }}><IoTriangleSharp /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}
                  </h1>
                  <p>
                      {props.change}({props.percentage})
                  </p>
              </div>
            </div>
          </div>
        if (props.status === "down")
          return <div style={{ color: "#FF0000" }}>
            <div className="card-wrapper">
              <div className="card-icon" style={{ transform: "rotate(180deg)" , transform : "translate(0px,-3px)" }}><IoTriangleSharp /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}
                  </h1>
                  <p>
                      {props.change}({props.percentage})
                  </p>
              </div>
            </div>
          </div>
        if (props.status === "equal")
          return <div style={{ color: "#F1F100" }}>
            <div className="card-wrapper">
              <div className="card-icon" ><VscTriangleLeft /><VscTriangleRight /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}
                  </h1>
                  <p>
                      {props.change}({props.percentage})
                  </p>
              </div>
            </div>
          </div>
      }

  return (
    <div className = "currency-card">
        <div className="upper-card-wrapper">
            <div className="img-wrapper">
                <img src={image} alt="" className = "flag-img"/>
            </div>
            <p>
                {props.name}
            </p>
            <h1>
                {props.currency}
            </h1>
            <h3>
                {props.description}
            </h3>
        </div>
        <GenerateIcon />
        <div className="down-card-wrapper">
            <div className = "pricebox">
                <h3>Open</h3>
                <p>{props.Open}</p>
            </div>
            <div className = "pricebox">
                <h3>High</h3>
                <p style = {{color : "#00FF00" }} >{props.high}</p>
            </div>
            <div className = "pricebox">
                <h3>Low</h3>
                <p style = {{color : "#FF0000" }}>{props.low}</p>
            </div>
        </div>
    </div>
  )
}

export default CurrencyCard