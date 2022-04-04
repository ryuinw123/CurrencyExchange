import React from 'react'
import { IoTriangleSharp } from 'react-icons/io5';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import flag from "../../../data/Flag/Sweden.png";
import "./Detailpage.css"

const Detailpage = ({ props }) => {
    function Generaterightwrapper() {
        if (props.status === "up")
            return <div className="detail-right-wrapper" style={{ color: "#00FF00" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "translate(0px,4px)" }}>
                        <IoTriangleSharp />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>+{props.change}(+{props.percentage})</p>
                </div>
            </div>
        if (props.status === "down")
            return <div className="detail-right-wrapper" style={{ color: "#FF0000" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "rotate(180deg) translate(0px,5px)" }}>
                        <IoTriangleSharp />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>-{props.change}(+{props.percentage})</p>
                </div>
            </div>
        if (props.status === "equal")
            return <div className="detail-right-wrapper" style={{ color: "#F1F100" }}>
                <div className="detail-upper-wrapper">
                    <div className="detail-icon-wrapper" style={{ transform: "rotate(180deg) translate(0px,5px)" }}>
                        <VscTriangleLeft />
                        <VscTriangleRight />
                    </div>
                    <h1>
                        {props.price}฿
                    </h1>
                </div>
                <div className="detail-down-wrapper">
                    <p>+{props.change}(+{props.percentage})</p>
                </div>
            </div>
    }

    return (
        <>
            <div className="detail-image-wrapper">
                <div className="detail-box">
                    <div>
                        <h1>
                            United States of America
                        </h1>
                    </div>
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
            </div>
            <div className="box-wrapper">
                <div className="top-currency-wrapper">
                    <div className="detail-left-wrapper">
                        <div className="detail-img-wrapper">
                            <img src={flag} alt="No flag found" />
                        </div>
                        <div className="detail-currency-wrapper">
                            <h1>{props.currency}</h1>
                            <p>{props.description}</p>
                        </div>
                    </div>
                    <Generaterightwrapper />
                </div>
                <div className="price-box">
                    <div className="detail-open">
                        <div className="detail-inside">
                            <h3>
                                Open
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                        <div className="border-detail-pricebox"></div>
                    </div>
                    <div className="detail-high">
                        <div className="detail-inside">
                            <h3>
                                High
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                        <div className="border-detail-pricebox"></div>
                    </div>
                    <div className="detail-low">
                    <div className="detail-inside">
                            <h3>
                                Low
                            </h3>
                            <p>
                                32.00
                            </p>
                        </div>
                    </div>
                </div>
                <div className="graph-box"></div>
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

                    </div>
                    <div className="ka background-cream" style={{ "border-top": "1px solid #A0A0A0" }}>
                        <div className="country-exchange-rate">
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                            <p>33.00</p>
                        </div>
                    </div>
                    <div className="sc-img">

                    </div>
                    <div className="sc">

                    </div>
                    <div className="ba-img">

                    </div>
                    <div className="ba">

                    </div>
                    <div className="kt-img">

                    </div>
                    <div className="kt">

                    </div>
                    <div className="ks-img">

                    </div>
                    <div className="ks">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Detailpage