import React from 'react'
import img from "../../data/Profile/romtham.png"
import "./AboutCard.css"

const AboutCard = () => {
  return (
    <div className = "about-card">
        <div className="about-image-container">
            <div className="about-background"></div>
            <img src= {img} alt="" className="about-img" />
        </div>
        <h3>
            Name<br />
            Surname
        </h3>
    </div>
  )
}

export default AboutCard