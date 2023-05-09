import React from 'react'
//import {useEffect} from "react"
import {Link} from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
//import {getSecondProducts} from '../../reducer/productActions.jsx';
import styled from 'styled-components';
// images
import cs1 from '../image/cosmetic/cs1.jpg'
import cs4 from '../image/cosmetic/cs4.jpg'
import cs6 from '../image/cosmetic/cs6.jpg'
import cs7 from '../image/cosmetic/cs7.jpg'
import cs10 from '../image/cosmetic/cs10.jpg'

const StyledComp = styled.div`
        max-width: 1400px;
        margin: auto;
    
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
            border-radius:3px;
            border:1px solid black;
            cursor:pointer;
        }
        button:hover{
            background:rgb(226, 225, 225);
        }
    }

    .section2{
        position:relative;
        margin-bottom:3rem;
        img{
            transform:scaleX(-1);
        }
        .sec2_desc{
            position:absolute;
            top:50%;
            left:10%;
            transform:translate(-0%,-50%);       
            h3{
                font-size:1.5rem;
                margin-bottom:1rem;
            } 
            h2{
                font-size:2.5rem;
                margin-bottom:1rem;
            }    
            p{
                font-size:1.2rem;
                margin-bottom:1rem;
            }
            button{
                padding:1rem 1rem;
            }
        }
    }

.section3{
    margin-bottom:3rem;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:3rem;

    .box{   
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        img{
            height:100%;
        }
        div{
            display:flex;
            flex-direction:column;
            justify-content:center;

            height:100%;
            p{
            font-size:1.2rem;
            }
            .red{
                color:red;
            }
            h3{
                font-size:2rem;
                margin:1.2rem 0;
            }
        }

    }
}
    .section4 {
        position:relative;

        .sec4_desc{
            position:absolute;
            top:50%;
            right:10%;
            transform:translate(-0%,-50%);       
            h3{
                font-size:1.5rem;
                margin-bottom:1rem;
            } 
            h2{
                font-size:2.5rem;
                margin-bottom:1rem;
            }    
            p{
                font-size:1.2rem;
                margin-bottom:1rem;
            }
            button{
                padding:1rem 1rem;
            }
        }
    }

    @media screen and (max-width:900px){
        .section3{
            grid-template-columns:1fr;

            .box{
                height:200px;
            }
        }
    }

`
const CosmeticScreen = ()=>{

    return(
        <StyledComp>
            <div className="section1">
                <h2>SHOP POPULAR COSMETICS CATEGORIES</h2>
                <div className="section1_buttons">
                    <Link to="/cosmetic/skincare"><button>SKIN CARE</button></Link>
                    <Link to="/cosmetic/fragrances"><button>FRAGRANCES</button></Link>
                </div>
            </div>

            <div className="section2">
                <img src={cs4} alt=""/>
                <div className="sec2_desc">
                    <h3>Spring Collection</h3>
                    <h2>LIFE IS A JOURNEY - <br></br>CAR PERFUME</h2>
                    <p>EXPLORE OUT STORE</p>
                    <Link to="/cosmetic/skincare/Eau_De_Perfume_Spray"><button>SHOP NOW</button></Link>
                </div>
            </div>

            <div className="section3">
                <div className="box box1">
                    <div>
                        <p className="red">Sale Off</p>
                        <h3>Prices already reduced up to 30%</h3>
                        <p>WOMEN'S PERFUME</p>
                    </div>
                    <img src={cs10} alt="" />
                </div>
                <div className="box box2">
                    <img src={cs6} alt="" />
                </div>
                <div className="box box3">
                    <img src={cs7} alt="" />
                    <div>
                        <p className="red">New Arrivals</p>
                        <h3>Natural & Organic Skincare</h3>
                        <p>WOMEN'S SKINCARE</p>
                    </div>
                </div>
                
            </div>


            <div className="section4">
                <img src={cs1} alt="" className="sec4_banner"/>
                <div className="sec4_desc">
                    <h3>Spring Collection</h3>
                    <h2>LIFE IS A JOURNEY - <br></br>CAR PERFUME</h2>
                    <p>EXPLORE OUT STORE</p>
                    <Link to="/cosmetic/skincare/Skin_Beauty_Serum."><button>SHOP NOW</button></Link>
                </div>
            </div>

        </StyledComp>
    )
}
export default CosmeticScreen;