export const cartReducer = (state=[], action) => {
    switch(action.type){
        case "USER_CART_DATA":
            return action.payload;
        case "USER_NO_CART_DATA":
            return action.payload;
        case "ADD_TO_CART":
            if(state.length < 5){
                // 핸재 들어온 아이템 
                const currentItem = action.payload; 
                // 카트배열에 아이템 추가 
                console.log(state)
                let coppiedCart1 = [...state, currentItem]
                // 카트배열안에 중복된 아이템이 들어올 경우 
                let coppiedCart2 = coppiedCart1.reduce((acc, curr) => {
                    let existItem = acc.find(a => a.itemInfo.title === curr.itemInfo.title)
                    if (existItem) {  
                        existItem.qty = Number(existItem.qty) + Number(currentItem.qty);
                    } else {    
                        acc.push(curr)
                    }
                    return acc
                }, [])
                return coppiedCart2
            } else {
                alert('Sorry, can not put more than 5 Items in cart')
                return state;
            }
        case "CHANGE_QTY":
            const newQty = action.payload.changedQty;
            const selectedItem = action.payload.c;
            const coppiedCart3 = state.map(s=>{
                if(s.itemInfo.title === selectedItem.itemInfo.title){
                    s.qty = newQty;
                }
                return s
            })
            return coppiedCart3
        case "REMOVE_FROM_CART":
            const selectedItem2 = action.payload;
            const coppiedCart4 = state.filter(s=>{
                return s.itemInfo.title !== selectedItem2.itemInfo.title
            })
            return coppiedCart4
        case "EMPTY_CART":
            return [];
        default:
            return state;
    }
}