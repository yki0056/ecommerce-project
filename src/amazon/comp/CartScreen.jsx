import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

import styled from 'styled-components';

const StyledDiv = styled.div`
    max-width:1400px;
    margin:auto;
    min-height: 600px;
    display:flex;
    padding: 50px 0;
    .left{
        width:70%;
        
        .empty{
            font-size:2rem;
        }
        .container{
            display:flex;
            align-items:center;
            justify-content:space-between;
            height:150px;
            .title{
                display:flex;
                align-items:center;
                div{
                width:150px;
                margin-right:12px;
                }
                p{
                    margin-right:12px;
                    font-size:1.3rem;
                }
            }
            .quantity{
                margin-right:30px;
                select{
                    margin-right:12px;
                    font-size:1.3rem;
                    padding:0.5rem;
                }
                i{
                    font-size:1.3rem;
                    cursor:pointer;
                }
            }
    
        }
    }
    .right{
        width:30%;
        display:flex;
        flex-direction:column;
        align-items:center;
        padding-top: 35px;
        p{
            font-size:1.4rem;
            margin-bottom:12px;
        }

        button{
            font-size:1.3rem;
            padding: 20px 30px;
            cursor:pointer;
        }
    }
`

function CartScreen() {
    const cart = useSelector(st => st.cart);
    const dispatch = useDispatch()

    const totalPrice = cart.reduce((acc,curr)=>{
        let singlePrices = parseFloat(curr.itemInfo.price)
        let multiplePrices = singlePrices * curr.qty
        acc += multiplePrices
        return acc
    }, 0)

    const totalQuantity = cart.reduce((acc,curr)=>{
        let quantity = Number(curr.qty);
        acc += quantity;
        return acc
    },0)

    const qtyFunc = (e, c)=>{
        const changedQty = e.target.value
        dispatch({type:"CHANGE_QTY", payload:{c, changedQty}})
    }

    const removeFunc = (c) => {
        dispatch({type:"REMOVE_FROM_CART", payload:c})
    }

    return (
        <StyledDiv>
            <div className="left">
                {cart.length === 0 ? <h1 className="empty">Your Cart is empty</h1> : cart.map((c,i)=>{
                        return <div className="container" key={i}>
                            <div className="title">
                                <div>
                                    <img src={c.itemInfo.thumbnail} alt="" />
                                </div>
                                <p>{c.itemInfo.title}</p>
                                <p>${c.itemInfo.price}</p>
                            </div>
                            <div className="quantity">
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
                    })
                }
            </div>

            <div className="right">
                <p>Subtotal({totalQuantity} items) ${totalPrice}</p>
                <button>Proceed to checkout</button>
            </div>
        </StyledDiv>
    )
}

export default CartScreen
