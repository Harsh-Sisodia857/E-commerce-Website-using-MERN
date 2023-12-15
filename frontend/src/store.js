import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// To connect to redux devtools extension
import { composeWithDevTools } from "redux-devtools-extension";
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productsReducer,
    productReviewsReducer,
    reviewReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;