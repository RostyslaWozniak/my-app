import React, { useEffect, useState } from "react";
import './ScrollUp.css';
const ScrollUp = () => {
    const [isArrowVisible, setIsArrowVisible] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 400) {
                setIsArrowVisible(true)
             } else return setIsArrowVisible(false);
        })
    }, []);
    const scrollUp = () => {
        window.scrollTo({
            top: window.innerWidth > 450 ? 150 : 300,
            behavior: "smooth",
        })
    }
    return (
        <>
            {
                isArrowVisible ? 
                (
                    <div className="arrow-container" onClick={scrollUp}>
                        <div className="arrow"></div>
                    </div> 
                )   :   (
                    null
                )
            }
        </> 
    );
}
 
export default ScrollUp;