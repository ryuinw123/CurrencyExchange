import React from 'react'
import "./Homepage.css"

const Homepage = () => {
    return (
        <div className="home-image-wrapper">
            <div className="homepage-box">
                <div className="homepage-text">
                    <h1>
                        CURRENCY<br />
                        RANGER
                    </h1>
                    <p>
                        Exchange currency rate<br />
                        with Thai baht website
                    </p>
                </div>
                <div className = "top-left"></div>
                <div className = "top-right"></div>
                <div className = "bottom-left"></div>
                <div className = "bottom-right"></div>
            </div>
        </div>
    )
}

export default Homepage