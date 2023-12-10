import React, { Fragment, useEffect } from 'react'
import { FaMouse } from "react-icons/fa";
import Product from "./Product/product.js"
import "./Home.css"
import MetaData from './../layout/MetaData';
import { getProduct } from './../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader.js';

const Home = () => {
    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector((state) => state.products)
    useEffect(() => {
      dispatch(getProduct())
    }, [])
    
  return (
      <Fragment>
          {
              loading ? <Loader/> : <Fragment>
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
                      {
                          products && products.map((product) =>
                              <Product product={product} />
                          )
                      }
                  </div>
              </Fragment>
          }
     </Fragment>
  )
}

export default Home