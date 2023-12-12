import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../images/logo.png";
import Search from "../../../images/search.png";
import "./Header.css"
import { useNavigate } from 'react-router-dom';

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    searchIconUrl: "/search",
    cartIconUrl: "/cart",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#121212",
    searchIconColorHover: "#121212",
    cartIconColorHover: "#121212",
    cartIconMargin: "1vmax",
    searchIconMargin: "0.5vmax",
    profileIconMargin: "0.5vmax",
};

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/search")
    }
    return (
        <div className='header'>
            <ReactNavbar {...options} />
            <img src={Search} style={{
                "marginRight": "37px",
                "width": "30px",
                "height": "30px",
                "cursor" : "pointer"
            }} onClick={handleClick} />
        </div>

    );
};
export default Header