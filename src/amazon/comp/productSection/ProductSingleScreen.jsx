import React from 'react'
import {useState, useRef, useEffect} from 'react'; 
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {getSecondProductsTitle} from '../../reducer/productActions.jsx';

//component
import SectionHead from './SectionHead.jsx'

const StyledDiv = styled.div`
    background:#fff;
  .container{
    padding: 0px 2rem;
  }
  .singleitem_container{
    width:100%;
    height: 900px;
    display:flex;
    align-items:start;
    justify-content:center;
  }
  .singleitem_box1{
    width: 100px;
    height: 80px;
  }
  .singleitem_box1 img{

  }
  .singleitem_box2{

    width:450px;
    position:relative
  }
  .singleitem_box2 img{
    max-height:400px;
  }

  .singleitem_box2 .zoomWindow{
    position: absolute;
    width:100px;
    height:100px;
    border:1px solid red;
    visibility:hidden;
  }

  .singleitem_box2 .zoomImage{
    position: absolute;
    top:0;
    left: 100%;
    width:500px;
    height:400px;
    display:none;
    border:1px solid black;
  }

  .singleitem_box3{
    width: 500px;
    margin-left:50px;
    display:flex;
    flex-direction:column;
  }

  .singleitem_box3 h4{
    font-size: 2.5rem;
    font-weight:normal;
    margin-bottom:10px;
  }
  .singleitem_box3 div{
    margin-bottom: 20px;
  }

  .singleitem_box3 select{
    margin-left:10px;
    font-size:1.2rem;
    width:40px;
    height:40px;
    cursor:pointer;
  }

  .singleitem_box3 button{
    width:100%;
    padding: 20px 10px;
    font-size:1.1rem;
    border:none;
    border-radius: 20px;
    background-color:#444;
    color:#fff;
    cursor:pointer;
    :hover{
      background-color:#333;
    }
  }

`
// productList에서 물품 링크 클릭시 <Link to={`/${previousPath[1]}/${previousPath[2]}/${f.id}`} 가 발동되며 
// 앱에있는  <Route path="/cosmetic/:category/:title" element={<ProductSingleScreen/>}></Route>를 타고 이곳 컴포로 넘어온다. 
// 이곳컴포에서는 useParams 을 이용해서 현재주소의 내용으로 새로운 정보를 fetch받아오면된다. 

