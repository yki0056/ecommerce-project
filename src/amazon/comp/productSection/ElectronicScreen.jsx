import React from 'react'
import {useEffect, useState, useRef} from "react"
import {Link, useNavigate} from 'react-router-dom';

// import {getSecondProducts} from '../../reducer/productActions.jsx';
import styled from 'styled-components';

// images
// wallpaer
import macwall from '../image/laptops/macbook_banner.jpg';
import iphonebanner from '../image/phone/iPhoneX_banner.png';
// laptops
import hp from '../image/laptops/hp.jpg';
import pro from '../image/laptops/pro.jpeg';
import sams from '../image/laptops/sams.jpg';
import x from '../image/laptops/x.png';
// phone
import huawei from '../image/phone/huaweip30.jpg';
import iphone9 from '../image/phone/iphone9.jpg';
import iphonex from '../image/phone/iphonex.png';
import oppof from '../image/phone/oppof.jpg';


const StyledComp = styled.div`
    :root{
        --column-offset: 12px;
    }
    width:100%;
    background:#fff;
    text-align:center;
    .container{
        max-width: 1800px;
        margin: auto;
    }
    .section1{
        height:250px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        h2 {
            font-size:2rem;
            margin-bottom:20px;
        }
        button {
            padding: 1rem 1rem;
            margin: 0 5px;
            background:#fff;
            border:1px solid black;
            border-radius:3px;
            cursor:pointer;
        }
        button:hover{
            background:rgb(226, 225, 225);
        }
    }

    .section2{
        display:flex;
        margin-top:4rem;
        .sc2Desc{
            width:50%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:10px;
            background:#f4f4f4;
            h2{
                font-size:3rem;
            }
            p{
                font-size:1.5rem;
            }
            button{
                font-size:1.1rem;
                padding:0.6rem 1rem;
                margin-top:20px;
                cursor:pointer;
            }
            img{
                width:50%;
            }
        }
        img{
            width:50%;
        }
    }

    .section5{
        width:90%;
        margin:auto;
        margin-top:4rem;
        background:#fff;
        .header{
            height:80px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            button{
                border:none;
                width: 50px;
                height: 50px;
                border-radius:50%;
                font-size: 1.5rem;
                margin-left:15px;
                cursor:pointer;
                background:rgb(226, 225, 225);
            }
            button:hover{
                background:rgb(160, 160, 160);
            }
        }
    }
    

    .items{
        display:flex;
        gap: 10px;
        overflow-x:scroll;
        scroll-snap-type: x mandatory;
        background: #f4f4f4;
        scroll-behavior: smooth;
    }
    .items::-webkit-scrollbar {
        height: 7px;
    }
    .items::-webkit-scrollbar-thumb {
        /*스크롤 바 */
        background: #888;
        border-radius: 10px;
        visibility:hidden;
    }
    .items::-webkit-scrollbar-track {
        /*스크롤 배경 */
        background-color: #fff;
    }
    .items:hover::-webkit-scrollbar-thumb{
        visibility:visible;
    }
    /* hover .은 해당 요소의 자식요소들만 찾을수있음. >는 직계 자식요소,  ~는 형제요소, +는 바로 옆 요소*/
    .items:hover ~ .items::-webkit-scrollbar-thumb{
        visibility:visible;
    }

    .sc5_items_cont{
        scroll-snap-align: start;
        display:flex;
        /* var(--column-offset) */
        flex: 0 0 33.3%;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:#fff;
        cursor:pointer;
    }
    .sc5_items_desc{
        font-size:1.1rem;
        margin-bottom: 50px;
        width:80%;
        display:flex;
        justify-content:space-around;
    }
    .section5 img{
        width: 60%;
        max-height:300px;
    }

    /* JS manipulated css */
    .lighter{
        opacity:0.3;
        pointer-events:none;
    }

    @media screen and (max-width: 1200px){

        .section5{
            .items{
                .sc5_items_cont{
                    flex-shrink: 0;
                    flex-basis: 42%; 
                }
            }
        }
    }

    @media screen and (max-width: 700px){
        .section1{
            .buttons{
                display:flex;
                flex-direction:column;
                gap:1rem;
                button{
                    width:100px;
                }
            }
            
        }
        .section2{
            flex-direction:column;
            img {
                width:100%;
            }
            .sc2Desc{
                width:100%;
                height: 200px;
            }
        }
        .section5{
            .items{
                .sc5_items_cont{
                    flex-shrink: 0;
                    flex-basis: 70%; 
                }
            }
        }
    }

`

