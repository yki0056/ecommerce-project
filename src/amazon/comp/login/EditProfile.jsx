
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getFirestore, doc, updateDoc , onSnapshot} from "firebase/firestore";
import styled from 'styled-components';

const StyledComp = styled.div`
    width:1400px;
    height:800px;
    margin:auto;
    padding-top:50px;
    h1{
      font-size:2rem;
      margin-bottom:1rem;
    }
    div{
      margin-bottom:0.5rem;
      font-size:1.2rem;
    }
    button{
      padding: 0.5rem 1rem;
    }
    label{
      margin-right: 10px;
    }
    textarea{
      display:block;
    }
`
function EditProfile() {
  const user = useSelector(st => st.userStatus);
  
  const [userName, setUserName] = useState();
  const [userAddress,setUserAddress] = useState();
  const [userMemo, setUserMemo] = useState();
  const [editMode, setEditMode] = useState(false);
  const db = getFirestore();
  
  const submitFunc = async(e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'profile', user.uid), {
      name: userName, 
      address: userAddress,
      memo: userMemo
    })
    .then(()=>{
      setEditMode(!editMode);
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const changeModeFunc = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  useEffect(()=>{
    if(user.uid){
      onSnapshot(doc(db, "profile", user.uid), (data) => {
        const userData = data.data();
        setUserName(userData.name)
        setUserAddress(userData.address)
        setUserMemo(userData.memo)
      });
    }
  },[user.uid])

  return (
    <StyledComp>
      <h1>Manage Your Profile</h1>

      <form action="">
        <div>
          <label htmlFor="name">Name:</label>
          {editMode ? <input type="text" id="name" value={userName} onChange={(e)=>setUserName(e.target.value)}/> : userName }
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          {editMode ? <input type="text" id="address"  value={userAddress} onChange={(e)=>setUserAddress(e.target.value)}/> : userAddress}
        </div>
        <div>
          <label htmlFor="memo">Message:</label>
         {editMode ? <textarea name="" id="memo" cols="30" rows="5"  value={userMemo} onChange={(e)=>setUserMemo(e.target.value)}></textarea> : userMemo}
        </div>
        {editMode ?  <button onClick={submitFunc}>Edit profile</button> : <button onClick={changeModeFunc}>Edit</button>}
      </form>
    </StyledComp>
  )
}

export default EditProfile