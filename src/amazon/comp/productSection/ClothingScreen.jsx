import {useEffect} from "react"
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getFirstProducts} from '../../reducer/productActions.jsx';
import styled from 'styled-components';

// images
import hp from '../image/hp.jpg';
import pro from '../image/pro.jpeg';
import sams from '../image/sams.jpg';
import x from '../image/x.png';
import macwall from '../image/macbook.jpg';
import iphonebanner from '../image/iPhoneX_banner.png';

const StyledComp = styled.div`

`

const ClothingScreen = ()=>{
    const dispatch = useDispatch();
    const data = useSelector(st => st.getSecondProductsData)
    const {products, loading, error} = data
    // console.log(products)

    useEffect(()=>{
        dispatch(getFirstProducts())
    },[dispatch])
    
    
    return(
    
        <StyledComp>
          
            <div className="section1">
                <h2>SHOP POPULAR ClOTHING CATEGORIES</h2>
                <div className="section1_buttons">
                    <Link to="/electronic/laptops" state={products}><button>MEN</button></Link>
                    <Link to="/electronic/smartphones" state={products}><button>WOMEN</button></Link>
                </div>
            </div>

        </StyledComp>
    )
}
export default ClothingScreen;