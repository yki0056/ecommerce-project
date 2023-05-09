import React, {useEffect, useState, useRef} from 'react'
import {Link, useLocation, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import './SectionFilterMenu.css'
// import { ContactSupportOutlined } from '@material-ui/icons';

const SectionFilterMenu = ()=>{
    const brandElement = useRef([])
    const priceElement = useRef([])

    const [searchParam, setSearchParams] = useSearchParams()

    const dispatch = useDispatch();
    const groupData = useSelector(st=>st.selectedGroupData);

    const filterMenuStatus = useSelector(st =>st.fms)

    const [brandFilterArray, setBrandFilterArray] = useState(searchParam.getAll('brand')) // 브라우저 시작과 동시에 주소에있는 정보를 받아옴.  
    const [priceFilterArray, setPriceFilterArray] = useState(searchParam.getAll('price'))

    const location = useLocation(); // {pathname: '/electronic/laptops', search: '', hash: '', state: Array(10), key: '42mn0td7'}
    let locate = location.pathname; //  /electronic/all
    let aa = locate.split("/");
    let address = aa.slice(1); // ['electronic', 'all']
    // const categFiltProducts = location.state; 
    const [showing, setShowing] = useState({gender:true, brands:true, shopbyprice:true, pickuptodayat:true, color:true}) 
    
    // -------------------- filter menu display ------------------------------------------------------------------------------------------------------------

    const openFilt = (e) => {
        let selectedFilt = e.currentTarget.children[0].innerText.toLowerCase().split(" ").join("");
        if(selectedFilt === 'gender'){
            setShowing({...showing, gender:!showing.gender})
        } else if (selectedFilt === 'shopbyprice'){
            setShowing({...showing, shopbyprice:!showing.shopbyprice})
        } else if (selectedFilt === 'pickuptodayat'){
            setShowing({...showing, pickuptodayat:!showing.pickuptodayat})
        } else if (selectedFilt === 'brands'){
            setShowing({...showing, brands:!showing.brands})
        } else if (selectedFilt === 'color'){
            setShowing({...showing, color:!showing.color})
        } 
    }
    // 카테고리 물품(laptop)의 모든 아이템정보의 브랜드 이름들 중, 중복을 없애고, 디스플레이
    //console.log(groupData.menuProducts) // [{title:iphone9}, {title:iphonex}, {title:samsung universe}, {title:oppo}]
    const noDupBrands = groupData.menuProducts.reduce( (acc, currentObj) => {
        let term = currentObj.brand.toLowerCase()
        acc.push(term)
        return [...new Set(acc)];
    }, []);
    // console.log(noDupBrands) // ['apple', 'samsung', 'oppo', 'huawei']

    //  카테고리 물품(laptop)의 모든 상품목록들 중 가장 낮은 가격을 보고 필터에 디스플레이할 가격을 레인지를 설정 
    const lowestProduct = groupData.menuProducts.reduce((acc, currentObj) => {
        return acc.price < currentObj.price ? acc : currentObj
    },{});
    //console.log(lowestProduct) //laptop중 가장 낮은가격의 물품  {id: 10, title: 'HP, price: 1099, …}

    const lowestPriceProduct = lowestProduct.price
    let priceDisplay = []
    if(lowestPriceProduct > 0 && lowestPriceProduct < 100){
        priceDisplay = ['0-20', '20-40', '40-60', '60+']
    } else if (lowestPriceProduct >= 100 && lowestPriceProduct < 1000){
        priceDisplay = ['100-300', '300-500', '500-700', '700+']
    } else if (lowestPriceProduct >= 1000 && lowestPriceProduct < 2000){
        priceDisplay = ['1000-1200', '1200-1400', '1400-1600', '1600+']
    }
    // console.log(priceDisplay) //  ['1000-1200', '1200-1400', '1400-1600', '1600+']

    // ------------------- click filter --------------------------------------------------------------------------------------------------------
    // 클릭시 필터리스트 배열 생성 + 주소에 필터에 따른 디테일 변경 
    // console.log([...searchParam]); // [['brand', 'apple] ['price' '1000-1500']]
    // 브라우저 시작시 searchParam의 value값만 빼내서 하나의 배열에 모으기   (나중에 check 할때 쓰임)
    const allFiltValueArray = [...searchParam].map(([key, value])=>{
        return value
    })
    // console.log(allFiltValueArray) // ex: ['samsung', 'microsoft surface', '1000-1200']

    // console.log(brandFilterArray) // 클릭된 브랜드 배열에 넣기 ['apple', 'microsoft surface']   // 이미 디스플레이에서 중복은 제거했으니 중복걱정은 없음. 
    // 필터 버튼 클릭시  
    const filtEventFunc = (e) => {
        const selectedFilt = e.target.getAttribute('data');
        if(e.target.checked){ // checked
            if(selectedFilt === 'brand'){
                setBrandFilterArray([...brandFilterArray, e.target.id])   // 배열에 정보 넣기
                setSearchParams([...searchParam, [ 'brand', e.target.id]]) // 주소에 쿼리스트링 추가 // http://localhost:3000/electronic/laptops?brand=apple
            } 
            if(selectedFilt === 'price'){
                setPriceFilterArray([...priceFilterArray, e.target.id])
                setSearchParams([...searchParam, ['price', e.target.id]])
            } 
        } else { // unchecked
            if(selectedFilt === 'brand'){
                const copy = brandFilterArray.filter(bf => bf !== e.target.id)
                setBrandFilterArray(copy)
            }
            if(selectedFilt === 'price'){
                const copy = priceFilterArray.filter(pf => pf !== e.target.id)
                setPriceFilterArray(copy)
            }

            const updatedSearchParams = new URLSearchParams(
                    [...searchParam].filter( ([key, value]) => { // [['brand', 'apple'], ['brand', samsung]] 이있는 상태에서 삼성을 없애려고 클릭시 
                        return value !== e.target.id // 결과 true, false  --> [['brand', 'apple']]
                    })
            );
            setSearchParams(updatedSearchParams);
        }
    }
    // 선택된 필터 종류들을(2가지 필터배열) 합쳐서 보여줘야하는 경우의 수 를 다 보여줌 
    // ex) 브랜드에서 삼성 과 애플 선택, 가격에서 1000-1200 선택, 보여줘야할 것들은,  삼성 1000-1200, 애플 1000-1200  
    const createCombinationArray = ()=>{ 
        let combination = [];
        if(brandFilterArray.length > 0){ // 브랜드 필터에 정보가 있다면
            combination = brandFilterArray
        }
        if(priceFilterArray.length > 0){ // 프라이스 필터에 정보가 있다면
            if(combination.length > 0){  // 브랜드에 이미 선택된 정보가 있을경우. 
                let tempCombinations = combination; 
                combination = []
                tempCombinations.forEach(tc => {
                    priceFilterArray.forEach(p => {
                        let combo = [tc, p];
                        combination.push(combo)
                    })
                })
            }else{ // 브랜드에 선택된것 없이, 먼저 프라이스 필터를 먼저 누를경우. 
                combination = priceFilterArray
            }
        }
        // 브랜드 hemani클릭시 ['hemani tea'] 
        // 브랜드 hermani, dermive, 프라이스 0-20, 20-40 클릭시 [['hemani tea', '0-20'],['hemani tea', '20-40'],['dermive', '0-20'],['dermive', '20-40']] 
        dispatchFilterData(combination) 
    }

    // // 종합 필터정보(combi)를 모든 상품들과 대조하여  결과상품을 리듀서에 저장 -------------------------------------------------
    const dispatchFilterData = (combi)=>{ 
        let array = [];
        groupData.menuProducts.forEach( g => { 
            if(typeof combi[0] === 'string'){ // 종합 필터정보(combi) 배열안 첫번째 인자가 string이라는것은 하나의 필터 종류만 선택됬다는것을 말함 ex ['apple', 'samsung] 혹은 ['1200-1400']
                combi.forEach( f => {  //console.log(f) // 브랜드 클릭시 apple // 프라이스 클릭시  1200-1400, 1600+
                    const split = f.split('-');  // [1200, 1400]
                    // 브랜드 
                    if(g.brand.toLowerCase() === f){  // 모든아이템 배열안 브랜드이름들 중, 필터배열안의 이름이 같으면 해당 아이템의 정보를, 새로운 배열에 넣음
                        array.push(g) 
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    // price 범위 안에있는 넘버만 추가해라 
                    }  else if(Number(split[0]) < Number(g.price) && Number(g.price <= Number(split[1]))){
                        array.push(g)
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    // price more than +  추가해라 
                    } else if(f.includes('+')){   // 필터에 700+ 클릭했을시 
                        const moreThan = f.slice(0, -1)
                        if(Number(g.price) > Number(moreThan)){  //  상품가격 '1200' > '700'
                            array.push(g)
                            dispatch({type:"FILTER_UPDATE", payload: array})
                        }
                    // 조건에 부합하는 상품이 없다면 빈 배열. 
                    } else { 
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    }
                })
            // 2가지 조합이상의 필터 ex)브랜드 + 가격일 경우, 종합 필터정보(combi) 배열안에 배열이 생김 // [['samsung', '1200-1400'], ['apple', 1200-1400]] 
            } else if (typeof combi[0] === 'object'){
                combi.forEach(f=>{ //console.log(f) //['samsung', '1200-1400'], ['apple', 1200-1400]
                    const split = f[1].split('-');  // console.log(split) // [1200, 1400]
                    let moreThan
                    if(f[1].includes('+')){ //console.log(f[1]) //  ['samsung', '1600+']
                        moreThan = f[1].slice(0, -1) // '1600+' > '1600'
                    }
                    // 2가지 필터를 모두 만족하는 물건이있다면 // 브랜드 이름이 같고, price range 사이에 들어가는 물건을 찾아라 
                    if( g.brand.toLowerCase() === f[0] && Number(split[0]) < Number(g.price) && Number(g.price <= Number(split[1])) ){ 
                        // 브랜드이름이 같고    &&    1200 < 각아이템prcie들 && 각아이템prcie들 <= 1400 
                        array.push(g)
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    // 2가지 필터를 모두 만족하는 물건이있다면 // 브랜드 이름이 같고, price range 넘어가는 물건을 찾아라 
                    } else if(g.brand.toLowerCase() === f[0] && Number(g.price) > Number(moreThan)){
                        array.push(g)
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    }  else {
                        dispatch({type:"FILTER_UPDATE", payload: array})
                    }
                })
            // filteredArray배열에 정보가 없을시 모든 상품에대한 정보를 보냄.
            } else if( combi.length === 0){
                dispatch({type:"FILTER_UPDATE", payload: groupData.menuProducts})
            }
        })
    }

    // searchParam이 적용된 주소(laptops?brand=apple&brand=samsung)으로 접속 혹은 새로고침시 해당 아이템들 디스플레이
    // 브랜드, 가격 배열에 변화가 있을시  콤비네이션 배열 만들기 .
    useEffect(()=>{ 
        createCombinationArray()
    },[brandFilterArray, priceFilterArray])


// 새로고침시  체크 되어있게하기 
const checkFunc = () => {  // 모든 체크요소 
    const combinedElem = brandElement.current.concat(priceElement.current)
    const result = combinedElem.filter(elem=> allFiltValueArray.includes(elem.id))
    result.forEach(r => r.checked = true)
}
 useEffect(()=>{
    checkFunc()
 },[])
    
    return(
        <>
            <div className={`filterContainer ${filterMenuStatus && 'moveFilterContainer'}`}>
                
                <div className="filt">
                    <h4 className="filt_main_title">Filter</h4>
                </div>
                
                <form className="filt">
                    <div className="filt_title" onClick={openFilt}>
                        <div>Brands</div>
                        <i className={`fa-solid fa-angle-down ${showing.brands ? "flipped" : ""}`}></i>
                    </div>
                    <div className={`folder ${showing.brands ? "hide" : ""}`}>
                        {noDupBrands.map((c,i) => {
                            return <label htmlFor={c} key={i}> 
                                        <input type="checkbox" id={c} data="brand" onClick={(e)=>filtEventFunc(e)} ref={(element) => {brandElement.current[i] = element}} />
                                        <div>{c}</div>
                                        <span className="checkmark"></span>
                                    </label>
                        })}
                    </div>
                </form>

                <form className="filt">
                    <div className="filt_title" onClick={openFilt}>
                        <div>Shop by Price</div>
                        <i className={`fa-solid fa-angle-down ${showing.shopbyprice ? "flipped" : ""}`}></i>
                    </div>
                    
                    <div className={`folder ${showing.shopbyprice ? "hide" : ""}`}>
                        {priceDisplay.map((p,i) => {
                            return    <label htmlFor={p} key={i}>
                                <input type="checkbox" id={p} data="price" onClick={filtEventFunc} ref={(element) => {priceElement.current[i] = element}}/>
                                <div>$ {p}</div>
                                <span className="checkmark"></span>
                            </label>
                        })}
                        
                    </div>   
                </form>
            
                <form className="filt">
                    <div className="filt_title" onClick={openFilt}>
                        <div>Gender</div>
                        <i className={`fa-solid fa-angle-down ${showing.gender ? "flipped" : ""}`}></i>
                    </div>
                    <div className={`folder ${showing.gender ? "hide" : ""}`}>
                        <label htmlFor="men"> 
                            <input type="checkbox" id="men" name='filt_gender'/>
                            <div>Men</div>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor="women">
                            <input type="checkbox" id="women" name="filt_gender"/>
                            <div>Women</div>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor="unisex">
                            <input type="checkbox" id="unisex" name='filt_gender'/>
                            <div>Unisex</div>
                            <span className="checkmark"></span>
                        </label>   
                    </div>
                </form>


                <div className="filt">
                    <div className="filt_title" onClick={openFilt}>
                        <div>Pick Up Today At</div>
                        <i className={`fa-solid fa-angle-down ${showing.pickuptodayat ? "flipped" : ""}`}></i>
                    </div>
                        <div className={`folder ${showing.pickuptodayat ? "hide" : ""}`}>
                            <div>Filter by Store</div>
                        </div>
                </div>


                <form className="filt">
                    <div className="filt_title" onClick={openFilt}>
                        <div>Color</div>
                        <i className={`fa-solid fa-angle-down ${showing.color ? "flipped" : ""}`}></i>
                    </div>
                    <div className={`folder ${showing.color ? "hide" : ""}`}>
                        <label htmlFor="25" className="container">
                            <input type="checkbox" id="25" name=''/>
                            <div>Purple</div>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor="50" className="container">
                            <input type="checkbox" id="50" name=""/>
                            <div>Black</div>
                            <span className="checkmark"></span>
                        </label>
                        <label htmlFor="100"  className="container">
                            <input type="checkbox" id="100" name=''/>
                            <div>Orange</div>
                            <span className="checkmark"></span>
                        </label>  
                        <label htmlFor="150"  className="container">
                            <input type="checkbox" id="150" name=''/>
                            <div>Blue</div>
                            <span className="checkmark"></span>
                        </label>
                    </div>   
                </form>


            </div>

        </>
    )
}
export default SectionFilterMenu