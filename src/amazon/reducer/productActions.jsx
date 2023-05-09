// thunk 사용시 dispath()안에 object말고 함수를 넣을수있음 그래서 이렇게 함수를 실행가능함 
// async함수를 사용해서 내용들이 순차적으로 실행됨 // 두번째 애로우함수의 인자로는 dispatch를 받음.  

// 메인페이지 
export const getAllProducts = () => async (dispatch) => {
    try {
            dispatch({type:"REQUEST"});
            const resp = await fetch('https://dummyjson.com/products');
            const data = await resp.json();
            const data3 = data.products;
            dispatch({type: "SUCCESS", payload: data3})
        } catch (error){
            alert(error + 'there is problem with fake json server')
            dispatch({type:"FAIL", payload:error})
        }
}
// 리스트페이지 
export const getCategoryProducts = (category) => async (dp) => {
    try {
            dp({type:"GET_PRODUCT_REQUEST"});
            const resp = await fetch('https://dummyjson.com/products');
            const data = await resp.json();
            const data3 = data.products;
            dp({type: "GET_PRODUCT_SUCESS_CATEGORY", payload: data3, ctg: category})
        } catch (error){
            alert(error + 'there is problem with fake json server')
            dp({type:"GET_PRODUCT_FAIL", payload:error})
        }
}
export const getSecondProductsTitle = (title) => async (dp) => {
    try {
        dp({type:"GET_PRODUCT_REQUEST"}); // 로딩, 이니셜 배열 생성
        const resp = await fetch('https://dummyjson.com/products'); // 모든 정보 가져오기 
        const data = await resp.json();
        const data3 = data.products
        dp({type: "GET_PRODUCT_SUCESS_TITLE", payload: data3, tit: title})
    } catch (error){
        alert(error + 'there is problem with fake json server')
        dp({type:"GET_PRODUCT_FAIL", payload:error})
    }
}

