import React, { useContext } from 'react'
import AboutCard from '../../aboutcard/AboutCard'
import romtham from "../../../data/Profile/romtham.png"
import keng from "../../../data/Profile/keng.png"
import jo from "../../../data/Profile/Jo.png"
import boon from "../../../data/Profile/boon.png"
import film from "../../../data/Profile/film.png"
import poshy from "../../../data/Profile/poshy.png"
import "./Aboutpage.css"
import background from "../../../data/Background/objective.jpg"
import scb from "../../../data/Bank/scb2.png"
import krungthai from "../../../data/Bank/krungthai2.png"
import krungsri from "../../../data/Bank/krungsri2.png"
import kasikorn from "../../../data/Bank/kasikorn2.png"
import bangkok from "../../../data/Bank/bangkok2.png"
import investing from "../../../data/Bank/investing.png"
import { ThemeContext } from '../../../context'

const Aboutpage = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (<>
        <div className="about-image-wrapper" style = {{backgroundImage : darkMode && `linear-gradient(180deg, rgba(18, 18, 18, 0) 88.02%, #121212 100%), url(${background})`}}>
            <div className="aboutpage-box" style = {{background : darkMode && "rgba(33, 33, 33, 0.75)"}}>
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
                <AboutCard image = {boon} name = {{"name" : "Tanapon" , "surname" : "Wetsutanon"}}/>
                <AboutCard image = {poshy} name = {{"name" : "Thamanoon" , "surname" : "Kitlertphairoj"}}/>
                <AboutCard image = {keng} name = {{"name" : "Poomipat" , "surname" : "Yindee"}}/>
                <AboutCard image = {jo} name = {{"name" : "Purin" , "surname" : "Boonkrasin"}}/>
                <AboutCard image = {romtham} name = {{"name" : "Romtham" , "surname" : "Thangsununtham"}}/>
                <AboutCard image = {film} name = {{"name" : "Suphanut" , "surname" : "Wandee"}}/>
            </div>
            <h1>Thanks for the information.</h1>
            <div className="about-credit-container">
                <div className="img-wrapper"><img src={scb} alt=""/></div>
                <div className="img-wrapper"><img src={krungthai} alt=""/></div>
                <div className="img-wrapper"><img src={krungsri} alt=""/></div>
                <div className="img-wrapper"><img src={kasikorn} alt=""/></div>
                <div className="img-wrapper"><img src={bangkok} alt=""/></div>
                <div className="img-wrapper"><img src={investing} alt=""/></div>
            </div>
        </div>
    </>)
}

export default Aboutpage