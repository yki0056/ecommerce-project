import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {Link, NavLink, Navigate} from 'react-router-dom'
import './navbar.css'
import { useSelector } from 'react-redux'
import LowerNavBar from './LowerNavBar.jsx'
import { getAuth, signOut  } from "firebase/auth";

// NavLink는 Link의 새로나온스패셜로 현재 액티브된 링크에서 클래스 혹은 스타일을 부여할수있다.
const Navbar = ({setCartTog, setSearchTog, searchTog, hamTog, setHamTog, setMenuHoverTog})=>{
    const cart = useSelector(st => st.cart);
    const userStatus = useSelector(st => st.userStatus)
    const allProducts = useSelector(st => st.allGroupData)
    const url = "";

    const [matchedResult, setMatchedResult] = useState(null)
    const insideElem1 = useRef(null);
    const insideElem2 = useRef(null);
    const insideElem3 = useRef(null);
    const [elemArray, setElemArray] = useState([])
    const [searchValue, setSearchValue] = useState('');

    const initialState = <div className="popular_search_term">
        <p>Popular Search Terms</p>
        <Link to='/electronic/smartphones' onClick={()=>setSearchTog(false)}>Smart Phone</Link>
        <Link to='/electronic/smartphones?brand=apple' onClick={()=>setSearchTog(false)}>Apple</Link>
        <Link to='/electronic/fragrances' onClick={()=>setSearchTog(false)}>Fragrances</Link>
        <Link to='/electronic/smartphones?brand=samsung'onClick={()=>setSearchTog(false)}>Samsung</Link>
    </div>

    // 카트링크 클릭시 
    const changeIsToggle = ()=>{
        setCartTog(prev => !prev)
    }

    const totalQuantity = cart.reduce((prev,curr)=> {
        return prev + Number(curr.qty) 
    },0)

    // 매뉴 호버시 이벤트  
    const mouseEnterFunc = ((e)=>{
        setMenuHoverTog(true)
    })
    const mouseLeaveFunc = ((e)=>{
        setMenuHoverTog(false)
    })

    // search input 포커스 될시 발동 이벤트  
    const searchFocusFunc = () => {
        setSearchTog(true)
        setMatchedResult(initialState)

    }
    // 서치인풋에 유저가 입력시 서버데이타에서 받아온 아이템과 대조
    // 매칭된 아이템들은 4개만 디스플레이 되게함
    const searchFunc = (e) => {
            setSearchValue(e.target.value);
            let matches = allProducts.all.filter(st=>{
                const regex = new RegExp(`^${e.target.value}`, 'gi') // 대문자 
                return st.brand.match(regex) || st.category.match(regex) || st.title.match(regex)
            });
            // regexp로 필터중  .e.target.value값을 모두 지우면, 모든 serverData값이 matches에 들어가는 안좋은 에러가있음  
            if(e.target.value.length === 0){
                matches = [];
            }
            const displayMatches = matches.slice(0,4).map(m=>{
                return <div key={m.id} className="direct_searched_term_inside">
                        <img src={m.thumbnail} alt="" style={{width:'100px'}}/>
                        <div>
                            <p>{m.title}</p>
                            <p>{m.brand}</p>
                            <p>{m.category}</p>
                            <p>${m.price}</p>
                        </div>
                    </div>
            })
            setMatchedResult(<div className="direct_searched_term">{displayMatches}</div>)

            if(matches.length === 0){
                setMatchedResult(initialState)
            }
    }
    // 서치인풋의 포커스를 잃을시 적었던 글 없앰
    const focusOutFunc = ()=>{
        setSearchValue('');
    }

    const hamburgerBtnFunc = ()=>{
        setHamTog((prev)=>{
            return !prev
        })
    }

    const insideFunc = (e)=>{
        e.preventDefault();
        e.currentTarget.parentElement.children[1].classList.add('show')
    }
    const backFunc = (e) => {
        e.preventDefault();
        e.currentTarget.parentElement.classList.remove('show')
    }
    // 햄버버 매뉴 가장안쪽 링크 클릭시
    const hamburgerLinkClick = () => {
        setHamTog(false)
    }
    
    // 함버거 매뉴에서 가장 안쪽 매뉴를 보고있다가  토글을 넣을시   밖같 매뉴로 리셋하기 (이렇게 안하면 다시 토글을 열면 안쪽매뉴가 먼저 보임)
    useEffect(()=>{
        // ref요소들 배열에 집합 
        elemArray.push(insideElem1.current,insideElem2.current,insideElem3.current)
        if(hamTog === false){
            elemArray.forEach((elem) => {
                elem.classList.remove('show')
            })
        }
    }, [hamTog])
    

    const signOutFunc = async (e) => {
        const auth = getAuth();
        await signOut(auth)
    }


    return (
        <div className="navbar">

            <nav className="upperNavbar">
                <ul className="upLeft">
                    <a href="">Brand</a>
                    <a href="">Brand</a>
                </ul>
                <ul className="upRight">
                    {userStatus ? <NavLink to="/" onClick={signOutFunc}>Sign Out</NavLink> : <NavLink to="/login">Sign In</NavLink>}
                </ul>
            </nav>

            <nav className= {searchTog ? "middleNavbar mn_search_togg_on" : "middleNavbar"}>
                <div className="navbar_logo">
                    <h2><NavLink to="/">E-Commerce</NavLink></h2>
                </div>

                <ul className="desktop_menu">
       
                    <li onMouseOver={mouseEnterFunc} onMouseLeave={mouseLeaveFunc}>
                        <NavLink to="/electronic"  state={'electronic'}>Electronic</NavLink>
                        <div className="dropDown">
                            <ul>
                                <li>
                                    <Link to="/electronic/laptops">Laptops</Link>
                                    <Link to="/electronic/laptops/MacBook_Pro">MacBook Pro</Link>
                                    <Link to="/electronic/laptops/Samsung_Galaxy_Book">Samsung Galaxy Book</Link>
                                    <Link to="/electronic/laptops/Microsoft_Surface_Laptop_4">Microsoft Surface Laptop 4</Link>
                                    <Link to="/electronic/laptops/Infinix_INBOOK">Infinix INBOOK</Link>
                                    <Link to="/electronic/laptops/HP_Pavilion_15-DK1056WM">HP Pavilion 15-DK1056WM</Link>
                                </li>
                                <li>
                                    <Link to="/electronic/smartphones">Smart Phone</Link>
                                    <Link to="/electronic/smartphones/iPhone_9">iPhone 9</Link>
                                    <Link to="/electronic/smartphones/iPhone_X">iPhone X</Link>
                                    <Link to="/electronic/smartphones/Samsung_Universe_9">Samsung Universe 9</Link>
                                    <Link to="/electronic/smartphones/OPPOF19">Oppof 19</Link>
                                    <Link to="/electronic/smartphones/Huawei_P30">Huawei P30</Link>
                                </li>
                            </ul>  
                        </div>
                    </li>
                    <li onMouseOver={mouseEnterFunc} onMouseLeave={mouseLeaveFunc}>
                        <Link to="/cosmetic" state={'cosmetic'}>Cosmetic</Link>
                        <div className="dropDown">
                            <ul>
                                <li>
                                    <Link to="/cosmetic/skincare">Skincare</Link>
                                    <Link to="/cosmetic/skincare/Hyaluronic_Acid_Serum">Hyaluronic Acid Serum</Link>
                                    <Link to="/cosmetic/skincare/Tree_Oil_30ml">Tree Oil 30ml</Link>
                                    <Link to="/cosmetic/skincare/Oil_Free_Moisturizer_100ml">Oil_Free_Moisturizer_100ml</Link>
                                    <Link to="/cosmetic/skincare/Skin_Beauty_Serum.">Skin_Beauty_Serum.</Link>
                                    <Link to="/cosmetic/skincare/Freckle_Treatment_Cream-_15gm">Freckle_Treatment_Cream-_15gm</Link>
                                </li>
                                <li>
                                    <Link to="/cosmetic/fragrances">Fragrances</Link>
                                    <Link to="/cosmetic/fragrances/perfume_Oil">Perfume Oil</Link>
                                    <Link to="/cosmetic/fragrances/Brown_Perfume">Brown Perfume</Link>
                                    <Link to="/cosmetic/fragrances/Fog_Scent_Xpressio_Perfume">Fog Scent Xpressio Perfume</Link>
                                    <Link to="/cosmetic/fragrances/Non-Alcoholic_Concentrated_Perfume_Oil">Non-Alcoholic_Concentrated_Perfume_Oil</Link>
                                    <Link to="/cosmetic/fragrances/Eau_De_Perfume_Spray">Eau De Perfume Spray</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/groceries">Groceries</Link>
                    </li>
                    <li>
                        <Link to="/home-decoration">Home-Decoration</Link>
                    </li>
                </ul>

                <ul className="search_cart">
                    <li className="searchInput" onClick={searchFocusFunc} >
                        <span><i className="fas fa-search"></i></span>
                        <input type="text" placeholder='Search' value={searchValue} onChange={searchFunc} onBlur={focusOutFunc}/>
                    </li>
                
                    <li className="cartButton" onClick={changeIsToggle}>
                        <i className="fas fa-shopping-cart"></i>
                        <span>{totalQuantity}</span>
                    </li>

                    {userStatus ? <li className="userButton"><Link to="/userProfile">Hello, {userStatus.email}</Link></li> : ''}
                    {userStatus ? <li className="userButton_mobile"><Link to="/userProfile"><i class="fa-solid fa-user"></i></Link></li> : ''}

                    <li className="hamburger_menu" onClick={hamburgerBtnFunc}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </li>
                </ul>

                <div className= {searchTog ? "search_menu search_tog_on" : "search_menu"}>
                    { matchedResult }
                </div>
            </nav>

            <LowerNavBar></LowerNavBar>


            {/* hamburger menu list */}
            <div className={hamTog ? "smartphone_menu show" : "smartphone_menu"}>
                    <ul>
                        <button onClick={hamburgerBtnFunc} className="xbutton"><i className="fa-solid fa-x"></i></button>
                        <li>
                            <div onClick={insideFunc} className="sm_category">NewRelease<i className="fa-solid fa-chevron-right"></i></div>
                            <ul className='inside' ref={insideElem1}>
                                <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>Menu</div>
                                <li>
                                    <div onClick={insideFunc}  className="sm_category">Feature<i className="fa-solid fa-chevron-right"></i></div>
                                    <ul className="inside_inside">
                                        <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>NewRelease</div>
                                        <li><a href={url}>aaa</a></li>
                                        <li><a href={url}>bbb</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <div onClick={insideFunc}  className="sm_category">Men<i className="fa-solid fa-chevron-right"></i></div>
                                    <ul className="inside_inside">
                                        <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>NewRelease</div>
                                        <li><a href={url}>mmm</a></li>
                                        <li><a href={url}>mmm</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <div onClick={insideFunc}  className="sm_category">Women<i className="fa-solid fa-chevron-right"></i></div>
                                    <ul className="inside_inside">
                                        <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>NewRelease</div>
                                        <li><a href={url}>www</a></li>
                                        <li><a href={url}>www</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <div onClick={insideFunc}  className="sm_category">Kids<i className="fa-solid fa-chevron-right"></i></div>
                                    <ul className="inside_inside">
                                        <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>NewRelease</div>
                                        <li><a href={url}>kkk</a></li>
                                        <li><a href={url}>kkk</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div onClick={insideFunc} className="sm_category">Electronic <i className="fa-solid fa-chevron-right"></i></div>
                            <ul className='inside' ref={insideElem2}>
                                <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>Menu</div>
                                <li><Link to="/electronic/laptops" onClick={hamburgerLinkClick} className="sm_category">Latop</Link></li>
                                <li><Link to="/electronic/smartphones" onClick={hamburgerLinkClick} className="sm_category" >Smart Phone</Link></li>     
                            </ul>
                        </li>
                        <li>
                            <div onClick={insideFunc} className="sm_category">Cosmetic <i className="fa-solid fa-chevron-right"></i></div>
                            <ul className="inside" ref={insideElem3}>
                                <div onClick={backFunc} className='back_button'><i className="fa-solid fa-chevron-left"></i>Menu</div>
                                <li><Link to="/cosmetic/skincare" onClick={hamburgerLinkClick} className="sm_category">SkinCare</Link></li>
                                <li><Link to="/cosmetic/fragrances" onClick={hamburgerLinkClick} className="sm_category">Fragrance</Link></li>
                            </ul>
                        </li>
                        <li>
                            <div onClick={insideFunc} className="sm_category">Glocery <i className="fa-solid fa-chevron-right"></i></div>
                        </li>
                    </ul>
                </div>

        </div>
    )

}

export default Navbar
