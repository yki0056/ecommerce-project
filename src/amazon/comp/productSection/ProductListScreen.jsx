import React, { useEffect }  from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {getCategoryProducts} from '../../reducer/productActions.jsx';
//component
import SectionHead from './SectionHead.jsx'
import SectionFilterMenu from './SectionFilterMenu.jsx'

const StyledDiv = styled.div`
    background:#fff;
    .container{
        padding: 0px 2rem;
    }
    .productContainer{
        display:flex;
    }
    .productScreen{
        justify-content:center;
        width: 100%;
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 4rem;
        padding: 0 4rem 0 4rem;
        transition: all 0.3s ease-out;
    }
    .wider{
        flex-shrink:0;
    }
    .productLink{
        border: 1px solid grey;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .productLink img{  
        width:100%;
        max-height:250px;
    }
    .nomatch{
        font-size:2.5rem;
        padding:2rem;
    }
    @media only screen and (max-width:1000px){
        .productScreen{
            grid-template-columns:1fr;
            gap: 2rem;
            padding: 0 2rem 0 2rem;
            transition: all 0.3s ease-out;
        } 
    }

`

const ProductListScreen = ()=>{
    const {category} = useParams() // 주소
    const dispatch = useDispatch();
    // 1. 시작하자마자 
    // thunk를 이용해서 함수를 dispatch()안에 넣고 사용가능, 
    // getSecondProudct함수의 결과를 dispatch()안에 넣음 
    // 함수의 결과인 -> async함수는 인자로 dispatch를 받을수있음
    // 그 async함수 안에서 dispatch를 이용해서
    // 서버에서 정보를 받아오는 과정을 dispatch를 사용해서 productReducer.jsx에 연결 
    // 그 결과가 reducer 에 저장 

    
    useEffect(()=>{
        dispatch(getCategoryProducts(category)) 
    },[category]) // 주소가 바뀔때 마다 


    const location = useLocation(); 
    const previousPath = location.pathname.split("/")  // ['', 'electronic', 'laptops']

    // 문제점 발견 새로고침 혹은 주소창으로 접속시 아이템들이 안나옴...  props, 리덕스 두가지 모두
    // 해결방안 새로고침이 아이템을 fetch해옴
    
    const selectedGroupData = useSelector(st=>st.selectedGroupData);
    const groupData = selectedGroupData.products;
    const loading = selectedGroupData.loading;
    const filterStatus = useSelector(st=>st.fms);

    // 모든 물건들중  일렉트로닉 제품들 구별 해야함. 랩탑,스마트폰
    // const onlyElectronicProducts = staticAllProducts.filter(f=>f.category === "laptops" || f.category === "smartphones") // 데이터에 랩탑이 있다면 

    return(
        <StyledDiv>
            <div className="container">
                <SectionHead></SectionHead>
                <div className="productContainer">

                    {loading ? 'Loading...' : <SectionFilterMenu></SectionFilterMenu>}
                    
                    <div className={`productScreen ${filterStatus && 'wider'}`}>
                        {loading ? 'Loading...' : groupData.length == 0 ? <div className='nomatch'>No matches found</div>:
                            groupData.map((f,i)=>{
                                // f.title은 상품이름인데 스페이스가 있음. 라우터는 스페이스가 있을시 %로 표기하기 때문에 - 로 바꿔주겠음;
                                const noSpace_title = f.title.split(' ').join('_');
                                //previousPath[1]는 electronic,cosmetic // previousPath[2]는 laptop,fragrance,groceries,home-decoration... 
                                if(previousPath[2]){
                                    return <Link to={`/${previousPath[1]}/${previousPath[2]}/${noSpace_title}`} key={i}  className="productLink">
                                    <img src={f.thumbnail} alt=""/>
                                    <h4>{f.title}</h4>
                                    <p>${f.price}</p>
                                    </Link>
                                } else { 
                                    return <Link to={`/${previousPath[1]}/${noSpace_title}`} key={i}  className="productLink">
                                    <img src={f.thumbnail} alt=""/>
                                    <h4>{f.title}</h4>
                                    <p>${f.price}</p>
                                    </Link>
                                }

                            })
                        }
                    </div>

                </div>

            </div>
        </StyledDiv>
    )
}

export default ProductListScreen;