import React from 'react'
import styled from 'styled-components';

const StyleComp = styled.footer`
    margin-top:80px;
    width:100%;
    background:#111;
    padding: 50px 0 50px 0;
    .footer_container{
        max-width:1100px;
        margin:auto;
        padding: 0px 2rem 0px 2rem;
        display:flex;
        justify-content:space-between;
        .footer_list{
            display:grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 50px;
        }
        li {
            margin-bottom:10px;
        }
        li a{
            font-size: 12px;
            color: #666;
        }
        ul li:first-child a{
            color: #fff;
        }
        .fa-brands{
            color:#fff;
            font-size:2rem;
            margin-left: 10px;
        }
        .social{
            display:flex;
            gap:5px;
        }
    }

    .footer_container2{
        max-width:1100px;
        margin:auto;
        padding: 30px 2rem 0px 2rem;
        display:flex;
        justify-content:space-between;
        font-size: 16px;
        .copyRight{
            display:flex;  
            align-items:center;
            gap: 15px;   
            .copyRight_left{
                color:#fff;
                span{
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
            .copyRight_right{
                color:#666;
                font-size: 12px;
            }
        }
        .terms{
            display:flex;
            gap: 15px;
            li a{
                font-size: 12px;
                color:#666;
            }
        }
    }


    @media screen and (max-width:800px){
        .footer_container{
            .footer_list{
                width:100%;
                grid-template-columns: repeat(2, 1fr);
                gap: 40px;
            }   
        }

        .social{
            flex-direction:column;
        }
  
    }

    @media screen and (max-width:500px){
        .footer_container{
            .footer_list{
                gap: 20px;
            }   
        }
        .footer_container2{
            margin-top:20px;
            flex-direction:column;
            gap:20px;
            .copyRight{
                justify-content:space-between;
            }

            .copyRight_left{
                span{
                    font-size: 1rem;
                }
            
            }

            .terms{
                align-items:center;
                text-align:center;
            }
        }
   
    }


`

const Footer = () => {
    return(
        <>
            <StyleComp>
                <div className='footer_container'>
                    <div className='footer_list'>
                        <ul>
                            <li><a href="link">GET HELP</a></li>
                            <li><a href="link">Order Status</a></li>
                            <li><a href="link">Shipping and Delivery</a></li>
                            <li><a href="link">Returns</a></li>
                            <li><a href="link">Payment Options</a></li>
                            <li><a href="link">Gift Card Balance</a></li>
                            <li><a href="link">Contact Us</a></li>
                        </ul>
                        <ul>
                            <li><a href="link">ACCOUNT</a></li>
                            <li><a href="link">Manage Your Account</a></li>
                            <li><a href="link">Store Account</a></li>
                        </ul>
                        <ul>
                            <li><a href="link">SHOP AND LEARN</a></li>
                            <li><a href="link">Store</a></li>
                            <li><a href="link">New Features</a></li>
                            <li><a href="link">Laptops</a></li>
                            <li><a href="link">Smart Phones</a></li>
                            <li><a href="link">Skincare</a></li>
                            <li><a href="link">Fragrances</a></li>
                        </ul>
                        <ul>
                            <li><a href="link">ABOUT US</a></li>
                            <li><a href="link">News</a></li>
                            <li><a href="link">Careers</a></li>
                            <li><a href="link">About Us</a></li>
                            <li><a href="link">Investors</a></li>
                            <li><a href="link">Purpose</a></li>
                            <li><a href="link">Sustainability</a></li>
                        </ul>
                    </div>

                    <div className="social">
                        <a href="herf"><i className="fa-brands fa-facebook-square"></i></a>
                        <a href="herf"><i className="fa-brands fa-instagram-square"></i></a>
                        <a href="herf"><i className="fa-brands fa-youtube-square"></i></a>
                        <a href="herf"><i className="fa-brands fa-twitter-square"></i></a>
                    </div>
                </div>

                <div className='footer_container2'>
                    <div className='copyRight'>
                        <div className='copyRight_left'><i className="fa-solid fa-location-dot"></i><span>United States</span></div>
                        <p className='copyRight_right'>&copy; Copyright 2022 All Rights Reserved</p>
                    </div>
                    <div className='terms'>
                        <li><a href="link">Guides</a></li>
                        <li><a href="link">Terms of Sale</a></li>
                        <li><a href="link">Terms of Use</a></li>
                        <li><a href="link">Privacy Policy</a></li>
                        <li><a href="link">CA Supply Chains Act</a></li>
                    </div>
                </div>


         
            </StyleComp>
        </>
    )
}
export default Footer