import { useEffect } from 'react';
import Header from './component/layout/Header/Header.js'
import {
  Routes,
  Route,
} from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import Products from './component/Product/Products';
import ProductDetails from './component/Product/ProductDetails';
import Search from './component/Product/Search';

function App() {
  // To Download google fonts in our website we use webfontloader
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto","Open Sans","Lato"]
      }
    })
  })
  return (
    <div className="App">
        <Header/>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/products' Component={Products}/>
            <Route path='/products/:keyword' Component={Products}/>
            <Route path='/product/:id' Component={ProductDetails}/>
            <Route path='/search' Component={Search}/>
          </Routes>
        <Footer/>
    </div>
  );
}

export default App;
