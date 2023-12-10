import React, { Fragment } from 'react'
import { FaMouse } from "react-icons/fa";
import Product from "./Product/product.js"
import "./Home.css"
import MetaData from './../layout/MetaData';


const product = {
    name: "Blue Shirt",
    price: "300",
    _id: "harsh",
    images: [{ url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg"}]
}

const Home = () => {
  return (
      <Fragment>
          <MetaData title={"E-commerce"} />
          <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <a href="#container">
                  <button>
                      Scroll <FaMouse />
                  </button>
              </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id='container'>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
              <Product product = {product}/>
          </div>
      </Fragment>
  )
}

export default Home