const ElectronicScreen = ()=>{
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentSlide2, setCurrentSlide2] = useState(0);
    const slideElement = useRef()
    const allSlideElement = useRef()
    const allSlideElement2 = useRef()
    const [lastSlidePage, setLastSlidePage]  = useState()
    const navigate = useNavigate()

    // 모든 물건들중  일렉트로닉 제품들 구별 해야함. 랩탑,스마트폰
    // const onlyElectronicProducts = staticAllProducts.filter(f=>f.category === "laptops" || f.category === "smartphones") // 데이터에 랩탑이 있다면 
    
    const prevButton = (e) => {
        //const sliderWidth = e.target.parentElement.parentElement.parentElement.children[1]
        //console.log(e.target.parentElement.parentElement.parentElement.children[1])
        const {width} = slideElement.current.getBoundingClientRect()
        const cs = currentSlide > 0 ? currentSlide-1 : currentSlide
        allSlideElement.current.scrollLeft = width * cs;
        setCurrentSlide(cs)
    }
    const nextButton = () => {
        const {width} = slideElement.current.getBoundingClientRect()
        const cs = currentSlide < 5 ? currentSlide+1 : currentSlide
        allSlideElement.current.scrollLeft = width * cs;
        setCurrentSlide(cs)
        //allSlideElement.current.scrollTo = 300 * currentSlide;
        //allSlideElement.current.style.right = `${(width + 10) * currentSlide}px`
    }
    const prevButton2 = (e) => {
        const {width} = slideElement.current.getBoundingClientRect()
        const css2 = currentSlide2 > 0 ? currentSlide2-1 : currentSlide2
        allSlideElement2.current.scrollLeft = width * css2;
        setCurrentSlide2(css2)
    }
    const nextButton2 = () => {
        const {width} = slideElement.current.getBoundingClientRect()
        const css2 = currentSlide2 < 5 ? currentSlide2+1 : currentSlide2
        allSlideElement2.current.scrollLeft = width * css2;
        setCurrentSlide2(css2)
    }

    const navFunc = () => {
        navigate('/electronic/laptops')
    }


    useEffect(()=>{// 이컴포가 켜지자마자 dispatch를 사용해서 서버에서 정보를 받아옴
        // ref로 받아온 요소의 자식 수 - 3  한뒤  다른 ref 변수에 넣음   state로 저장시 
        // lastSlidePage.current = allSlideElement.current.children.length - 3
        setLastSlidePage(allSlideElement.current.children.length - 3)
        // thunk를 이용해서 함수를 dispatch()안에 넣고 사용가능, productAction 파일에있는 getSecondProducts함수결과인  async함수는 인자로 dispatch를 받을수있음
        // dispatch(getSecondProducts()) // productAction 파일에있는 getSecondProducts함수 실행  // 해당 함수안에있는 주소에 아이템정보들
    },[/*dispatch*/])
    

    return(
        <>
        <StyledComp>
            <div className="section1">
                <h2>SHOP ELECTRONIC PRODUCTS</h2>
                <div className="buttons">
                    <Link to="/electronic/laptops"><button>LAPTOPS</button></Link>
                    <Link to="/electronic/smartphones"><button >SMART PHONES</button></Link>
                </div>
            </div>

            <div className="section2">
                <img src={macwall} alt="" />
                <div className="sc2Desc">
                    <h2>New MacBook Pro</h2>
                    <p>More power. More performance. More pro.</p>
                    <Link to="/electronic/laptops/MacBook_Pro"><button >SHOP NOW</button></Link>
                </div>
            </div>
            
            <div className="section5">
                <div className="header">
                    <h2>EXPLORE THE COLLECTION</h2>
                    <div>
                        <button onClick={prevButton} className={currentSlide === 0 ? 'lighter' : ''}><i className="fa-solid fa-angle-left"></i></button>
                        <button onClick={nextButton} className={currentSlide === lastSlidePage ? 'lighter' : ''}><i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>

                <div className="items"  ref={allSlideElement}>
                    <Link to="/electronic/laptops/Samsung_Galaxy_Book" className="sc5_items_cont" ref={slideElement}>
                        <img src={sams} alt=""/>
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Samsung Galaxy Book</span>
                            <span>$300</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/MacBook_Pro" className="sc5_items_cont">
                        <img src={pro} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">MacBook Pro</span>
                            <span>$400</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/Infinix_INBOOK" className="sc5_items_cont">
                        <img src={x} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Infinix INBOOK</span>
                            <span>$500</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/HP_Pavilion_15-DK1056WM" className="sc5_items_cont">
                        <img src={hp} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">HP Pavilion 15-DK1056WM</span>
                            <span>$600</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/Samsung_Galaxy_Book" className="sc5_items_cont">
                        <img src={sams} alt=""/>
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Samsung Galaxy Book</span>
                            <span>$300</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/MacBook_Pro" className="sc5_items_cont">
                        <div className="sc5_items_cont">
                            <img src={pro} alt="" />
                            <div className="sc5_items_desc">
                                <span className="section5_items_desc_name">MacBook Pro</span>
                                <span>$400</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/Infinix_INBOOK" className="sc5_items_cont">
                        <img src={x} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Infinix INBOOK</span>
                            <span>$500</span>
                        </div>
                    </Link>
                    <Link to="/electronic/laptops/HP_Pavilion_15-DK1056WM" className="sc5_items_cont">
                        <img src={hp} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">HP Pavilion 15-DK1056WM</span>
                            <span>$600</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="section2">
                <img src={iphonebanner} alt="" />
                <div className="sc2Desc">
                    <h2>iPhone X</h2>
                    <p>Say hello to the future</p>
                    <button>SHOP NOW</button>
                </div>
            </div>

            <div className="section5">
                <div className="header">
                    <h2>EXPLORE THE COLLECTION</h2>
                    <div className="section5_buttons">
                        <button onClick={prevButton2}  className={currentSlide2 === 0 ? 'lighter' : ''}><i className="fa-solid fa-angle-left"></i></button>
                        <button onClick={nextButton2} className={currentSlide2 === lastSlidePage ? 'lighter' : ''}><i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>


                <div className="items"  ref={allSlideElement2}>
                    <Link to="/electronic/smartphones/OPPOF19" className="sc5_items_cont">
                        <img src={oppof} alt=""/>
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">OPPOF</span>
                            <span>$300</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/iPhone_X" className="sc5_items_cont">
                        <img src={iphonex} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">iPhone X</span>
                            <span>$400</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/Huawei_P30" className="sc5_items_cont">
                        <img src={huawei} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Huawei p30</span>
                            <span>$500</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/iPhone_9" className="sc5_items_cont">
                        <img src={iphone9} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">iPhone 9</span>
                            <span>$600</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/OPPOF19" className="sc5_items_cont">
                        <img src={oppof} alt=""/>
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">OPPOF</span>
                            <span>$300</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/iPhone_X" className="sc5_items_cont">
                        <img src={iphonex} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">iPhone X</span>
                            <span>$400</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/Huawei_P30" className="sc5_items_cont">
                        <img src={huawei} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">Huawei p30</span>
                            <span>$500</span>
                        </div>
                    </Link>
                    <Link to="/electronic/smartphones/iPhone_9" className="sc5_items_cont">
                        <img src={iphone9} alt="" />
                        <div className="sc5_items_desc">
                            <span className="section5_items_desc_name">iPhone 9</span>
                            <span>$600</span>
                        </div>
                    </Link>
                </div>
            </div>
            
        </StyledComp>

        </>
        


    )
}
export default ElectronicScreen;