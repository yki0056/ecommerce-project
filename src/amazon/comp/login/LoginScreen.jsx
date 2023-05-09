import React from 'react'
import styled from 'styled-components';
import {NavLink, useNavigate} from 'react-router-dom';

import {useState} from 'react';
// import firebaseApp from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const StyledDiv = styled.div `
    margin: 50px 0 100px 0;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    h1 {
            font-size:4rem;
            text-align:center;
            margin-bottom:10px;
    }
    form{
        display:flex;
        flex-direction:column;
        border:1px solid rgb(190, 190, 190);
        width:300px;
        padding:30px;
        h2{
            font-size:2rem;
            font-weight:300;
            margin-bottom:20px;
        }
        label{
            font-size:1rem;
            font-weight:bold;
        }
        input{
            margin:  5px 0 10px 0;
            height:30px;
            padding-left:5px;
        }
        .sign_in_btn{
            margin-top:10px;
            height:30px;
            width:100%;
        }
    }
    .login_error{
        margin-bottom:1rem;
        color:red;
    }
    .create{
        width:100%;
        text-align:center;
        margin-top:20px;
        h3{
            font-weight:300;
        }
        .create_account_btn{
            margin-top:10px;
            height:30px;
            width:100%;
        }
    }
`

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const signIn = async (e) =>{
        e.preventDefault();
        try {
            console.log('gjgj')
            await signInWithEmailAndPassword(auth, email, password);
            setLoginError(null)
            setEmail('');
            setPassword('');
            navigate(-1);
        } catch(error){
            console.log('에러')
            setLoginError(error.message)
        }
    }

    return (
        <StyledDiv>
            <div>
                <h1>Nike</h1>

                <form action="">
                    <h2>Sign-In</h2>
                    {loginError ? <div className="login_error">Messages: {loginError}</div> : ""}
                    <label htmlFor="id">Email</label>
                    <input type="text"  id="id" onChange={(e)=>{setEmail(e.target.value)}} />
                    <label htmlFor="pw" >Password</label>
                    <input type="password" id="pw" onChange={(e)=>{setPassword(e.target.value)}} />
                    <button className="sign_in_btn" onClick={signIn}>Log-In</button>
                </form>

                <div className='create'>
                    <h3>New to Nike?</h3>
                    <NavLink to="/create"><button className="create_account_btn">Create your Amazon account</button></NavLink>
                </div>
            </div>
        </StyledDiv>

    )
}

export default LoginScreen