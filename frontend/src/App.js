import { useEffect,useState, Fragment } from 'react';
import Header from './component/layout/Header/Header.js'
import {
  Routes,
  Route,
} from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from './component/Home/Home.js'
import Products from './component/Product/Products';
import ProductDetails from './component/Product/ProductDetails';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store.js"
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from './component/Order/OrderDetails';
import NotFound from "./component/layout/Not Found/NotFound";
import Payment from './component/Cart/Payment';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  // To Download google fonts in our website we use webfontloader
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Open Sans", "Lato"]
      }
    })
    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="App">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
          {stripeApiKey && isAuthenticated &&
            <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          }

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path="/orders/" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          {/* <Route path="/order/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} /> */}
          <Route
            element={
              window.location.pathname === "/process/payment" ? null : <NotFound />
            }
          />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
