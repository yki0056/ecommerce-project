import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StyledDiv = styled.div`
    max-width:900px;
    margin:auto;
    padding: 3rem 0;
    height:500px;
    a{
        color:#111;
    }
    h1{
        font-size: 3rem;
        margin-bottom:3rem;
    }
    .box-container{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap:20px;
        .box{
            height: 100px;
            border: 1px solid black;
            border-radius:5px;
            display:flex;
            justify-content:space-around;
            align-items:center;
            font-size:1.5rem;
            cursor:pointer;

            i{
                font-size:2rem;
            }
            div{
                flex-basis:70%;
                h3{
                    margin-bottom:5px;
                }
            }
        }
    }
 
`

function UserProfile() {
  return (
    <StyledDiv>
        <h1>Your Account</h1>
        <div className="box-container">
            <Link to="/editProfile">
                <div className="box">
                    <i className="fa-solid fa-user"></i>
                    <div>
                        <h3>Your Profiles</h3>
                        <p>Manage, add or remove user profiles</p>
                    </div>
                </div>
            </Link>
            <Link to="/editLogin">
                <div className="box">
                    <i className="fa-solid fa-lock"></i>
                    <div>
                        <h3>Login & Security</h3>
                        <p>Edit login, password</p>
                    </div>
                </div>
            </Link>
            <Link to="/cart">
                <div className="box">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div>
                        <h3>Your Cart</h3>
                        <p>Check your cart</p>
                    </div>
                </div>
            </Link>
        </div>

    </StyledDiv>
  )
}

export default UserProfile