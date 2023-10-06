import React, { useEffect, useState } from "react";
import './Arrow.css';
const Arrow = () => {
    const [isArrowVisible, setIsArrowVisible] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 300){
                setIsArrowVisible(true)
            }else if(window.scrollY < 300){
                setIsArrowVisible(false)
            }
        })
    }, []);
    const scrollUp = () => {
        window.scrollTo({
            top: 150,
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
                    <p>Up</p>
                </div> 
            )   :   (
                null
            )
        }
               
        
        </> 
    );
}
 
export default Arrow;