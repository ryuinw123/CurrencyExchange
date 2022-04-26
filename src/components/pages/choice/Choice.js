import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineSell, MdOutlineShoppingCart ,MdOutlineSearchOff ,MdOutlineAccountBalance } from 'react-icons/md';
import { ThemeContext } from '../../../context';
import BankTable from '../../banktable/BankTable';
import Bestbank from '../../bestbank/Bestbank';
import BestSearch from '../../bestsearch/BestSearch';
import background from "../../../data/Background/money.jpg"
import currency_data from '../../../data/Currency/mock_currency_all.json'
import currency_buy from '../../../data/Currency/mock_currency_buy.json'
import currency_sell from '../../../data/Currency/mock_currency_sell.json'
import "./Choice.css"

const Choice = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

    const [decision, setDecision] = useState("sell");
    const [render, setRender] = useState(false);
    const [fail,setFail] = useState(false);
    const [calculate, setCalculate] = useState();
    const [currency,setCurrency] = useState(currency_sell);
    const currency_ref = useRef()
    const type_ref = useRef()
    const input_ref = useRef()


    const sendData = () => {
        let sendType
        if (type_ref.current.value == "โอนเงิน") {
            sendType = "t_t"
        }
        else if (type_ref.current.value == "เช็คเดินทาง") {
            sendType = "t_c"
        }
        else if (type_ref.current.value == "ตั๋วเงิน") {
            sendType = "bill"
        }
        else if (type_ref.current.value == "ตั๋วแลกเงิน") {
            sendType = "d_d"
        }
        else if (type_ref.current.value == "ธนบัตร") {
            sendType = "notes"
        }
        axios.post(`http://185.78.166.45:8000/choice/`, {
            decision: decision,
            currency: currency_ref.current.value,
            type: sendType,
            amount: +input_ref.current.value
        })
            .then(res => {
                console.log(res.data)
                setCalculate(res.data)
                setFail(false)
                setRender(true)
            })
            .catch(e => {
                setRender(false)
                setFail(true)
            })
    }
    const setBuy = () => {
        setCurrency(currency_buy)
        setDecision("buy")
    }
    const setSell = () => {
        setCurrency(currency_sell)
        setDecision("sell")
    }
    return (
        <>
            <div className="choice-image-wrapper" style = {{backgroundImage : darkMode && `linear-gradient(180deg, rgba(18, 18, 18, 0) 33.82%, #121212 83%), url(${background})`}}>
                <div className="choice-box" style = {{background : darkMode && "rgba(33, 33, 33, 0.75)"}}>
                    <div className="choice-text">
                        <div className="icon-wrapper" ><AiOutlineLike /></div>
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
            <div className="choice-wrapper" style = {{background : darkMode && "#424242"}}>
                <div className="choice-wrapper-inside">
                    <div className="choice-decision">
                        <div className="choice" onClick={setSell} style={{ backgroundColor : (decision == "sell") && "#1976D2" , color : (decision == "sell") && "white" }}><MdOutlineSell />Sell</div>
                        <div className="choice-border"></div>
                        <div className="choice" onClick={setBuy} style={{ backgroundColor : (decision == "buy") && "#1976D2" , color : (decision == "buy") && "white"}}><MdOutlineShoppingCart />Buy</div>
                    </div>
                    <div className="choice-currency">
                        <p>Currency</p>
                        {currency ? <><BestSearch ref = {currency_ref} props = {currency_data}/><BestSearch ref = {type_ref} props = {currency}/></> : <p>Wait for Loading</p>}
                    
                    </div>
                    <div className="choice-amount">
                        <p>AMOUT</p>
                        <input ref = {input_ref} style = {{background : darkMode && "#424242"}} type="text" placeholder='Enter desired amount' className="amount-input" name="amount" />
                    </div>

                    <div className="choice-button-wrapper">
                        <div onClick={sendData} className="choice-button" style = {{color : darkMode && "black"}}>Calculate</div>
                    </div>
                    <div>{fail ? <h1 className = "fail">Fail Loading <br /> Please Enter Valid Information</h1> : <></>}</div>
                    <div className="bestbank-header">
                        <MdOutlineAccountBalance />Bestbank
                    </div>
                    { render ? <Bestbank props = {calculate.bestbank}/> : <div className = "no-search"><MdOutlineSearchOff className = "icon-choice-search"/> <p>Please complete the selections to calculate the best bank.</p></div>}
                </div>
                <div className="banktable-wrapper">
                { render ? <BankTable props = {calculate.allbank} /> : <></>}
                </div>
            </div>
            <div className="extend"></div>
        </>
    )
}

export default Choice