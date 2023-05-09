import React from 'react'
import styled from 'styled-components';

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail  } from "firebase/auth";

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
        .create_btn{
            margin-top:10px;
            height:30px;
            width:100%;
        }
    }

`

function CreateScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const registerFunc = async (e) =>{
        e.preventDefault()
        const auth = getAuth();

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setEmail('');
            setPassword('');
            navigate('/create2', {replace:true})

        } catch (error){
            const errorMessage = error.message;
            alert(errorMessage)
        }

    }

    return (
        <div>
            <StyledDiv>
                <div>
                    <h1>Nike</h1>

                    <form action="">
                        <h2>Craete account</h2>
                        <label htmlFor="id">Email</label>
                        <input type="text"  id="id" onChange={(e)=>{setEmail(e.target.value)}} />
                        <label htmlFor="pw" >Password</label>
                        <input type="password" id="pw" onChange={(e)=>{setPassword(e.target.value)}} />
                        
                        <button className="create_btn" onClick={registerFunc}>Create</button>
                        
                    </form>

                </div>
            </StyledDiv>
        </div>
    )
}

export default CreateScreen