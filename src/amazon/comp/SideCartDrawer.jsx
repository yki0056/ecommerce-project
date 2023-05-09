import React from 'react'
import {useRef} from 'react'
import styled from 'styled-components'
import {useDispatch ,useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

const SidestyleComp = styled.div`
    width:60%;
    max-width:600px;
    height:100%;
    background:#fff;
    position:fixed;
    top:0;
    right:0;
    padding:20px;
    z-index:200;
    transform:translateX(100%);
    transition: transform 0.3s ease-out;
    &.show {
        transform:translateX(0%);
    }
    .cart_empty{
        height:100%;
        display:flex;
        align-items:center;
        justify-content: center;
        font-size:1.3rem;
        font-weight:bold;
    }
    .side_cart{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content: space-between;
    }
    .side_cart_header{
        display:flex;
        justify-content: space-between;
        align-items:center;
        margin: 40px 0 10px 0;
    }
    .side_cart_header h2{
        font-size: 1.5rem;
    }
    .side_cart_header i{
        font-size: 25px;
        cursor:pointer;
    }
    .side_cart_container{
        height: 90%;
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:center;
    }
    .side_cart_container_items{
        width:100%;
        display: flex;
        flex-direction: column;
        overflow-y:auto;
        height:100%;
    }
    .side_cart_container_item{
        display:flex;
        align-items:center;
        height:150px;
        border:1px solid grey;
        padding: 10px ;
    }
    .side_cart_container_item img{
        height: 100%;
        z-index:-10;
    }
    .side_cart_container_item_detail{
        margin-left:20px;
        flex-grow:1;
    }
    .side_cart_container_item_detail p{
        margin-bottom:5px;
    }
    .side_cart_container_item_detail_flex{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .side_cart_container_item_detail_flex select{
        padding:5px;
    }
    .side_cart_container_item_detail_flex i{
        cursor:pointer;
        font-size:1.2rem;
        margin-right:10px;
    }
    .side_cart_container_infos {
        width:100%;
        display:flex;
        flex-direction: column;
        font-size: 1.4rem;
    }
    .side_cart_container_infos_totalprice{
        display:flex;
        justify-content:space-between;
    }
    .side_cart_container_infos_button{
        cursor:pointer;
        font-size:1.4rem;
        padding: 1rem 0;
        margin: 20px 0 40px 0;
        border:none;
        border-radius:5px;
        background-color:hsl(0, 0%, 65.49019607843137%);
        text-align:center;
        color:black;
        &:hover{
            background-color: rgb(224, 224, 224);
        }
    }

`


function SideCartDrawer({cartTog, setCartTog}) {
    const hideSideCart = () => {
        setCartTog(() => false) // change toggle to false // 검은색 배경 클릭시  없애기 
    }
    const cart = useSelector(st => st.cart)
    const dispatch = useDispatch();
    const parent = useRef(null)

    const scrollFunc = ()=>{
        if(parent.current){
            const parentBot = parent.current.getBoundingClientRect().bottom
            const lastChildBot = Math.floor(parent.current.lastChild.getBoundingClientRect().bottom)
            if(lastChildBot > parentBot){
                console.log('shadow')
                parent.current.style= 'box-shadow: rgba(0, 0, 0, 0.45) 0px -50px 36px -28px inset;'
                // box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
            } else {
                parent.current.style= 'box-shadow: none;'
            }
        }
    }
    
    const totalQuantity = cart.reduce((acc,curr)=>{
        let quantity = Number(curr.qty);
        acc += quantity;
        return acc
    },0)

    const totalPrice = cart.reduce((acc,curr)=>{
        let singlePrices = parseFloat(curr.itemInfo.price)
        let multiplePrices = singlePrices * curr.qty
        acc += multiplePrices
        return acc
    }, 0)

    const qtyFunc = (e, c)=>{
        const changedQty = e.target.value
        dispatch({type:"CHANGE_QTY", payload:{c, changedQty}})
    }

    const removeFunc = (c) => {
        dispatch({type:"REMOVE_FROM_CART", payload:c})
    }

    const displayCartList = cart.map((c, index)=>{
        return <div key={index} className="side_cart_container_item">
            <img src={c.itemInfo.image || c.itemInfo.thumbnail} alt="" style={{width:'100px'}} />
            <div className="side_cart_container_item_detail">
                <p>{c.itemInfo.title}</p>
                <p>${c.itemInfo.price}</p>
                <div className="side_cart_container_item_detail_flex">
                    <select value={c.qty} onChange={(e)=>{qtyFunc(e,c)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <i className="fa-solid fa-trash-can" onClick={()=>{removeFunc(c)}}></i>
                </div>
            </div>
        </div>
    })

    return (
        <>
            {/* 하얀카트 */}
            <SidestyleComp className={cartTog ? 'show' : ''}>
                <div className="side_cart">
                    <div className="side_cart_header"> 
                        <h2>My Shopping Cart ({totalQuantity})</h2>
                        <i className="fa-solid fa-xmark" onClick={hideSideCart}></i>
                    </div>
                    {cart.length < 1 ? 
                        <div className="cart_empty">CART IS EMPTY</div> 
                        : 
                        <div className="side_cart_container">
                            <div className="side_cart_container_items" ref={parent} onScroll={scrollFunc}>{displayCartList}</div>
                            <div className="side_cart_container_infos">
                                <div className="side_cart_container_infos_totalprice">
                                    <p>Estimated Total</p>
                                    <p>$ {totalPrice}</p>
                                </div>
                                <Link to="/cart" className="side_cart_container_infos_button" onClick={hideSideCart}>Go To Cart</Link> 
                            </div>
                        </div>
                    }
                </div>
            </SidestyleComp>

        </>

    )
}
export default SideCartDrawer
