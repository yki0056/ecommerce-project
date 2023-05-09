import React from 'react'
import styled from 'styled-components';

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getFirestore, collection, doc, setDoc} from "firebase/firestore";

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

function CreateScreen2() {
    const user = useSelector(st => st.userStatus);
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userMemo, setUserMemo] = useState('');
    let navigate = useNavigate();
    const db = getFirestore();

    const submitFunc = async (e) =>{
        e.preventDefault()
        try {
            await setDoc(doc(collection(db, 'profile'), user.uid), {
                name: userName, 
                address: userAddress,
                memo: userMemo,
                cart: []
            });
            alert('successfully created')
            navigate('/', {replace:true})
            
        } catch (error){
            const errorMessage = error.message;
            alert(errorMessage)
        }

    }

    return (
        <div>
            <StyledDiv>
                <div>
                    <h1>Profile Information</h1>

                    <form action="">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={userName} onChange={(e)=>setUserName(e.target.value)}/> 
                        </div>
                        <div>
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address"  value={userAddress} onChange={(e)=>setUserAddress(e.target.value)}/> 
                        </div>
                        <div>
                            <label htmlFor="memo">Message:</label>
                            <textarea name="" id="memo" cols="30" rows="5"  value={userMemo} onChange={(e)=>setUserMemo(e.target.value)}></textarea> 
                        </div>
                        <button onClick={submitFunc}>Submit</button> 
                    </form>

                </div>
            </StyledDiv>
        </div>
    )
}

export default CreateScreen2