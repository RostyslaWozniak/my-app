import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './Header.css';
import img1 from '../../images/header-img/food1.jpg';
import img2 from '../../images/header-img/food2.jpg';
import img3 from '../../images/header-img/food3.jpg';
import img4 from '../../images/header-img/food4.jpg';

const Header = () => {
   let images = [img1, img2, img3, img4];
   const index = Math.floor(Math.random() * images.length)
   const img = images[index]
    return ( 
        <div className="header">
            <img src={img} alt="jedzenie"/>
        </div>
     );
}
 
export default Header;