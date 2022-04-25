import React from 'react'
import AboutCard from '../../aboutcard/AboutCard'
import SCB from "../../../data/Bank/SCB.png"
import "./Aboutpage.css"

const Aboutpage = () => {
    return (<>
        <div className="about-image-wrapper">
            <div className="aboutpage-box">
                <div className="aboutpage-text">
                    <h1>
                        ABOUT US
                    </h1>
                    <p>
                        We’re Super Sentai<br />
                        with six members.
                    </p>
                </div>
                <div className="top-left"></div>
                <div className="top-right"></div>
                <div className="bottom-left"></div>
                <div className="bottom-right"></div>
            </div>
        </div>
        <div className="about-container">
            <h1>Group Member</h1>
            <div className="about-group-container">
                <AboutCard />
                <AboutCard />
                <AboutCard />
                <AboutCard />
                <AboutCard />
                <AboutCard />
            </div>
            <h1>Thanks for the information.</h1>
            <div className="about-credit-container">
                <div className="img-wrapper"><img src={SCB} alt=""/></div>
                <div className="img-wrapper"><img src={SCB} alt=""/></div>
                <div className="img-wrapper"></div>
                <div className="img-wrapper"></div>
                <div className="img-wrapper"></div>
                <div className="img-wrapper"></div>
            </div>
        </div>
    </>)
}

export default Aboutpage