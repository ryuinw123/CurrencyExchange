import React, { useContext } from 'react'
import { ThemeContext } from '../../../context'
import "./Homepage.css"

const Homepage = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (<>
        <div className="home-image-wrapper">
            <div className="homepage-box" style = {{background : darkMode && "rgba(33, 33, 33, 0.75)"}}>
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
        <div className="github-link">
                <a href="https://github.com/ryuinw123/CurrencyExchange">Front-end Github Link</a>
                <a href="https://github.com/Filmsuphanut/TOC-backend">Back-end Github Link</a>
            </div>
        <div className="extend"></div>
        </>
    )
}

export default Homepage