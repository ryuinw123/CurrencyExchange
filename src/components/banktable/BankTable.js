import React, { useContext } from 'react'
import { ThemeContext } from '../../context'
import scb from "../../data/Bank/scb2.png"
import krungthai from "../../data/Bank/krungthai2.png"
import krungsri from "../../data/Bank/krungsri2.png"
import kasikorn from "../../data/Bank/kasikorn2.png"
import bangkok from "../../data/Bank/bangkok2.png"
import "./BankTable.css"

const BankTable = ({ props }) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    console.log(props)
    return (
        <>
        <div className="exchange-box" style = {{background : darkMode && "#424242"}}>
            <div className="buy">
                <div className="exchange-wrapper buy-color" style = {{color : darkMode && "black"}}>
                    <div className="detail"><p>ธนบัตร</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วเงิน</p><div className="border-detail"></div></div>
                    <div className="detail"><p>เช็คเดินทาง</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วแลกเงิน<br /> &ดราฟ</p><div className="border-detail"></div></div>
                    <div className="detail"><p>โอนเงิน<br />ทางโทรเลข/<br />โอนเงิน</p></div>
                </div>
            </div>
            <div className="sell">
                <div className="exchange-wrapper sell-color" style = {{color : darkMode && "black"}}>
                    <div className="detail"><p>ธนบัตร</p><div className="border-detail"></div></div>
                    <div className="detail"><p>เช็คเดินทาง</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วแลกเงิน<br /> &ดราฟ</p><div className="border-detail"></div></div>
                    <div className="detail"><p>โอนเงิน<br />ทางโทรเลข/<br />โอนเงิน</p></div>
                </div>
            </div>
            <div className="ka-img">
                <img src={kasikorn} alt="" />
            </div>
            <div className="ka background-cream" style={{ borderTop : "2px solid #A0A0A0" ,background : darkMode && "#757575"}}>
                <div className="country-exchange-rate">
                    <p>{props[0].bank_buy_notes}</p>
                    <p>{props[0].bank_buy_bill}</p>
                    <p>{props[0].bank_buy_t_c}</p>
                    <p>{props[0].bank_buy_d_d}</p>
                    <p>{props[0].bank_buy_t_t}</p>
                    <p>{props[0].bank_sell_notes}</p>
                    <p>{props[0].bank_sell_t_c}</p>
                    <p>{props[0].bank_sell_d_d}</p>
                    <p>{props[0].bank_sell_t_t}</p>
                </div>
            </div>
            <div className="sc-img">
                <img src={scb} alt="" />
            </div>
            <div className="sc">
                <div className="country-exchange-rate" style = {{background : darkMode && "#616161"}}>
                    <p>{props[1].bank_buy_notes}</p>
                    <p>{props[1].bank_buy_bill}</p>
                    <p>{props[1].bank_buy_t_c}</p>
                    <p>{props[1].bank_buy_d_d}</p>
                    <p>{props[1].bank_buy_t_t}</p>
                    <p>{props[1].bank_sell_notes}</p>
                    <p>{props[1].bank_sell_t_c}</p>
                    <p>{props[1].bank_sell_d_d}</p>
                    <p>{props[1].bank_sell_t_t}</p>
                </div>
            </div>
            <div className="ba-img">
            <img src={bangkok} alt="" />
            </div>
            <div className="ba background-cream" style = {{background : darkMode && "#757575"}}>
                <div className="country-exchange-rate">
                    <p>{props[2].bank_buy_notes}</p>
                    <p>{props[2].bank_buy_bill}</p>
                    <p>{props[2].bank_buy_t_c}</p>
                    <p>{props[2].bank_buy_d_d}</p>
                    <p>{props[2].bank_buy_t_t}</p>
                    <p>{props[2].bank_sell_notes}</p>
                    <p>{props[2].bank_sell_t_c}</p>
                    <p>{props[2].bank_sell_d_d}</p>
                    <p>{props[2].bank_sell_t_t}</p>
                </div>
            </div>
            <div className="kt-img">
            <img src={krungthai} alt="" />
            </div>
            <div className="kt" style = {{background : darkMode && "#616161"}}>
                <div className="country-exchange-rate">
                    <p>{props[3].bank_buy_notes}</p>
                    <p>{props[3].bank_buy_bill}</p>
                    <p>{props[3].bank_buy_t_c}</p>
                    <p>{props[3].bank_buy_d_d}</p>
                    <p>{props[3].bank_buy_t_t}</p>
                    <p>{props[3].bank_sell_notes}</p>
                    <p>{props[3].bank_sell_t_c}</p>
                    <p>{props[3].bank_sell_d_d}</p>
                    <p>{props[3].bank_sell_t_t}</p>
                </div>
            </div>
            <div className="ks-img">
            <img src={krungsri} alt="" />
            </div>
            <div className="ks background-cream" style={{ borderBottom : "2px solid #A0A0A0",background : darkMode && "#757575" }}>
                <div className="country-exchange-rate">
                    <p>{props[4].bank_buy_notes}</p>
                    <p>{props[4].bank_buy_bill}</p>
                    <p>{props[4].bank_buy_t_c}</p>
                    <p>{props[4].bank_buy_d_d}</p>
                    <p>{props[4].bank_buy_t_t}</p>
                    <p>{props[4].bank_sell_notes}</p>
                    <p>{props[4].bank_sell_t_c}</p>
                    <p>{props[4].bank_sell_d_d}</p>
                    <p>{props[4].bank_sell_t_t}</p>
                </div>
            </div>
            <div className="banktable-icon-wrapper">
            <div className="banktable-bankbuy">
                <div className="banktable-circle background-red"></div>
                <p>BANK BUY</p>
            </div>
            <div className="banktable-banksell">
                <div className="banktable-circle background-blue"></div>
                <p>BANK SELL</p>
            </div>
        </div>
            
        </div>
        </>
    )
}

export default BankTable