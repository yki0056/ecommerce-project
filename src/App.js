//import Home from './pages/home/home.jsx'
import React from 'react'
import Ecommerce from './amazon/Ecommerce.js'
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
// reducer 
import {cartReducer} from './amazon/reducer/cartReducer.jsx'
import {selectedGroup} from './amazon/reducer/productReducer.jsx'
import {allGroup} from './amazon/reducer/productReducer.jsx'
import {filterMenuStatus} from './amazon/reducer/headerReducer.jsx'
import {userReducer} from './amazon/reducer/userReducer.jsx'
// firebase initialize
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const allReducer = combineReducers({
  cart: cartReducer,
  allGroupData: allGroup, 
  selectedGroupData: selectedGroup,
  fms: filterMenuStatus,
  userStatus: userReducer
});
const st = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
//  파이어베이스 ----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCwIVYYQarmZeRlLD7A0Yst4Gmxp0BWL1k",
    authDomain: "e-commerce-6a08b.firebaseapp.com",
    projectId: "e-commerce-6a08b",
    storageBucket: "e-commerce-6a08b.appspot.com",
    messagingSenderId: "547360375099",
    appId: "1:547360375099:web:42c27a2be452c1491a771e"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// authentication 과 연동 
getAuth(firebaseApp)
// firestore 과 연동 
getFirestore(firebaseApp)

function App() {
  return (
    <Provider store = {st}>
      <>
        <Ecommerce/>
      </>
    </Provider>
  );
}

export default App;
