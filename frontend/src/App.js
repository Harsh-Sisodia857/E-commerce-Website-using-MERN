import { useEffect } from 'react';
import Header from './component/layout/Header/Header.js'
import {
  Routes,
  Route,
} from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'

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
          </Routes>
        <Footer/>
    </div>
  );
}

export default App;
