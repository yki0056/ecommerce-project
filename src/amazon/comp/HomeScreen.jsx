import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import home1 from './image/home1.jpg'
import home2 from './image/home2.jpeg'
import home3 from './image/home3.png'
import home4 from './image/home4.jpg'
import home5 from './image/home5.jpg'

import logo1 from './image/sm-logo.png'
import logo2 from './image/ap-logo.png'
import logo3 from './image/ms-logo.png'
import logo4 from './image/ifx-logo.png'
import logo5 from './image/hp-logo.png'

const Styled = styled.div`
    max-width:1300px;
    margin:auto;
    .section1{
        position:relative;
        margin-bottom:100px;
        display:flex;

        .text{
            position:absolute;
            top:10%;
            left:10%;
            transform:translate(-10%, -10%);
            padding:1rem;
            h2{
                font-size:3rem;
                margin-bottom:1rem;
            }
            p{
                font-size:1.5rem;
                margin-bottom:1rem;
            }
            .btn1,.btn2{
                padding: 0.5rem 1rem;
                background-color: rgba(0,0,0,0);
                border:2px solid #111;
                cursor:pointer;
                margin-right:1rem;
            }
            
            .btn1:hover, .btn2:hover{
                background-color:#111;
                color:#fff;
            }
        }
    }

    .section2{
        width:100%;
        display:grid;
        grid-template-columns:1fr 1fr 1fr 1fr 1fr;
        gap:100px;
        margin-bottom:100px;
        div{
            display:flex;
            justify-content:center;
            cursor:pointer;
        }

    }

    .section3{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap:20px;
        div{
            position:relative;
            display:flex;
            h3{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                color:#fff;
                font-size:1.3rem;
            }
            img{
                filter: brightness(0.5);
            }
        }
        button{
            position:absolute;
            bottom:10%;
            left:50%;
            transform:translateX(-50%);
            padding: 15px 20px;
            background-color: rgba(0,0,0,0);
            border: none;
            outline:1px solid #fff;
            color:#fff;
            cursor:pointer;
        }
        button:hover{
            font-weight:bold;
            outline:2px solid #fff;
        }
    }

    @media screen and (max-width: 500px){

        .section2 {
            justify-content: center;
            grid-template-columns: 120px 120px;
            gap: 50px;
            div{
                height: 120px;
            }
        }

        .section3 {
            justify-content: center;
            grid-template-columns: 1fr;
           
        }
    }
` 

const HomeScreen = ()=>{


    return(
        <Styled>
            <div className='section1'>
                <img src={home1} alt="" />
                <div className="text">
                    <h2>Raining Offers for Hot Summer!</h2>
                    <p>20% OFF ON ALL PRODUCTS</p>
                    <button className="btn1">SHOW NOW</button>
                    <button className="btn2">FIND OUT MORE</button>
                </div>
          
            </div>

            <div className='section2'>
                <div>
                    <img src={logo1} alt="" /> 
                </div>
                <div>
                    <img src={logo2} alt="" />
                </div>
                <div>
                    <img src={logo3} alt="" />
                </div>
                <div>
                    <img src={logo4} alt="" />
                </div>
                <div>
                    <img src={logo5} alt="" />
                </div>
            </div>

            <div className='section3'>
                <div className="box1">
                    <img src={home2} alt="" />
                    <h3>MODERN COLLECTION</h3>
                    <Link to='/electronic/laptops'><button>READ MORE</button></Link>
                </div>
                <div className="box2">
                    <img src={home3} alt="" />
                    <h3>LATEST FRAGRANCES</h3>
                    <Link to='/cosmetic/fragrances'><button>SHOP COLLECTION</button></Link>
                </div>
                <div className="box3">
                    <img src={home5} alt="" />
                    <h3>BRAND NEW SMART PHONES</h3>
                    <Link to='/electronic/smartphones'><button>SHOP NOW</button></Link>
                </div>
                <div className="box4">
                    <img src={home4} alt="" />
                    <h3>25% OFF ON DECORATIONS</h3>
                    <Link to='/electronic/groceries'><button>READ MORE</button></Link>
                </div>
            </div>
        </Styled>
    )
};
export default HomeScreen;