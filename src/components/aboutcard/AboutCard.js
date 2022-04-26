import React, { useEffect } from 'react'
import img from "../../data/Profile/romtham.png"
import "./AboutCard.css"

const AboutCard = ({image,name}) => {

  return (
    <div className = "about-card">
        <div className="about-image-container">
            <div className="about-background"></div>
            <img src= {image} alt="" className="about-img" />
        </div>
        <h3>
            {name.name}<br />
            {name.surname}
        </h3>
    </div>
  )
}

export default AboutCard