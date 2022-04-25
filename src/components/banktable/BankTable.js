import React from 'react'
import SCB from "../../data/Bank/SCB.png"
import "./BankTable.css"

const BankTable = ({ props }) => {
    console.log(props)
    return (
        <div className="exchange-box">
            <div className="buy">
                <div className="exchange-wrapper buy-color">
                    <div className="detail"><p>ธนบัตร</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วเงิน</p><div className="border-detail"></div></div>
                    <div className="detail"><p>เช็คเดินทาง</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วแลกเงิน<br /> &ดราฟ</p><div className="border-detail"></div></div>
                    <div className="detail"><p>โอนเงิน<br />ทางโทรเลข/<br />โอนเงิน</p></div>
                </div>
            </div>
            <div className="sell">
                <div className="exchange-wrapper sell-color">
                    <div className="detail"><p>ธนบัตร</p><div className="border-detail"></div></div>
                    <div className="detail"><p>เช็คเดินทาง</p><div className="border-detail"></div></div>
                    <div className="detail"><p>ตั๋วแลกเงิน<br /> &ดราฟ</p><div className="border-detail"></div></div>
                    <div className="detail"><p>โอนเงิน<br />ทางโทรเลข/<br />โอนเงิน</p></div>
                </div>
            </div>
            <div className="ka-img">
                <img src={SCB} alt="" />
            </div>
            <div className="ka background-cream" style={{ borderTop : "2px solid #A0A0A0" }}>
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

            </div>
            <div className="sc">
                <div className="country-exchange-rate">
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

            </div>
            <div className="ba background-cream">
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

            </div>
            <div className="kt">
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

            </div>
            <div className="ks background-cream" style={{ borderBottom : "2px solid #A0A0A0" }}>
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
        </div>
    )
}

export default BankTable