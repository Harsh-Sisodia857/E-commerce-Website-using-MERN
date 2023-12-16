import React,{useEffect,useState} from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../images/logo.png";
import "./Header.css"
import { useSelector } from "react-redux";

const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const [link3Text, setLink3Text] = useState('Contact Us');
    const [link3Url, setLink3Url] = useState('/contact');

    const options = {
        burgerColor: "white",
        burgerColorHover: "#eb4034",
        logo,
        logoWidth: "20vmax",
        navColor1: "white",
        logoHoverSize: "10px",
        logoHoverColor: "#eb4034",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: link3Text,
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: link3Url,
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

    useEffect(() => {
        setLink3Text(isAuthenticated ? 'Contact Us' : 'Login');
        setLink3Url(isAuthenticated ? '/contact' : '/login');
    }, [isAuthenticated]);
 
    return (
        <div className='header'>
            <ReactNavbar {...options} />
        </div>

    );
};
export default Header