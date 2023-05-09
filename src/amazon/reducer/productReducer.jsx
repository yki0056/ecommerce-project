export const allGroup = (state={loading:true, all:[]}, action) => {
    switch(action.type){
        case "REQUEST": 
            return { loading: true, all:[]}
        case "SUCCESS":
            return { loading: false, all: action.payload}
        case "GET_PRODUCT_FAIL":
            return { laoding: false, error: action.payload }

        default:
            return state
    }
}
export const selectedGroup = (state={loading:true, products:[], staticAllProducts:[], menuProducts:[]}, action) => {
    switch(action.type){
        case "GET_PRODUCT_REQUEST":
            return { loading: true, staticAllProducts:[]}

        case "GET_PRODUCT_SUCCESS_START":
            return { loading: false, staticAllProducts: action.payload}

        case "GET_PRODUCT_SUCESS_CATEGORY":
            const categoryProduct = action.payload.filter((f)=>f.category === action.ctg)
            return { loading: false, products:categoryProduct, menuProducts:categoryProduct}
        
        case "GET_PRODUCT_SUCESS_TITLE":
            const spaceTitle = action.tit.split('_').join(' ') // MacBook_Pro > MacBook Pro 
            const titleProduct = action.payload.filter((f)=>f.title === spaceTitle) // {id: 6, title: 'MacBook Pro', description: 'MacBook Pro}
            return { loading: false, products:titleProduct, menuProducts:titleProduct}

        case "GET_PRODUCT_FAIL":
            return { laoding:false, error: action.payload }


        //------  filter by brand
        case "FILTER_UPDATE":
            const filterdProducts = action.payload
            return {products:filterdProducts, menuProducts:state.menuProducts}
            
        // ----- sort type ------------------------
        case "FEATURED":
            return {products:state.menuProducts, menuProducts:state.menuProducts}

        case "RATING": 
            const sortNewestProduct = [...state.products]
            sortNewestProduct.sort((a,b)=>{
                return a.rating - b.rating
            })
            return  {products:sortNewestProduct, menuProducts:state.menuProducts}

        case "PRICE: HIGH-LOW": 
            const sortHighestProduct = [...state.products]
            sortHighestProduct.sort((a,b)=>{
                return b.price - a.price
            })
            return  {products:sortHighestProduct, menuProducts:state.menuProducts}

        case "PRICE: LOW-HIGH": 
            const sortLowestProduct = [...state.products]
            sortLowestProduct.sort((a,b)=>{
                return a.price - b.price
            })
            return {products:sortLowestProduct, menuProducts:state.menuProducts}
            
        default:
        return state
    } 
}

