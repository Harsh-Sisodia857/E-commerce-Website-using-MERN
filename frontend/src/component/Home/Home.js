import React, { Fragment, useEffect } from 'react'
import { FaMouse } from "react-icons/fa";
import "./Home.css"
import MetaData from './../layout/MetaData';
import { getProduct, clearErrors } from './../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from './Product/ProductCard.js';
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    console.log("Redux State:", loading);
    console.log("Products:", products);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
       dispatch(getProduct())
    }, [dispatch])
  return (
      <Fragment>
          {
              loading ? <Loader /> : <Fragment>
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
                              <ProductCard product={product} />
                          )
                      }
                  </div>
              </Fragment>
          }
     </Fragment>
  )
}

export default Home