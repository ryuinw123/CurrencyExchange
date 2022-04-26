import React, { useContext } from 'react'
import { IoTriangleSharp } from 'react-icons/io5';
import { VscTriangleLeft,VscTriangleRight } from 'react-icons/vsc';
import "./CurrencyCard.css"
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context';

const CurrencyCard = ({props}) => {
  const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    
    function GenerateIcon() {
        if (props.status === "up")
          return <div style={{ color: "#00FF00" }}>
            <div className="card-wrapper" style={{ color: "#00FF00"}}>
              <div className="card-icon" style = {{ transform : "translate(0px,-1px)" }}><IoTriangleSharp /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}฿
                  </h1>
                  <p>
                      +{props.change}(+{props.percentage})
                  </p>
              </div>
            </div>
          </div>
        if (props.status === "down")
          return <div style={{ color: "#FF0000" }}>
            <div className="card-wrapper">
              <div className="card-icon" style={{ transform: "rotate(180deg) translate(0px,8px)" }}><IoTriangleSharp /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}฿
                  </h1>
                  <p>
                      -{props.change}(-{props.percentage})
                  </p>
              </div>
            </div>
          </div>
        if (props.status === "equal")
          return <div style={{ color: "#FF6F00" }}>
            <div className="card-wrapper">
              <div className="card-icon" ><VscTriangleLeft /><VscTriangleRight /></div>
              <div className = "card-text-wrapper">
                  <h1>
                  {props.price}฿
                  </h1>
                  <p>
                      +{props.change}(+{props.percentage})
                  </p>
              </div>
            </div>
          </div>
      }

  return (
    <Link 
      to={{
        pathname : `detail/${props.currency}`
        }}  className = "currency-card" style = {{'--background-color' : darkMode ? "#424242" : "white"}}>
        <div className="upper-card-wrapper">
            <div className="img-wrapper">
                <img src={require(`../../data/Flag/${props.currency}.png`)} alt="" className = "flag-img"/>
            </div>
            <p style = {{color : darkMode && "white"}}>
                {props.name}
            </p>
            <h1 style = {{color : darkMode && "white"}}>
                {props.currency}
            </h1>
            <h3 style = {{color : darkMode && "white"}}>
                {props.description}
            </h3>
        </div>
        <GenerateIcon />
        <div className="down-card-wrapper">
            <div className = "pricebox">
                <h3 style = {{color : darkMode && "white"}}>Open</h3>
                <p style = {{color : darkMode && "white"}}>{props.open}</p>
            </div>
            <div className = "pricebox">
                <h3 style = {{color : darkMode && "white"}}>High</h3>
                <p style = {{color : "#00FF00" }} >{props.high}</p>
            </div>
            <div className = "pricebox">
                <h3 style = {{color : darkMode && "white"}}>Low</h3>
                <p style = {{color : "#FF0000" }}>{props.low}</p>
            </div>
        </div>
    </Link>
  )
}

export default CurrencyCard

