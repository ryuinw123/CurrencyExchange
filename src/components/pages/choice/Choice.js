import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { GrLike } from 'react-icons/gr';
import { MdOutlineSell, MdOutlineShoppingCart ,MdOutlineSearchOff ,MdOutlineAccountBalance } from 'react-icons/md';
import BankTable from '../../banktable/BankTable';
import Bestbank from '../../bestbank/Bestbank';
import BestSearch from '../../bestsearch/BestSearch';
import "./Choice.css"

const Choice = () => {

    const [decision, setDecision] = useState("sell");
    const [render, setRender] = useState(false);
    const [calculate, setCalculate] = useState();
    const currency_ref = useRef()
    const type_ref = useRef()
    const input_ref = useRef()


    const sendData = () => {
        axios.post(`http://185.78.166.45:8000/choice/`, {
            decision: decision,
            currency: currency_ref.current.value,
            type: type_ref.current.value,
            amount: +input_ref.current.value
        })
            .then(res => {
                setCalculate(res.data)
                setRender(true)
            })
    }
    const setBuy = () => {
        setDecision("buy")
    }
    const setSell = () => {
        setDecision("sell")
    }
    return (
        <>
            <div className="choice-image-wrapper">
                <div className="choice-box">
                    <div className="choice-text">
                        <div className="icon-wrapper"><GrLike /></div>
                        <h1>
                            Best choice
                        </h1>
                    </div>
                    <p>Find the best bank<br />
                        that sell of buy foreign currency</p>
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
            </div>
            <div className="choice-wrapper">
                <div className="choice-wrapper-inside">
                    <div className="choice-decision">
                        <div className="choice" onClick={setSell} style={{ backgroundColor: decision == "sell" ? "#1976D2" : "white", color: decision == "sell" && "white" }}><MdOutlineSell />Sell</div>
                        <div className="choice-border"></div>
                        <div className="choice" onClick={setBuy} style={{ backgroundColor: decision == "buy" ? "#1976D2" : "white", color: decision == "buy" && "white" }}><MdOutlineShoppingCart />Buy</div>
                    </div>
                    <div className="choice-currency">
                        <p>Currency</p>
                        <BestSearch ref = {currency_ref}/>
                        <BestSearch ref = {type_ref}/>
                    </div>
                    <div className="choice-amount">
                        <p>AMOUT</p>
                        <input ref = {input_ref} type="text" placeholder='Enter desired amount' className="amount-input" name="amount" />
                    </div>

                    <div className="choice-button-wrapper">
                        <div onClick={sendData} className="choice-button">Calculate</div>
                    </div>
                    <div className="bestbank-header">
                        <MdOutlineAccountBalance />Bestbank
                    </div>
                    { render ? <Bestbank props = {calculate.bestbank}/> : <div className = "no-search"><MdOutlineSearchOff className = "icon-choice-search"/> <p>Please complete the selections to calculate the best bank.</p></div>}
                </div>
                <div className="banktable-wrapper">

                </div>
            </div>
            <div className="extend"></div>
        </>
    )
}

export default Choice