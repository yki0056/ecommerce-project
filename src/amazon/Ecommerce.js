import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getFirestore, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
/* firebase */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getAllProducts} from './reducer/productActions.jsx';
/* css */
import './ecommerce.css'
/* pages */
import HomeScreen from './comp/HomeScreen.jsx'
import ProductSingleScreen from './comp/productSection/ProductSingleScreen.jsx'
import ElectronicScreen from './comp/productSection/ElectronicScreen.jsx'
import CosmeticScreen from './comp/productSection/CosmeticScreen.jsx'
import GloceryScreen from './comp/productSection/GloceryScreen.jsx'

import CartScreen from './comp/CartScreen.jsx'
import Login from './comp/login/LoginScreen.jsx'
import Create from './comp/login/CreateScreen.jsx'
import Create2 from './comp/login/CreateScreen2.jsx'
import UserProfile from './comp/login/UserProfile.jsx'
import EditProfile from './comp/login/EditProfile.jsx'
import EditLogin from './comp/login/EditLogin.jsx'
import ProductListScreen from './comp/productSection/ProductListScreen.jsx'

/* components */
import ScrollToTop from "./comp/productSection/ScrollToTop.jsx";
import Navbar from './comp/navbar/Navbar.jsx'
import SideCartDrawer from './comp/SideCartDrawer.jsx'
import Footer from './comp/Footer.jsx'

function Ecommerce() {
    const [searchToggle, setSearchToggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);
    const [menuHoverToggle, setMenuHoverToggle] = useState(false);
    const db = getFirestore();
    const dispatch = useDispatch();
    const cart = useSelector(st => st.cart)
    const user = useSelector(st => st.userStatus);
    const [initialRender, setInitialRender] =  useState(true);
    const isMounted = useRef(false);

    const removeBlackFunc = ()=>{
        setSearchToggle(false);
        setHamburgerToggle(false);
        setCartToggle(false);
    }

    // redux thunk를 사용해서 비동기 처리. dispath(함수) 사용가능해지고. 이곳은  userAction이라고 생각하면될듯
    // authUser의 uid를 이용해서  >  파이어스토어의 같은 번호의 정보를 받아와서  >  reducer에 저장 
    const userFetchAction = (authUser) => async (dspch) => {
        // authUser는 auth정보가 들어있음 auth, email, uid 
        // docSnap은 유저의 프로필정보,카트정보 들어있음
        try {
            dspch({type:"SIGNED_IN_REQUEST"});
            const userData = await getDoc(doc(db, "profile", authUser.uid))  // getDoc사용하여 프로필을 가져옴 
            const ud = userData.data()
            if(ud){
                dspch( {type: "SIGNED_IN_SUCESS", payload: {...authUser, userDatabase: ud} })
                dspch( {type:"USER_CART_DATA", payload: ud.cart} ) 
            } else {
                dspch( {type: "SIGNED_IN_SUCESS_NO_PROFILE", payload: {...authUser, userDatabase: []} })
                dspch( {type:"USER_NO_CART_DATA", payload: []} ) 
            }
        } catch (error){
            console.log(error)
            dspch({type:"SIGNED_IN_FAIL", payload:error})
        }
    }

    // 유저의 실시간 상태정보 파악하고  로그인중이면  userFetchAction함수 발동시켜 정보를 받아옴.
    useEffect(()=>{
        const auth = getAuth();
        // console.log(auth) // AuthImpl {app: {...}, authStateSubscription: {...}, currentUser: {...}
        // 파이어베이스에서 실시간 로그인 상태의 변화가 있다면 발동 
        const user = onAuthStateChanged(auth, (authUser) => {
            authUser ? dispatch(userFetchAction(authUser)) : dispatch({type:"SIGNED_OUT_STATE", payload:null});
            authUser ? console.log('') : dispatch({type:"EMPTY_CART"})
            authUser ? console.log('로그인 상태') : console.log('로그아웃 상태');
        });
        return () => {
            user();
        }
    },[])

    // 서치에서 상품목록을 얻기위해 컴포가 시작하면 한번 정보를 받아옴. 왜냐면 홈페이지에서 search에 보여질 아이템 목록필요
    useEffect(()=>{
        dispatch(getAllProducts()) 
    },[])

    // 카트정보 업데이트 
    // 로그인 하자마자 현재 카트상태인 0을 바로 업데이트해서  파이어스토에 있던 정보가 없어 지는듯;
    // 로그아웃시 empty 카트발동  카트수정되므로 useEffect 발동. 
    useEffect(()=>{
        async function fetchDatas (){
            try{
                if(isMounted.current){
                    setInitialRender = false
                } else {
                    if(user){
                        await updateDoc(doc(db, 'profile', user.uid), {cart:cart});
                    }
                }
            } catch(error) {
                console.log(error)
            }
        }
        fetchDatas()
    },[cart])

    return (
        <div className="wrapper">
            <BrowserRouter>
                <ScrollToTop/>
                {/*black shadow  */}
                <div className={searchToggle || hamburgerToggle || menuHoverToggle ? "black-screen" : ""} onClick={removeBlackFunc}></div>
                <div className={cartToggle ? "black-screen2" : ""} onClick={removeBlackFunc}></div>
                <Navbar setCartTog={setCartToggle} setSearchTog={setSearchToggle} searchTog={searchToggle} hamTog={hamburgerToggle} setHamTog={setHamburgerToggle} setMenuHoverTog = {setMenuHoverToggle}/>
                
                <SideCartDrawer cartTog={cartToggle} setCartTog={setCartToggle} />

                <Routes>
                    <Route path="/" element={<HomeScreen/>}></Route>
                    
                    <Route path="/electronic" element={<ElectronicScreen/>}></Route>
                    <Route path="/electronic/:category" element={<ProductListScreen/>}></Route>
                    <Route path="/electronic/:category/:title" element={<ProductSingleScreen/>}></Route>

                    <Route path="/cosmetic" element={<CosmeticScreen/>}></Route>
                    <Route path="/cosmetic/:category" element={<ProductListScreen/>}></Route>
                    <Route path="/cosmetic/:category/:title" element={<ProductSingleScreen/>}></Route>

                    <Route path="/:category" element={<ProductListScreen/>}></Route>
                    <Route path="/:category/:title" element={<ProductSingleScreen/>}></Route>
                
                    <Route path="/cart" element={<CartScreen/>}></Route>
                    
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/create" element={<Create/>}></Route>
                    <Route path="/create2" element={<Create2/>}></Route>
                    <Route path="/userProfile" element={<UserProfile/>}></Route>
                    <Route path="/editProfile" element={<EditProfile/>}></Route>
                    <Route path="/editLogin" element={<EditLogin/>}></Route>

                </Routes>

                <Footer></Footer>
            </BrowserRouter>
        </div>
    )
}

export default Ecommerce
