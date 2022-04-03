import React from 'react'
import "./Detailpage.css"

const Detailpage = () => {
    return (
        <>
            <div className="currency-image-wrapper">
                <div className="currency-box">
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
                <div className="top-currency-wrapper"></div>
                <div className="price-box"></div>
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
                    <div className="ka background-cream" style = {{"border-top" : "1px solid #A0A0A0"}}>
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