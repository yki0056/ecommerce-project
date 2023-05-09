import React from 'react'
import {useRef, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import './lowernavbar.css'

function LowerNavBar() {
    const [firstSliderShow, setFirstSliderShow] = useState(true);

    // 슬라이드 쇼 
    const firstSlide = useRef();
    const secondSlide = useRef();

    const navPrevButton = () => {
        setFirstSliderShow(!firstSliderShow)
    }
    const navNextButton = () => {
        setFirstSliderShow(!firstSliderShow)
    }

    // 슬라이드쇼 인터벌 
    useEffect(() => {
        const interval = setInterval(() => {
            setFirstSliderShow((prevSt) => !prevSt)
        }, 3000);
        return () => clearInterval(interval);
    },[]);

    return (
        <div className="lowerNavbar">
            <div className="slideNav">
                <div className={firstSliderShow ? "nslide firstSlide" : "nslide"} ref={firstSlide}>
                    <p>SAVE UP TO 40%</p>
                    <NavLink to="/product">Shop All out New Markdowns</NavLink>
                </div>
                <div className={firstSliderShow ? "nslide secondSlide" : "nslide"} ref={secondSlide}>
                    <p>FREE SHIPPING + RETURNS, FREE MEMBERSHIP, EXCLUSIVE PRODUCT</p>
                    <NavLink to="/product">Join Now</NavLink>
                </div>
                <div className="slideNavPrev" onClick={navPrevButton}><i className="fas fa-chevron-left"></i></div>
                <div className="slideNavNext"  onClick={navNextButton}><i className="fas fa-chevron-right"></i></div>
            </div>
        </div>
    )
}

export default LowerNavBar