function ProductSingleScreen({state}) {
  //console.log(state)
  const dispatch = useDispatch();
  const param = useParams() 
  // console.log(param) // {category: 'laptops', title: 'MacBook_Pro'}
  const {title} = useParams() 
  
  // 처음이 컴포에 들어오고 혹은 주소가 바뀔때 마다 새로운 데이타를 fecth 받아옴 
  useEffect(()=>{
    dispatch(getSecondProductsTitle(title)) // 카테고리는 ex, MacBook_Pro, Samsung_Galaxy_Book ...
  },[title])

  const selectedGroupData = useSelector(st=>st.selectedGroupData);
  const loading = selectedGroupData.loading;
  const productData = selectedGroupData.products
  
  // console.log(selectedGroupData)
  // const location = useLocation(); 
  // {pathname: '/electronic/laptops/6', search: '', hash: '', state: {…}, key: 'jl878zfm'}

  const [qty, setQty] = useState(1);
  const [hoveredImageUrl, setHoveredImageUrl] = useState(null);

  const imageRef = useRef(null);
  const redWindowRef = useRef(null);
  const zoomImageRef = useRef(null);
  const parentRef = useRef(null);

  // 이미지 hover시 해당 사진 주소 이미지호버state에 저장 
  const seeExtraImage = (e)=>{
    if(e.target.tagName === "IMG"){
      setHoveredImageUrl(e.target.getAttribute("src"))
    }
  }

  // 이미지호버 state 변화시  imageRef를 이용해서 src를 바꿈 
  useEffect(()=>{
    if(hoveredImageUrl){
      imageRef.current.src = hoveredImageUrl
    }
  },[hoveredImageUrl])

  const addToCartFunc = (itemInfo)=>{
    dispatch({ type:"ADD_TO_CART", payload:{itemInfo, qty}})
    setQty(1);
  }
  // console.log(itemInfo) // {id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, …}

  const mouseMove = (e) => {
      e.preventDefault();
      let oW = zoomImageRef.current.offsetWidth / redWindowRef.current.offsetWidth;    // 500(줌이미지크기) / 100(빨간윈도우크기) =  5
      let oH = zoomImageRef.current.offsetHeight / redWindowRef.current.offsetHeight;  // 400 / 100 =  4
      zoomImageRef.current.style.background = `url(${hoveredImageUrl})`;
      // zoom요소안 이미지백그라운드 사이즈 확대하기    300px * 5  = 1800px  
      zoomImageRef.current.style.backgroundSize = `${(imageRef.current.width * oW)}px ${(imageRef.current.height * oH)}px`;   // 450 * 6  = 2250px  // height은 사진에 따라 값이다름.
      zoomImageRef.current.style.visibility = "visible";
      zoomImageRef.current.style.display = "block";
      redWindowRef.current.style.visibility = "visible";
      // 이벤트를 두 요소에 같이 주는 이유는 줌윈도우 위에 마우스가있으면 이미지요소의 이벤트를 받을수없음.
      // 두가지 요소안에서의 서로 같은 마우스 위치를 같고 싶으므로 부모를 기준점으로 삼음.(각 요소를 기준으로 삼으면 마우스가 올라가있는 요소에 따라 값이 달라짐.)  
      let bounds = parentRef.current.getBoundingClientRect() // 부모요소의 테두리 위치들 
      let mouseXpositon = e.clientX - bounds.left; // e.clientX 현재 브라우저상 마우스x축 위치 ex 500~950  -  요소의 테두리 맨왼쪽 위치 500  =   0 ~ 450 
      let xx = mouseXpositon - (redWindowRef.current.offsetWidth / 2); // 0~450 - (100/2) =  -50 ~ 400
      let mouseYpositon = e.clientY - bounds.top;
      let yy = mouseYpositon - (redWindowRef.current.offsetWidth / 2);
      // 오른쪽 사이드 범위 고정  if (-50~400 > 450-100)  350초과할경우   xx = 350 고정
      if (xx > imageRef.current.width - redWindowRef.current.offsetWidth) {  xx = imageRef.current.width - redWindowRef.current.offsetWidth;}
      // 왼쪽 사이드 범위 고정  if (-50~400 < 0)  
      if (xx < 0) {xx = 0;}
      redWindowRef.current.style.left = xx + "px";
      if (yy > imageRef.current.height - redWindowRef.current.offsetHeight) {yy = imageRef.current.height - redWindowRef.current.offsetHeight;}
      if (yy < 0) {yy = 0;}
      redWindowRef.current.style.top = yy + "px";
      // 백그라운드 유동적으로 움직이기   xx는 더이상 0밑으로 350위로 올라가지 않으므로 
      zoomImageRef.current.style.backgroundPosition = `-${xx * oW}px -${yy * oH}px` // - (0~350 * 5) =  0 ~ -1750
  }
  function removeZoom(){
      zoomImageRef.current.style.visibility = "hidden";
      zoomImageRef.current.style.display = "none";
  }


  return(
    <>
    <StyledDiv>
      <div className="container">
            <SectionHead singlePageHideFilter={true}></SectionHead>
            
            {loading ? 'loading' : productData.map((p,i)=>{
              // p.image는 newRelease 상품들
              // p.thumbnail,images는  electronic,cosmetic 상품들 
              return <div className="singleitem_container" key={i}>
                <div className="singleitem_box1" onMouseOver={seeExtraImage}>
                      <img src={ p.image || p.thumbnail} alt=''></img>
                      <img src={ p.image || p.images[0]} alt=''></img>
                      <img src={ p.image || p.images[1]} alt=''></img>
                      <img src={ p.image || p.images[2]} alt=''></img>
                </div>
                <div className="singleitem_box2" ref={parentRef}>
                  <img ref={imageRef} src={p.image || p.thumbnail} alt="" onMouseMove={mouseMove} onMouseLeave={removeZoom}/>
                  <div className="zoomWindow" ref={redWindowRef} onMouseMove={mouseMove} onMouseLeave={removeZoom}></div>
                  <div className="zoomImage" ref={zoomImageRef}></div>
                </div>
                <div className="singleitem_box3">
                    <h4>{p.title}</h4>
                    <div>{p.category}</div>
                    <div>Brand: {p.brand}</div>  
                    <div>${p.price}</div>   
                    <div>Rating: {p.rating.rate || p.rating}</div>
                    <div>Stock: {p.rating.count > 0 ? p.rating.count : "Out of Stock" || p.stock > 0 ? p.stock : "Out of Stock"}</div>
                    <div>{p.description}</div>
                    <div>
                      <label htmlFor="qty">Qty</label>
                      <select id="qty" value={qty} onChange={(e)=> setQty(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button onClick={()=>addToCartFunc(p)}>Add To Cart</button>
                </div>
              </div>
            })}
            
      </div>
    </StyledDiv>
    </>
  )
}

export default ProductSingleScreen;
