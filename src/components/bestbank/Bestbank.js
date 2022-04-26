import React, { useEffect } from 'react'
import "./Bestbank.css"

const Bestbank = ({props}) => {
    useEffect(()=> {
        console.log(props)
    })
    return (
        <div className="bestbank-wrapper">
            <div className="bestbank-img-wrapper">
                <img src={require(`../../data/Bank/${props.bank_img}.png`)} alt="" />
                <h3>ธนาคาร {props.bank_name}</h3>
            </div>
            <div className="bestbank-detail-wrapper">
                <div className="bestbank-detail">
                    <h1>Selected type({"Sell"}):</h1>
                    <h3>{props.type}</h3>
                </div>
                <div className="bestbank-detail">
                    <h1>Currency:</h1>
                    <h3>{props.currency}</h3>
                </div>
                <div className="bestbank-detail">
                    <h1>Amount:</h1>
                    <h3>{props.amout}</h3>
                </div>
                <div className="bestbank-detail">
                    <h1>Selling price / 1 {"USD50"}:</h1>
                    <h3>{props.single_price}</h3>
                </div>
                <div className="bestbank-detail">
                    <h1>Total selling price:</h1>
                    <h3>{props.total_price}</h3>
                </div>
            </div>
        </div>
    )
}

export default Bestbank