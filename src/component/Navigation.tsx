import { useState } from 'react';
import './style//Navigation.scss'

function Navigation(){
    const [isActive, setIsActive] = useState(false);
    const toggleBurger = () => {
        setIsActive(!isActive);
      };
    return (
        <>
        <div id = "navbar">
            <h1>
                峁
            </h1>
            <div id = "burger-container" className={isActive ? 'active' : ''} onClick={toggleBurger}>
                <svg id="hamburger" className="Header__toggle-svg" viewBox="0 0 50 50">
                    <g stroke="#da813d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                        <path id="top-line" d="M10,15 L40,15 Z" ></path>
                        <path id="middle-line" d="M10,25 L40,25 Z"></path>
                        <path id="bottom-line" d="M10,35 L40,35 Z"></path>
                    </g>
                </svg>
            </div>
        </div>

        </>
    )
}

export default Navigation;